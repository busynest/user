import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store.js';
import './input/uploader.js';
import './input/name.js';
import './input/email.js';
import './input/password.js';
import './input/delete.js';
import './input/verify.js';
declare const UserSettings_base: (new (...args: any[]) => {
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
export declare class UserSettings extends UserSettings_base {
    empty: string;
    private profileTopic;
    private name;
    private email;
    private login;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onSubmit;
    private onTabKey;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    private openTab;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-settings': UserSettings;
    }
}
export {};
//# sourceMappingURL=settings.d.ts.map