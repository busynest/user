import { PayloadAction } from "@reduxjs/toolkit";
export declare const accountSlice: import("@reduxjs/toolkit").Slice<{
    verified: boolean;
    anon: boolean;
    userId: string;
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    msgToken: string;
}, {
    accVerified: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<boolean>) => void;
    accAnon: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<boolean>) => void;
    accID: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
    accName: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
    accPhone: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
    accEmail: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
    accImage: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
    messageId: (state: import("immer").WritableDraft<{
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    }>, action: PayloadAction<string>) => void;
}, "backend", "backend", import("@reduxjs/toolkit").SliceSelectors<{
    verified: boolean;
    anon: boolean;
    userId: string;
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    msgToken: string;
}>>;
export declare const accVerified: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "backend/accVerified">, accID: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accID">, accName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accName">, accPhone: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accPhone">, accEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accEmail">, accImage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accImage">, accAnon: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "backend/accAnon">, messageId: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/messageId">;
declare const _default: import("redux").Reducer<{
    verified: boolean;
    anon: boolean;
    userId: string;
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    msgToken: string;
}, import("redux").UnknownAction, {
    verified: boolean;
    anon: boolean;
    userId: string;
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    msgToken: string;
}>;
export default _default;
