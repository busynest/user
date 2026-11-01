import { LitElement } from 'lit';
export declare class FormLogin extends LitElement {
    source: string;
    hideGoogle: boolean;
    private email;
    private password;
    private status;
    private tone;
    private busy;
    private resetBusy;
    private showPassword;
    constructor();
    connectedCallback(): void;
    protected updated(): void;
    private adoptRedirect;
    static get styles(): import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    private change;
    private google;
    private show;
    private handleEmail;
    private handlePassword;
    private readFields;
    private _handleSubmit;
    private login;
    private signIn;
    private forgot;
    private sent;
}
declare global {
    interface HTMLElementTagNameMap {
        'form-login': FormLogin;
    }
}
//# sourceMappingURL=login.d.ts.map