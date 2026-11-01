import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store.js";
declare const InputPassword_base: (new (...args: any[]) => {
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
        };
        backend: {
            verified: boolean;
            name: string;
            email: string;
            photoURL: string;
        };
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class InputPassword extends InputPassword_base {
    private message;
    private tone;
    private password;
    private login;
    private busy;
    private showCurrent;
    private showNext;
    private showVerify;
    constructor();
    stateChanged(state: AppState): void;
    private handleInputChange;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private show;
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
//# sourceMappingURL=password.d.ts.map