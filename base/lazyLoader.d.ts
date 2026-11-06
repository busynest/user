import { LitElement } from 'lit';
export declare class LazyLoader extends LitElement {
    /** @attr active */
    active: boolean;
    constructor();
    shouldUpdate(): boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'lazy-loader': LazyLoader;
    }
}
//# sourceMappingURL=lazyLoader.d.ts.map