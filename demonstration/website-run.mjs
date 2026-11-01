import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const port = 4174;
const chromePort = 9334;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const server = spawn(
  'npx',
  ['web-dev-server', '--node-resolve', '--port', String(port)],
  { cwd: '/workspace', stdio: 'ignore' }
);

async function waitFor(url) {
  const start = Date.now();
  while (Date.now() - start < 20000) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch { /* booting */ }
    await sleep(200);
  }
  throw new Error('did not start ' + url);
}

await waitFor('http://127.0.0.1:' + port + '/demonstration/website-emulator.html');

const hosted = await fetch('http://127.0.0.1:5000/settings');
const hostedHtml = await hosted.text();
if (!hosted.ok || !hostedHtml.includes('Drawer Button') || !hostedHtml.includes('/#account')) {
  throw new Error('hosting /settings ' + hosted.status);
}
console.log('hosting /settings serves the demo', hosted.status);

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--user-data-dir=/tmp/chrome-pwa-website',
  '--remote-debugging-port=' + chromePort,
  '--remote-allow-origins=*',
  'about:blank'
], { stdio: 'ignore' });

await waitFor('http://127.0.0.1:' + chromePort + '/json/version');

const page = await fetch('http://127.0.0.1:' + chromePort + '/json/new?about:blank', { method: 'PUT' }).then((response) => response.json());
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve);
  ws.addEventListener('error', reject);
});

let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});

function send(method, params = {}) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}

await send('Runtime.enable');
await send('Page.enable');

async function evaluate(expression) {
  const msg = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (msg.result?.exceptionDetails) {
    const detail = msg.result.exceptionDetails;
    throw new Error(detail.text + ' ' + (detail.exception?.description || ''));
  }
  return msg.result?.result?.value;
}

const shots = [];

async function pass(width, height) {
  await send('Storage.clearDataForOrigin', {
    origin: 'http://127.0.0.1:' + port,
    storageTypes: 'all'
  });
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + port + '/demonstration/website-emulator.html' });
  await sleep(500);
  const seen = new Set();
  let results = null;
  const start = Date.now();
  while (Date.now() - start < 180000) {
    const pause = await evaluate('window.__pause || ""');
    if (pause && !seen.has(pause)) {
      seen.add(pause);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const file = '/opt/cursor/artifacts/website_' + width + '_' + pause + '.png';
      writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
      shots.push(file);
      console.log('shot', file);
      await evaluate('window.__resume && window.__resume()');
    }
    results = await evaluate('window.__critical || null');
    if (results) break;
    await sleep(200);
  }
  const overflow = await evaluate('document.documentElement.scrollWidth > ' + width);
  return { results, overflow };
}

const narrow = await pass(320, 700);
const wide = await pass(1280, 800);
console.log(JSON.stringify({ narrow, wide, shots }, null, 2));

ws.close();
server.kill();
chrome.kill();
const ok = [narrow, wide].every((item) => item.results && item.results.every((row) => row.pass) && !item.overflow);
process.exit(ok ? 0 : 1);
