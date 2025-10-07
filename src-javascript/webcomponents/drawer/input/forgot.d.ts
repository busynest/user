import { TemplateResult } from 'lit';
import { LazyLoader } from '../../../lazy-loader';
export declare class ResetEmail extends LazyLoader {
    private userEmail;
    constructor();
    protected firstUpdated(): void;
    private handleEmail;
    protected render(): TemplateResult;
    private restPassword;
}
declare global {
    interface HTMLElementTagNameMap {
        'reset-email': ResetEmail;
    }
}
//# sourceMappingURL=forgot.d.ts.map