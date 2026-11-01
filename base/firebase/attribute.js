import { pwaAuthError } from '../events/names.js';
import { emitWindow, toAuthError } from '../events/emit.js';
import { initialize, isReady } from './authentication.js';
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