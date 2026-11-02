export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    session: {
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
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        session: {
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
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
//# sourceMappingURL=store.d.ts.map