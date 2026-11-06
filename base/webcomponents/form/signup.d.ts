import { LitElement } from 'lit';
export declare class FormSignup extends LitElement {
    source: string;
    /** @attr hide-google */
    hideGoogle: boolean;
    private email;
    private password;
    private status;
    private tone;
    private busy;
    private showPassword;
    private notice;
    constructor();
    connectedCallback(): void;
    protected updated(): void;
    private adoptRedirect;
    static get styles(): import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    private change;
    private google;
    private show;
    private readFields;
    private _handleSubmit;
    private handleEmail;
    private handlePassword;
    private signUp;
    private newAccount;
}
declare global {
    interface HTMLElementTagNameMap {
        'form-signup': FormSignup;
    }
}
//# sourceMappingURL=signup.d.ts.map