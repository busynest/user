import { store } from '../store.js';
import { closeSign, openSign, toggleSign } from '../redux/session.js';
/** Required - open the drawer. */
export function openDrawer() {
    store.dispatch(openSign());
}
/** Required - close the drawer. */
export function closeDrawer() {
    store.dispatch(closeSign());
}
/** Required - flip the drawer. */
export function toggleDrawer() {
    store.dispatch(toggleSign());
}
//# sourceMappingURL=drawer.js.map