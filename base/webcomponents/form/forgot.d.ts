import { TemplateResult } from 'lit';
import { LazyLoader } from '../../lazyLoader';
export declare class EmailReset extends LazyLoader {
    private userEmail;
    constructor();
    protected firstUpdated(): void;
    private handleEmail;
    protected render(): TemplateResult;
    private restPassword;
}
declare global {
    interface HTMLElementTagNameMap {
        'email-reset': EmailReset;
    }
}
