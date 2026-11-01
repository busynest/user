import { PayloadAction } from "@reduxjs/toolkit";
export declare const accountSlice: import("@reduxjs/toolkit").Slice<{
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}, {
    accVerified: (state: {
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<boolean>) => void;
    accName: (state: {
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>) => void;
    accEmail: (state: {
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>) => void;
    accImage: (state: {
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>) => void;
}, "backend", "backend", import("@reduxjs/toolkit").SliceSelectors<{
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}>>;
export declare const accVerified: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "backend/accVerified">, accName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accName">, accEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accEmail">, accImage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accImage">;
declare const _default: import("redux").Reducer<{
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}>;
export default _default;
//# sourceMappingURL=backend.d.ts.map