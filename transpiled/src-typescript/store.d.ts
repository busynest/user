export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    frontend: import("./redux/object").frontendAuth;
    drawer: {
        drawer: boolean;
    };
    backend: import("./redux/object").backendAuth;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        frontend: import("./redux/object").frontendAuth;
        drawer: {
            drawer: boolean;
        };
        backend: import("./redux/object").backendAuth;
    }, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
//# sourceMappingURL=store.d.ts.map