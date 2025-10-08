export interface frontendAuth {
    login: boolean;
    drawer: boolean;
    register: boolean;
    settings: string;
    userId: string;
    customer: string;
    name: string;
    photoURL: string;
    phone: string;
    email: string;
    profileChoice: string;
}
export interface backendAuth {
    verified: boolean;
    anon: boolean;
    userId: string;
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    msgToken: string;
}
//# sourceMappingURL=object.d.ts.map