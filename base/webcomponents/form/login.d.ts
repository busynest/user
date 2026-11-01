import { LitElement } from 'lit';
export declare class FormLogin extends LitElement {
    source: string;
    private email;
    private password;
    private status;
    private tone;
    private busy;
    private resetBusy;
    private showPassword;
    constructor();
    static get styles(): import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    private change;
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