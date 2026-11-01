import { CSSResultArray, LitElement, PropertyValues } from 'lit';
import { AppState } from '../../store.js';
import '../form/login.js';
import '../form/signup.js';
declare const UserDrawer_base: (new (...args: any[]) => {
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
export declare class UserDrawer extends UserDrawer_base {
    url: string;
    drawer: boolean;
    subscribe: boolean;
    private name;
    private email;
    private verified;
    private notice;
    private user;
    private signup;
    private wasOpen;
    private sawOpen;
    private returnFocus;
    private stopNotice;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    protected updated(changed: PropertyValues): void;
    private onKey;
    protected firstUpdated(): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
    private destination;
    private settingsControl;
    private onSettings;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-drawer': UserDrawer;
    }
}
export {};
//# sourceMappingURL=drawer.d.ts.map