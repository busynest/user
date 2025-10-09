import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const ContactEmail_base: (new (...args: any[]) => {
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
export declare class ContactEmail extends ContactEmail_base {
    email: string;
    private login;
    private mail;
    constructor();
    stateChanged(state: AppState): void;
    private handleEmail;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private default;
    private saveEmail;
}
declare global {
    interface HTMLElementTagNameMap {
        'contact-email': ContactEmail;
    }
}
export {};
