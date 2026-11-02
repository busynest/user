import { store } from '../store.js';
import { closeSign, openSign, toggleSign } from '../redux/session.js';

/** Required - open the drawer. */
export function openDrawer(): void {
  store.dispatch(openSign());
}

/** Required - close the drawer. */
export function closeDrawer(): void {
  store.dispatch(closeSign());
}

/** Required - flip the drawer. */
export function toggleDrawer(): void {
  store.dispatch(toggleSign());
}
