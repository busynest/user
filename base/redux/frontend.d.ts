import { PayloadAction } from "@reduxjs/toolkit";
export declare const initialState: {
    settings: string;
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
};
export declare const userSlice: import("@reduxjs/toolkit").Slice<{
    settings: string;
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
}, {
    navigateAuth: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }, action: PayloadAction<string>) => void;
    userAuth: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }, action: PayloadAction<boolean>) => void;
    toggleSign: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }) => void;
    openSign: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }) => void;
    closeSign: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }) => void;
    universalToggle: (state: {
        settings: string;
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
    }, action: PayloadAction<string>) => void;
}, "user", "user", import("@reduxjs/toolkit").SliceSelectors<{
    settings: string;
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
}>>;
export declare const universalToggle: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/universalToggle">, navigateAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "user/navigateAuth">, userAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "user/userAuth">, toggleSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/toggleSign">, openSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/openSign">, closeSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/closeSign">;
declare const _default: import("redux").Reducer<{
    settings: string;
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
}>;
export default _default;
//# sourceMappingURL=frontend.d.ts.map