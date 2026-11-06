import { LitElement, CSSResultArray } from 'lit';
import { AppState } from '../../../store.js';
declare const ContactPhoto_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        session: {
            login: boolean;
            drawer: boolean;
            registerOne: boolean;
            registerTwo: boolean;
            settings: string;
            verified: boolean;
            name: string;
            email: string;
            photoURL: string;
        };
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class ContactPhoto extends ContactPhoto_base {
    /** @attr photo */
    photo: string | void | any;
    /** @attr emptyArtwork */
    emptyArtwork: string;
    private signed;
    private person;
    private mail;
    private progress;
    private error;
    private status;
    private tone;
    private busy;
    private stopAuth;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    private letters;
    private resetPicker;
    protected render(): import("lit-html").TemplateResult<1>;
    private fail;
    private saveImage;
    private clearPhoto;
}
declare global {
    interface HTMLElementTagNameMap {
        'contact-photo': ContactPhoto;
    }
}
export {};
//# sourceMappingURL=uploader.d.ts.map