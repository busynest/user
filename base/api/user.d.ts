import type { PwaUser } from '../events/types';
export declare function getCurrentUser(): PwaUser | null;
export declare function onUserChanged(callback: (user: PwaUser | null) => void): () => void;
