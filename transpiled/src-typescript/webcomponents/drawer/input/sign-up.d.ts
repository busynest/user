import { LitElement } from 'lit';
export declare class UserSignUp extends LitElement {
    private email;
    private password;
    constructor();
    static get styles(): import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    private change;
    private _handleSubmit;
    private handleEmail;
    private handlePassword;
    private signUp;
    private newAccount;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-sign-up': UserSignUp;
    }
}
//# sourceMappingURL=sign-up.d.ts.map