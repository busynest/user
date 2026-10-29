import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const port = 4173;
const chromePort = 9333;

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
    } catch { /* server still booting */ }
    await sleep(200);
  }
  throw new Error('demo server did not start');
}

await waitFor('http://127.0.0.1:' + port + '/demonstration/emulator.html');

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--user-data-dir=/tmp/chrome-pwa-emulator',
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
const logs = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
  if (msg.method === 'Runtime.consoleAPICalled') {
    logs.push(msg.params.args.map((arg) => arg.value || arg.description).join(' '));
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    logs.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
  }
});

function send(method, params = {}) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}

await send('Runtime.enable');
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 320,
  height: 700,
  deviceScaleFactor: 2,
  mobile: true
});
await send('Page.navigate', { url: 'http://127.0.0.1:' + port + '/demonstration/emulator.html' });

async function evaluate(expression) {
  const msg = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (msg.result?.exceptionDetails) {
    const detail = msg.result.exceptionDetails;
    throw new Error(detail.text + ' ' + (detail.exception?.description || ''));
  }
  return msg.result?.result?.value;
}

const shots = [];
const seen = new Set();
let results = null;
const start = Date.now();

while (Date.now() - start < 90000) {
  const pause = await evaluate('window.__pause || ""');
  if (pause && !seen.has(pause)) {
    seen.add(pause);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const file = '/opt/cursor/artifacts/emulator_320_' + pause + '.png';
    writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
    shots.push(file);
    console.log('shot', file);
    await evaluate('window.__resume && window.__resume()');
  }
  results = await evaluate('window.__critical || null');
  if (results) break;
  await sleep(200);
}

const width = await evaluate('document.documentElement.scrollWidth');
console.log('scrollWidth', width);
console.log(JSON.stringify({ results, shots, width, logs: logs.slice(-30) }, null, 2));

ws.close();
server.kill();
chrome.kill();
process.exit(results && results.every((item) => item.pass) ? 0 : 1);
