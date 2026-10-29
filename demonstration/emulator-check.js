import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getBytes, ref, uploadBytes } from 'firebase/storage';
import { auth, db, getCurrentUser, logOut, onUserChanged, storage } from '../base/export/pwa-auth.js';

const password = 'secret12';
const email = 'slim-' + Date.now() + '@example.com';
const other = 'other-' + Date.now() + '@example.com';
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

function input(root, selector) {
  const found = root.querySelector(selector);
  if (!found) throw new Error('missing ' + selector);
  return found;
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

async function signUp() {
  const before = events('pwa-signup').length;
  const host = document.querySelector('user-login');
  const form = host.shadowRoot.querySelector('form-signup');
  const root = form.shadowRoot;
  setValue(input(root, 'input[type="email"]'), email);
  setValue(input(root, 'input[type="password"]'), password);
  input(root, 'button[type="submit"]').click();
  await until('signup', () => events('pwa-signup').length > before && auth.currentUser);
  const detail = events('pwa-signup').at(-1).detail;
  if (!detail.user || detail.user.email !== email || !detail.user.uid) {
    throw new Error('signup detail ' + JSON.stringify(detail));
  }
}

async function signInForm(address, pass) {
  const host = document.querySelector('user-login');
  const form = host.shadowRoot.querySelector('form-login');
  if (form.hasAttribute('inert') || form.classList.contains('closed')) {
    host.shadowRoot.querySelector('form-signup').shadowRoot.querySelector('button.new').click();
    await sleep(50);
  }
  const root = form.shadowRoot;
  setValue(input(root, 'input[type="email"]'), address);
  setValue(input(root, 'input[type="password"]'), pass);
  input(root, 'button[type="submit"]').click();
}

window.__criticalPromise = (async () => {
  try {
    await pause('signed-out');

    try {
      const before = events('pwa-auth-error').length;
      const host = document.querySelector('user-login');
      const form = host.shadowRoot.querySelector('form-signup');
      const root = form.shadowRoot;
      setValue(input(root, 'input[type="email"]'), 'a');
      setValue(input(root, 'input[type="password"]'), password);
      const seenValue = input(root, 'input[type="email"]').value;
      root.querySelector('form').requestSubmit();
      await sleep(300);
      if (events('pwa-auth-error').length === before) {
        throw new Error('value=' + seenValue + ' alerts=' + JSON.stringify(window.__alerts));
      }
      const detail = events('pwa-auth-error').at(-1).detail;
      if (detail.code !== 'pwa/missing-email') throw new Error(JSON.stringify(detail));
      record('short email', true, detail.message);
    } catch (error) {
      record('short email', false, error.message);
    }

    try {
      await signUp();
      record('sign up', true, email);
    } catch (error) {
      record('sign up', false, error.message);
      window.__critical = results;
      return;
    }

    const uid = auth.currentUser.uid;
    const seen = [];
    const stop = onUserChanged((user) => { seen.push(user); });
    await until('current user', () => getCurrentUser() && getCurrentUser().uid === uid);
    const snap = getCurrentUser();
    if (!snap || snap.email !== email || snap.uid !== uid) {
      record('onUserChanged / getCurrentUser', false, JSON.stringify(snap));
    } else if (!seen.some((user) => user && user.uid === uid)) {
      record('onUserChanged / getCurrentUser', false, 'callback missed the user');
    } else {
      record('onUserChanged / getCurrentUser', true, snap.uid);
    }

    try {
      await signOut(auth);
      await until('signed out', () => !auth.currentUser);
      const before = events('pwa-auth-error').length;
      await signInForm(email, 'not-the-password');
      await until('wrong password', () => events('pwa-auth-error').length > before);
      const detail = events('pwa-auth-error').at(-1).detail;
      if (!String(detail.code).includes('password') && detail.code !== 'auth/invalid-credential') {
        throw new Error(JSON.stringify(detail));
      }
      record('wrong password', true, detail.code);
    } catch (error) {
      record('wrong password', false, error.message);
    }

    try {
      const before = events('pwa-login').length;
      await signInForm(email, password);
      await until('login', () => events('pwa-login').length > before && auth.currentUser);
      const detail = events('pwa-login').at(-1).detail;
      if (!detail.user || detail.user.uid !== uid) throw new Error(JSON.stringify(detail));
      record('log in', true, detail.user.email);
    } catch (error) {
      record('log in', false, error.message);
    }

    try {
      const reset = document.querySelector('email-reset');
      const root = reset.shadowRoot;
      const beforeError = events('pwa-auth-error').length;
      setValue(input(root, 'input[type="email"]'), 'not-an-email');
      root.querySelector('form').requestSubmit();
      await until('reset invalid', () => events('pwa-auth-error').length > beforeError);
      const bad = events('pwa-auth-error').at(-1).detail;
      if (bad.code !== 'pwa/invalid-email') throw new Error(JSON.stringify(bad));
      const invalidStatus = root.querySelector('#pwa-reset-status').textContent;
      if (!String(invalidStatus).includes('valid email')) throw new Error(invalidStatus);

      const before = events('pwa-reset-sent').length;
      setValue(input(root, 'input[type="email"]'), email);
      root.querySelector('form').requestSubmit();
      await until('reset sent', () => events('pwa-reset-sent').length > before);
      const detail = events('pwa-reset-sent').at(-1).detail;
      if (!detail || detail.email !== email) throw new Error(JSON.stringify(detail));
      const status = root.querySelector('#pwa-reset-status').textContent;
      const sentence = 'If an account uses that email, a reset link is on its way.';
      if (status !== sentence) throw new Error(status);
      if (!window.__alerts.includes(sentence)) throw new Error(JSON.stringify(window.__alerts));
      const leaked = events('pwa-auth-error').slice(beforeError + 1).some((item) => {
        return String(item.detail.code).includes('user-not-found');
      });
      if (leaked) throw new Error('reset revealed a missing account');
      const button = root.querySelector('button[type="submit"]');
      if (!button.disabled) throw new Error('expected a resend cooldown');
      const response = await fetch('http://127.0.0.1:9099/emulator/v1/projects/pwa-authentic/oobCodes');
      const body = await response.json();
      const sent = (body.oobCodes || []).some((item) => item.email === email && String(item.requestType).includes('PASSWORD'));
      if (!sent) throw new Error('no reset code ' + JSON.stringify(body.oobCodes));
      record('forgot password', true, 'pwa-reset-sent, same sentence, emulator code');
    } catch (error) {
      record('forgot password', false, error.message);
    }

    try {
      const drawer = document.querySelector('user-drawer');
      document.querySelector('user-icon').shadowRoot.querySelector('button').click();
      await until('drawer open', () => drawer.hasAttribute('drawer'));
      await sleep(1600);
      await pause('drawer-open');
      const close = drawer.shadowRoot.querySelector('.close');
      const focused = drawer.shadowRoot.activeElement === close;
      close.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));
      const afterTab = drawer.shadowRoot.activeElement;
      const stayed = afterTab && drawer.contains(afterTab) || (afterTab && afterTab.getRootNode() instanceof ShadowRoot);
      drawer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
      await until('drawer escape', () => !drawer.hasAttribute('drawer'));
      document.querySelector('user-icon').shadowRoot.querySelector('button').click();
      await until('drawer reopen', () => drawer.hasAttribute('drawer'));
      drawer.shadowRoot.querySelector('.close').click();
      await until('drawer close', () => !drawer.hasAttribute('drawer'));
      if (!focused) throw new Error('close button did not take focus');
      record('drawer', true, stayed ? 'open, Escape, close, focus stayed' : 'open, Escape, close; tab focus left the drawer');
      await pause('drawer');
    } catch (error) {
      record('drawer', false, error.message);
    }

    try {
      const settings = document.querySelector('user-settings');
      settings.shadowRoot.querySelector('button[value="verification"]').click();
      await sleep(50);
      const name = settings.shadowRoot.querySelector('input-name');
      const before = events('pwa-profile-updated').length;
      setValue(input(name.shadowRoot, 'input'), 'Ada Lovelace');
      name.shadowRoot.querySelector('button').click();
      await until('name', () => events('pwa-profile-updated').length > before);
      const detail = events('pwa-profile-updated').at(-1).detail;
      if (detail.displayName !== 'Ada Lovelace' || detail.uid !== uid) throw new Error(JSON.stringify(detail));
      record('change display name', true, detail.displayName);
    } catch (error) {
      record('change display name', false, error.message);
    }

    try {
      const settings = document.querySelector('user-settings');
      const mail = settings.shadowRoot.querySelector('contact-email');
      const before = events('pwa-email-changed').length;
      const next = 'ada-' + Date.now() + '@example.com';
      setValue(input(mail.shadowRoot, 'input[type="email"]'), next);
      setValue(input(mail.shadowRoot, '#pwa-current-email-password'), password);
      mail.shadowRoot.querySelector('button').click();
      await until('email', () => events('pwa-email-changed').length > before);
      const detail = events('pwa-email-changed').at(-1).detail;
      if (detail.email !== next) throw new Error(JSON.stringify(detail));
      const legacy = events('userEmailChanged').at(-1);
      if (!legacy || legacy.detail.email !== next) throw new Error('legacy email event missing');
      record('change email', true, detail.email);
    } catch (error) {
      record('change email', false, error.message);
    }

    try {
      const settings = document.querySelector('user-settings');
      settings.shadowRoot.querySelector('button[value="password"]').click();
      await sleep(50);
      const box = settings.shadowRoot.querySelector('input-password');
      const root = box.shadowRoot;
      const before = events('pwa-password-changed').length;
      setValue(input(root, '#pwa-current-password'), password);
      setValue(input(root, '#pwa-new-password'), 'secret99');
      setValue(input(root, '#pwa-verify-password'), 'secret99');
      root.querySelector('button[type="submit"]').click();
      await until('password event', () => events('pwa-password-changed').length > before);
      const detail = events('pwa-password-changed').at(-1).detail;
      if (detail.uid !== uid || detail.password) throw new Error(JSON.stringify(detail));
      await signOut(auth);
      await signInWithEmailAndPassword(auth, email, 'secret99');
      if (!auth.currentUser || auth.currentUser.uid !== uid) throw new Error('new password rejected');
      record('change password', true, 'pwa-password-changed ' + detail.uid);
    } catch (error) {
      record('change password', false, error.message);
    }

    try {
      if (!auth.currentUser) await signInWithEmailAndPassword(auth, email, 'secret99');
      const settings = document.querySelector('user-settings');
      settings.shadowRoot.querySelector('button[value="profile"]').click();
      await sleep(100);
      const photo = settings.shadowRoot.querySelector('contact-photo');
      await until('photo user', () => photo.user || photo.shadowRoot);
      const file = new File([new Uint8Array([137, 80, 78, 71])], 'face.png', { type: 'image/png' });
      const list = new DataTransfer();
      list.items.add(file);
      const picker = photo.shadowRoot.querySelector('input[type="file"]');
      picker.files = list.files;
      const before = events('pwa-profile-updated').length;
      picker.dispatchEvent(new Event('change', { bubbles: true }));
      await until('photo', () => events('pwa-profile-updated').length > before && auth.currentUser.photoURL);
      const detail = events('pwa-profile-updated').at(-1).detail;
      if (!detail.photoURL || detail.uid !== uid) throw new Error(JSON.stringify(detail));
      record('upload photo', true, 'stored under pwa-auth/' + uid);
      await pause('settings');
    } catch (error) {
      record('upload photo', false, error.message);
    }

    try {
      if (!auth.currentUser) await signInWithEmailAndPassword(auth, email, 'secret99');
      await setDoc(doc(db, 'users', uid), { owner: uid, email });
      await uploadBytes(ref(storage, 'pwa-auth/' + uid + '/note.txt'), new Uint8Array([1, 2, 3]));
      const settings = document.querySelector('user-settings');
      settings.shadowRoot.querySelector('button[value="delete"]').click();
      await sleep(50);
      setValue(input(settings.shadowRoot.querySelector('delete-user').shadowRoot, '#pwa-delete-password'), 'secret99');
      await sleep(50);
      const before = events('pwa-account-deleted').length;
      settings.shadowRoot.querySelector('delete-user').shadowRoot.querySelector('button').click();
      await until('deleted', () => events('pwa-account-deleted').length > before);
      const detail = events('pwa-account-deleted').at(-1).detail;
      if (detail.uid !== uid) throw new Error(JSON.stringify(detail));
      if (auth.currentUser) throw new Error('auth user still signed in');
      let signInFailed = false;
      try {
        await signInWithEmailAndPassword(auth, email, 'secret99');
      } catch {
        signInFailed = true;
      }
      if (!signInFailed) throw new Error('deleted user can still sign in');
      const docResponse = await fetch('http://127.0.0.1:8181/v1/projects/pwa-authentic/databases/(default)/documents/users/' + uid, {
        headers: { Authorization: 'Bearer owner' }
      });
      const fileResponse = await fetch('http://127.0.0.1:9199/v0/b/pwa-authentic.appspot.com/o/pwa-auth%2F' + uid + '%2Fnote.txt', {
        headers: { Authorization: 'Bearer owner' }
      });
      if (docResponse.status === 404) throw new Error('host users doc was removed');
      if (fileResponse.status !== 404) throw new Error('storage file status ' + fileResponse.status);
      record('delete account', true, 'auth user and files removed; users doc left for the host');
    } catch (error) {
      record('delete account', false, error.message);
    }

    try {
      const owner = uid;
      await createUserWithEmailAndPassword(auth, other, password);
      let docDenied = false;
      try {
        await getDoc(doc(db, 'users', owner));
      } catch (error) {
        docDenied = String(error.code || error.message).includes('permission');
      }
      let fileDenied = false;
      try {
        await getBytes(ref(storage, 'pwa-auth/' + owner + '/face.png'));
      } catch (error) {
        fileDenied = true;
      }
      await signOut(auth);
      let anonDenied = false;
      try {
        await getDoc(doc(db, 'users', owner));
      } catch (error) {
        anonDenied = String(error.code || error.message).includes('permission');
      }
      if (!docDenied || !fileDenied || !anonDenied) {
        throw new Error('doc ' + docDenied + ' file ' + fileDenied + ' anon ' + anonDenied);
      }
      record('rules', true, 'other user and signed-out reads denied');
    } catch (error) {
      record('rules', false, error.message);
    }

    try {
      const count = seen.length;
      stop();
      await signInWithEmailAndPassword(auth, other, password);
      await sleep(200);
      if (seen.length !== count) throw new Error('callback ran after unsubscribe');
      const before = events('pwa-logout').length;
      await logOut();
      await until('logout', () => events('pwa-logout').length > before && !auth.currentUser);
      const detail = events('pwa-logout').at(-1).detail;
      if (!detail || detail.user !== null) throw new Error(JSON.stringify(detail));
      if (getCurrentUser()) throw new Error('getCurrentUser still set');
      record('logout', true, 'pwa-logout { user: null }');
    } catch (error) {
      record('logout', false, error.message);
    }

    const loggedOut = events('pwa-logout').at(-1);
    if (!loggedOut || loggedOut.detail.user !== null) {
      const row = results.find((item) => item.feature === 'logout');
      if (row && row.pass) {
        row.pass = false;
        row.note = 'missing pwa-logout detail';
      }
    }
  } catch (error) {
    record('harness', false, error.message);
  }

  window.__critical = results;
  await pause('done');
})();
