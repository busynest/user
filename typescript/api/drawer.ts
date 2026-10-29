import { store } from '../store';
import { closeSign, openSign, toggleSign } from '../redux/frontend';

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
