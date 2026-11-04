import { PayloadAction } from '@reduxjs/toolkit';
/** Required - one tree. UI flags and the account fields the elements read. */
export declare const initialState: {
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
    settings: string;
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
};
export declare const sessionSlice: import("@reduxjs/toolkit").Slice<{
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
    settings: string;
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}, {
    navigateAuth(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>): void;
    userAuth(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<boolean>): void;
    toggleSign(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }): void;
    openSign(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }): void;
    closeSign(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }): void;
    universalToggle(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>): void;
    accName(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>): void;
    accEmail(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>): void;
    accImage(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<string>): void;
    accVerified(state: {
        login: boolean;
        drawer: boolean;
        registerOne: boolean;
        registerTwo: boolean;
        settings: string;
        verified: boolean;
        name: string;
        email: string;
        photoURL: string;
    }, action: PayloadAction<boolean>): void;
}, "session", "session", import("@reduxjs/toolkit").SliceSelectors<{
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
    settings: string;
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}>>;
export declare const navigateAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "session/navigateAuth">, userAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "session/userAuth">, toggleSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"session/toggleSign">, openSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"session/openSign">, closeSign: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"session/closeSign">, universalToggle: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "session/universalToggle">, accName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "session/accName">, accEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "session/accEmail">, accImage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "session/accImage">, accVerified: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "session/accVerified">;
declare const _default: import("redux").Reducer<{
    login: boolean;
    drawer: boolean;
    registerOne: boolean;
    registerTwo: boolean;
    settings: string;
    verified: boolean;
    name: string;
    email: string;
    photoURL: string;
}>;
export default _default;
//# sourceMappingURL=session.d.ts.map