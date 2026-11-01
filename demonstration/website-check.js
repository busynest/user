const password = 'secret12';
const email = 'site-' + Date.now() + '@example.com';
const results = [];

function record(feature, pass, note) {
  results.push({ feature, pass, note });
}

function events(name) {
  return window.__events.filter((item) => item.name === name);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function until(label, check) {
  const start = Date.now();
  while (Date.now() - start < 12000) {
    if (check()) return;
    await sleep(50);
  }
  throw new Error('timed out: ' + label);
}

function setValue(field, value) {
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

async function pause(name) {
  window.__pause = name;
  await new Promise((resolve) => { window.__resume = resolve; });
  window.__pause = '';
}

function show(node, block) {
  if (!node) return;
  node.scrollIntoView({ block: block || 'center', inline: 'nearest', behavior: 'instant' });
}

function section(id) {
  show(document.getElementById(id), 'start');
}

window.__criticalPromise = (async () => {
  try {
    const headings = [...document.querySelectorAll('h2')].map((item) => item.textContent.trim());
    if (headings.join('|') !== 'Drawer Button|Login Page|email-reset|Settings Page') {
      throw new Error(headings.join('|'));
    }
    if (!document.querySelector('h1') || document.querySelector('h1').textContent.trim() !== 'pwa-auth') {
      throw new Error('missing title');
    }
    if (!document.querySelector('.links a[href*="npmjs.com"]')) throw new Error('missing npm link');
    window.scrollTo(0, 0);
    document.getElementById('main').scrollTo(0, 0);
    await pause('top');
    section('drawer');
    await pause('section-drawer');
    section('login');
    await pause('section-login');
    section('reset');
    await pause('section-reset');
    section('account');
    await pause('section-settings');
    record('sections', true, headings.join(', '));
  } catch (error) {
    record('sections', false, error.message);
  }

  try {
    document.querySelector('#drawer user-icon').shadowRoot.querySelector('button').click();
    const drawer = document.querySelector('user-drawer');
    await until('drawer', () => drawer.hasAttribute('drawer'));
    await sleep(1500);
    const before = drawer.shadowRoot.querySelector('slot[name="before"]');
    const fallback = drawer.shadowRoot.querySelector('slot:not([name])');
    if (!before.textContent.includes('slotted - before')) throw new Error('before marker');
    if (!fallback.textContent.includes('slotted - default')) throw new Error('default marker');
    if (drawer.getAttribute('url') !== '#account') throw new Error('settings url ' + drawer.getAttribute('url'));
    const path = location.pathname;
    drawer.shadowRoot.querySelector('[part="settings"]').click();
    await sleep(300);
    if (location.pathname !== path) throw new Error('settings left ' + location.pathname);
    if (location.hash !== '#account') throw new Error('settings hash ' + location.hash);
    await pause('settings-stays');
    drawer.shadowRoot.querySelector('.close')?.click();
    record('drawer', true, 'markers and settings stay on the page');
  } catch (error) {
    record('drawer', false, error.message);
  }

  try {
    const host = document.querySelector('user-login');
    host.shadowRoot.querySelector('form-login').shadowRoot.querySelector('[part="switch"]').click();
    await sleep(2200);
    const root = host.shadowRoot.querySelector('form-signup').shadowRoot;
    const hint = root.querySelector('.hint');
    if (!hint || !hint.textContent.includes('At least 8 characters')) throw new Error('hint ' + (hint && hint.textContent));
    show(hint);
    await pause('signup-hint');
    setValue(root.querySelector('input[type="email"]'), email);
    setValue(root.querySelector('input[name="new-password"]'), 'seven!!');
    root.querySelector('form').requestSubmit();
    await until('short password', () => root.querySelector('[role="status"]')?.textContent === 'Use at least 8 characters.');
    show(root.querySelector('[role="status"]'));
    await pause('signup-error');
    setValue(root.querySelector('input[name="new-password"]'), password);
    const before = events('pwa-signup').length;
    root.querySelector('form').requestSubmit();
    await until('signup', () => events('pwa-signup').length > before);
    await until('notice', () => host.shadowRoot.textContent.includes('Check your inbox for the verification email'));
    await sleep(2200);
    show(host.shadowRoot.querySelector('[role="status"]') || host);
    await pause('signed-up');
    record('sign up', true, email);
  } catch (error) {
    record('sign up', false, error.message);
    window.__critical = results;
    return;
  }

  try {
    const drawer = document.querySelector('user-drawer');
    document.querySelector('header user-icon').shadowRoot.querySelector('button').click();
    await until('logout drawer', () => drawer.hasAttribute('drawer'));
    drawer.shadowRoot.querySelector('.leave').click();
    await until('logged out', () => !document.querySelector('user-login').shadowRoot.textContent.includes(email.slice(0, 12)));
    if (drawer.hasAttribute('drawer')) drawer.shadowRoot.querySelector('.close')?.click();
    await sleep(1500);
    const host = document.querySelector('user-login');
    const login = host.shadowRoot.querySelector('form-login');
    if (login.classList.contains('closed')) {
      host.shadowRoot.querySelector('form-signup').shadowRoot.querySelector('button.new').click();
      await sleep(2200);
    }
    const root = login.shadowRoot;
    const before = events('pwa-auth-error').length;
    setValue(root.querySelector('input[type="email"]'), email);
    setValue(root.querySelector('input[name="password"]'), 'not-the-password');
    root.querySelector('form').requestSubmit();
    await until('wrong password', () => events('pwa-auth-error').length > before);
    const wrong = root.querySelector('[role="status"]');
    if (!wrong || !wrong.textContent) throw new Error('no inline error');
    show(wrong);
    await pause('wrong-password');
    const resetBefore = events('pwa-reset-sent').length;
    root.querySelector('[part="forgot"]').click();
    await until('forgot', () => events('pwa-reset-sent').length > resetBefore);
    show(root.querySelector('[role="status"]') || root.querySelector('[part="forgot"]'));
    await pause('forgot');
    setValue(root.querySelector('input[name="password"]'), password);
    const loginBefore = events('pwa-login').length;
    root.querySelector('form').requestSubmit();
    await until('login', () => events('pwa-login').length > loginBefore);
    await pause('signed-in');
    document.querySelector('header user-icon').shadowRoot.querySelector('button').click();
    await until('signed-in drawer', () => document.querySelector('user-drawer').hasAttribute('drawer'));
    await sleep(1500);
    await pause('drawer-markers');
    document.querySelector('user-drawer').shadowRoot.querySelector('.close').click();
    record('sign in', true, 'wrong password, reset, then sign in');
  } catch (error) {
    record('sign in', false, error.message);
  }

  try {
    const settings = document.querySelector('user-settings');
    settings.shadowRoot.querySelector('button[value="verification"]').click();
    await sleep(2200);
    const name = settings.shadowRoot.querySelector('input-name');
    const before = events('pwa-profile-updated').length;
    setValue(name.shadowRoot.querySelector('input'), 'Ada Lovelace');
    name.shadowRoot.querySelector('button[type="submit"]').click();
    await until('name', () => events('pwa-profile-updated').length > before);
    show(name.shadowRoot.querySelector('[role="status"]') || name);
    await pause('name');
    record('name', true, 'Ada Lovelace');
  } catch (error) {
    record('name', false, error.message);
  }

  window.__critical = results;
  await pause('done');
})();
