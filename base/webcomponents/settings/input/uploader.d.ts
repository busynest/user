import { LitElement, CSSResultArray } from 'lit';
import { AppState } from '../../../store.js';
declare const ContactPhoto_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: {
            settings: string;
            login: boolean;
            drawer: boolean;
            registerOne: boolean;
            registerTwo: boolean;
        };
        backend: {
            verified: boolean;
            name: string;
            email: string;
            photoURL: string;
        };
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class ContactPhoto extends ContactPhoto_base {
    photo: string | void | any;
    emptyArtwork: string;
    private login;
    private person;
    private mail;
    private progress;
    private error;
    private status;
    private tone;
    private busy;
    constructor();
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    private letters;
    protected render(): import("lit-html").TemplateResult<1>;
    private fail;
    private saveImage;
}
declare global {
    interface HTMLElementTagNameMap {
        'contact-photo': ContactPhoto;
    }
}
export {};
//# sourceMappingURL=uploader.d.ts.map