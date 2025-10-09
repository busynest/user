import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const DeleteUser_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: import("../../../redux/object").frontendAuth;
        drawer: {
            drawer: boolean;
        };
        backend: import("../../../redux/object").backendAuth;
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class DeleteUser extends DeleteUser_base {
    private login;
    private email;
    constructor();
    protected firstUpdated(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private alertDelete;
    private deleteUser;
    private officialDelete;
}
declare global {
    interface HTMLElementTagNameMap {
        'delete-user': DeleteUser;
    }
}
export {};
