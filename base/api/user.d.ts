import type { PwaUser } from '../events/types.js';
export declare function getCurrentUser(): PwaUser | null;
export declare function onUserChanged(callback: (user: PwaUser | null) => void): () => void;
//# sourceMappingURL=user.d.ts.map