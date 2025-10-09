export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    frontend: {
        settings: string;
        login: boolean;
        drawer: boolean;
        register: boolean;
        userId: string;
        customer: string;
        profileChoice: string;
        name: string;
        photoURL: string;
        phone: string;
        email: string;
    };
    drawer: {
        drawer: boolean;
    };
    backend: {
        verified: boolean;
        anon: boolean;
        userId: string;
        name: string;
        email: string;
        photoURL: string;
        phone: string;
        msgToken: string;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        frontend: {
            settings: string;
            login: boolean;
            drawer: boolean;
            register: boolean;
            userId: string;
            customer: string;
            profileChoice: string;
            name: string;
            photoURL: string;
            phone: string;
            email: string;
        };
        drawer: {
            drawer: boolean;
        };
        backend: {
            verified: boolean;
            anon: boolean;
            userId: string;
            name: string;
            email: string;
            photoURL: string;
            phone: string;
            msgToken: string;
        };
    }, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
