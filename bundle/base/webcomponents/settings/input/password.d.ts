import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const InputPassword_base: (new (...args: any[]) => {
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
export declare class InputPassword extends InputPassword_base {
    private message;
    private password;
    private login;
    constructor();
    protected firstUpdated(): void;
    stateChanged(state: AppState): void;
    private handleInputChange;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private default;
    private alertPassword;
    private updatePass;
}
declare global {
    interface HTMLElementTagNameMap {
        'input-password': InputPassword;
    }
}
export {};
