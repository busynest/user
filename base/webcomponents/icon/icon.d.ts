import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store';
declare const UserIcon_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: import("../../redux/object").frontendAuth;
        drawer: {
            drawer: boolean;
        };
        backend: import("../../redux/object").backendAuth;
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class UserIcon extends UserIcon_base {
    subscribe: boolean;
    empty: string;
    private _user;
    private _photoURL;
    constructor();
    protected firstUpdated(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-icon': UserIcon;
    }
}
export {};
