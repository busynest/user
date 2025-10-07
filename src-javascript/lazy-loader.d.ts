import { LitElement } from 'lit';
export declare class LazyLoader extends LitElement {
    active: boolean;
    shouldUpdate(): boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'lazy-loader': LazyLoader;
    }
}
//# sourceMappingURL=lazy-loader.d.ts.map