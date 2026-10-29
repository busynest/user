import { pwaAuthError } from '../events/names';
import { emitWindow, toAuthError } from '../events/emit';
import { initialize, isReady } from './authentication';
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