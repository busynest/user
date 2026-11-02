import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store.js";
declare const ContactEmail_base: (new (...args: any[]) => {
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
export declare class ContactEmail extends ContactEmail_base {
    email: string;
    private login;
    private mail;
    private busy;
    private status;
    private tone;
    private showPassword;
    constructor();
    stateChanged(state: AppState): void;
    private handleEmail;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private show;
    private saveEmail;
}
declare global {
    interface HTMLElementTagNameMap {
        'contact-email': ContactEmail;
    }
}
export {};
//# sourceMappingURL=email.d.ts.map