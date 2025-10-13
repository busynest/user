import { LitElement, CSSResultArray } from 'lit';
import { AppState } from '../../../store';
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
            userId: string;
            customer: string;
            profileChoice: string;
            name: string;
            photoURL: string;
            phone: string;
            email: string;
        };
        drawer: {
            drawer: boolean;
        };
        backend: {
            verified: boolean;
            anon: boolean;
            userId: string;
            name: string;
            email: string;
            photoURL: string;
            phone: string;
            msgToken: string;
        };
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
