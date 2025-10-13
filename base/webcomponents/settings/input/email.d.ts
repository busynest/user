import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const ContactEmail_base: (new (...args: any[]) => {
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
