import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store';
import './input/login';
import './input/sign-up';
declare const UserDrawer_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
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
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class UserDrawer extends UserDrawer_base {
    private url;
    drawer: boolean;
    subscribe: boolean;
    private _name;
    private _log;
    private _sign;
    constructor();
    stateChanged(state: AppState): void;
    protected firstUpdated(): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-drawer': UserDrawer;
    }
}
export {};
