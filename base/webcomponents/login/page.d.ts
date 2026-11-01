import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store.js';
import '../form/login.js';
import '../form/signup.js';
declare const UserLogin_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: {
            settings: string;
            login: boolean;
            drawer: boolean;
            registerOne: boolean;
            registerTwo: boolean;
            userId: string;
            customer: string;
            profileChoice: string;
            name: string;
            photoURL: string;
            phone: string;
            email: string;
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
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class UserLogin extends UserLogin_base {
    subscribe: boolean;
    hideGoogle: boolean;
    private _name;
    private _email;
    private _verified;
    private _notice;
    private _log;
    private _sign;
    private stopNotice;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-login': UserLogin;
    }
}
export {};
//# sourceMappingURL=page.d.ts.map