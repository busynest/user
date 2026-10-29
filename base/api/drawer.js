import { store } from '../store';
import { closeSign, openSign, toggleSign } from '../redux/frontend';
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