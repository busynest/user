import { TemplateResult } from 'lit';
import { LazyLoader } from '../../lazyLoader';
export declare class EmailReset extends LazyLoader {
    private userEmail;
    private status;
    private tone;
    private invalid;
    private busy;
    private cooldown;
    private touched;
    private timer;
    private stopDraft;
    constructor();
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    private prefill;
    private paintEmail;
    private handleEmail;
    private buttonLabel;
    protected render(): TemplateResult;
    private resetPassword;
    private showSent;
    private showError;
    private showFirebase;
    private focusAfter;
    private focusEmail;
    private focusStatus;
    private armCooldown;
    private backToSignIn;
}
declare global {
    interface HTMLElementTagNameMap {
        'email-reset': EmailReset;
    }
}
