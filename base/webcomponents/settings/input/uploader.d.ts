import { LitElement, CSSResultArray } from 'lit';
import { AppState } from '../../../store';
declare const ContactPhoto_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: import("../../../redux/object").frontendAuth;
        drawer: {
            drawer: boolean;
        };
        backend: import("../../../redux/object").backendAuth;
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class ContactPhoto extends ContactPhoto_base {
    photo: string | void | any;
    emptyArtwork: string;
    private user;
    private login;
    private progress;
    private error;
    private status;
    constructor();
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
    private saveImage;
    private dispatchPhoto;
}
declare global {
    interface HTMLElementTagNameMap {
        'contact-photo': ContactPhoto;
    }
}
export {};
