import { LitElement } from 'lit';
export declare class UserLogIn extends LitElement {
    private email;
    private password;
    constructor();
    static get styles(): import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    private change;
    private handleEmail;
    private handlePassword;
    private _handleSubmit;
    private login;
    private signIn;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-log-in': UserLogIn;
    }
}
//# sourceMappingURL=login.d.ts.map