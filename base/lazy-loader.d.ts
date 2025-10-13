import { LitElement } from 'lit';
export declare class LazyLoader extends LitElement {
    active: boolean;
    constructor();
    shouldUpdate(): boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'lazy-loader': LazyLoader;
    }
}
