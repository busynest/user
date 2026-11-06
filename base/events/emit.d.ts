import type { PwaAuthErrorDetail, PwaUser } from './types.js';
/** Required - copy the fields a host is allowed to read. */
export declare function toPwaUser(user: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified?: boolean;
} | null): PwaUser | null;
/** Required - global events go on window. */
export declare function emitWindow<T>(name: string, detail: T): void;
/** Required - UI events go on the element. */
export declare function emitElement<T>(target: EventTarget, name: string, detail: T): void;
/** Required - Firebase errors carry code. Other throws get pwa/unknown. */
export declare function toAuthError(error: unknown): PwaAuthErrorDetail;
//# sourceMappingURL=emit.d.ts.map