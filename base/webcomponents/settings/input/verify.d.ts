import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../../store.js';
declare const EmailVerify_base: (new (...args: any[]) => {
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
export declare class EmailVerify extends EmailVerify_base {
    private login;
    private verified;
    private email;
    private status;
    private tone;
    private busy;
    private cooldown;
    private timer;
    constructor();
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    private lead;
    private buttonLabel;
    protected render(): import("lit-html").TemplateResult<1>;
    private resend;
    private showSent;
    private showFirebase;
    private focusStatus;
    private clearWait;
    private armCooldown;
}
declare global {
    interface HTMLElementTagNameMap {
        'email-verify': EmailVerify;
    }
}
export {};
//# sourceMappingURL=verify.d.ts.map