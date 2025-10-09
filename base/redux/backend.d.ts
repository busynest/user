import { PayloadAction } from "@reduxjs/toolkit";
import { backendAuth } from "./object";
export declare const accountSlice: import("@reduxjs/toolkit").Slice<backendAuth, {
    accVerified: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<boolean>) => void;
    accAnon: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<boolean>) => void;
    accID: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
    accName: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
    accPhone: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
    accEmail: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
    accImage: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
    messageId: (state: import("immer").WritableDraft<backendAuth>, action: PayloadAction<string>) => void;
}, "backend", "backend", import("@reduxjs/toolkit").SliceSelectors<backendAuth>>;
export declare const accVerified: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "backend/accVerified">, accID: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accID">, accName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accName">, accPhone: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accPhone">, accEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accEmail">, accImage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/accImage">, accAnon: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "backend/accAnon">, messageId: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "backend/messageId">;
declare const _default: import("redux").Reducer<backendAuth, import("redux").UnknownAction, backendAuth>;
export default _default;
