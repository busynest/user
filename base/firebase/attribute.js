import { pwaAuthError } from '../events/names.js';
import { emitWindow, toAuthError } from '../events/emit.js';
import { initialize, isReady } from './authentication.js';
/** Optional - firebase-config JSON on a host element, used when the app is not up yet. */
export function applyFirebaseConfig(host) {
    if (isReady())
        return;
    const raw = host.getAttribute('firebase-config');
    if (!raw)
        return;
    try {
        initialize({ config: JSON.parse(raw) });
    }
    catch (error) {
        emitWindow(pwaAuthError, toAuthError(error));
    }
}
//# sourceMappingURL=attribute.js.map