import { store } from '../store.js';
import { closeSign, openSign, toggleSign } from '../redux/session.js';
export function openDrawer() {
    store.dispatch(openSign());
}
export function closeDrawer() {
    store.dispatch(closeSign());
}
export function toggleDrawer() {
    store.dispatch(toggleSign());
}
//# sourceMappingURL=drawer.js.map