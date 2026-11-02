import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store.js";
declare const DeleteUser_base: (new (...args: any[]) => {
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
export declare class DeleteUser extends DeleteUser_base {
    private login;
    private email;
    private busy;
    private status;
    private tone;
    private showPassword;
    constructor();
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private show;
    private alertDelete;
    private officialDelete;
}
declare global {
    interface HTMLElementTagNameMap {
        'delete-user': DeleteUser;
    }
}
export {};
//# sourceMappingURL=delete.d.ts.map