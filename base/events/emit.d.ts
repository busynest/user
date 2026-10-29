import type { PwaAuthErrorDetail, PwaUser } from './types';
export declare function toPwaUser(user: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified?: boolean;
} | null): PwaUser | null;
export declare function emitWindow<T>(name: string, detail: T): void;
export declare function emitElement<T>(target: EventTarget, name: string, detail: T): void;
export declare function toAuthError(error: unknown): PwaAuthErrorDetail;
