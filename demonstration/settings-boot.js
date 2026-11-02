import '../base/export/pwa-auth.js';
import { store } from '../base/store.js';
import { accEmail, accName, userAuth } from '../base/redux/session.js';
import { pwaAuthChanged } from '../base/events/names.js';

// Fake signed-in state. Local only. Firebase has no session, so the tabs open without an account.
// The auth listener dispatches userAuth(false) when it sees no user. Reapply after that callback.
function fakeSignIn() {
  store.dispatch(userAuth(true));
  store.dispatch(accName('Ada Lovelace'));
  store.dispatch(accEmail('ada@example.com'));
}

window.addEventListener(pwaAuthChanged, () => {
  queueMicrotask(fakeSignIn);
});

fakeSignIn();
