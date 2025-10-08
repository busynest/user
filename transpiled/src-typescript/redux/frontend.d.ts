import { PayloadAction } from "@reduxjs/toolkit";
import { frontendAuth } from "./object";
export declare const initialState: frontendAuth;
export declare const userSlice: import("@reduxjs/toolkit").Slice<frontendAuth, {
    navigateAuth: (state: import("immer").WritableDraft<frontendAuth>, action: PayloadAction<string>) => void;
    userAuth: (state: import("immer").WritableDraft<frontendAuth>, action: PayloadAction<boolean>) => void;
    toggleSign: (state: import("immer").WritableDraft<frontendAuth>) => void;
    closeSign: (state: import("immer").WritableDraft<frontendAuth>) => void;
    signUpAction: (state: import("immer").WritableDraft<frontendAuth>) => void;
    signUpClose: (state: import("immer").WritableDraft<frontendAuth>, action: PayloadAction<boolean>) => void;
    iconAuth: (state: import("immer").WritableDraft<frontendAuth>, action: PayloadAction<string>) => void;
    nameAuth: (state: import("immer").WritableDraft<frontendAuth>, action: PayloadAction<string>) => void;
}, "user", "user", import("@reduxjs/toolkit").SliceSelectors<frontendAuth>>;
export declare const navigateAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/navigateAuth">, iconAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/iconAuth">, nameAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/nameAuth">, userAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "user/userAuth">, toggleSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/toggleSign">, closeSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/closeSign">, signUpAction: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/signUpAction">, signUpClose: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "user/signUpClose">;
declare const _default: import("redux").Reducer<frontendAuth, import("redux").UnknownAction, frontendAuth>;
export default _default;
//# sourceMappingURL=frontend.d.ts.map