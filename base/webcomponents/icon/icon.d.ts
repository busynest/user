import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store.js';
declare const UserIcon_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
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
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class UserIcon extends UserIcon_base {
    subscribe: boolean;
    empty: string;
    private _user;
    private _open;
    private _photoURL;
    private _name;
    private _email;
    constructor();
    connectedCallback(): void;
    protected firstUpdated(): void;
    stateChanged(state: AppState): void;
    protected updated(): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
    private face;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-icon': UserIcon;
    }
}
export {};
//# sourceMappingURL=icon.d.ts.map