import { TemplateResult } from 'lit';
import { LazyLoader } from '../../lazyLoader';
export declare class EmailReset extends LazyLoader {
    private userEmail;
    constructor();
    private handleEmail;
    protected render(): TemplateResult;
    private resetPassword;
}
declare global {
    interface HTMLElementTagNameMap {
        'email-reset': EmailReset;
    }
}
