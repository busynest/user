import { CSSResultArray, LitElement, PropertyValues } from 'lit';
import { AppState } from '../../store.js';
import '../form/login.js';
import '../form/signup.js';
declare const UserLogin_base: (new (...args: any[]) => {
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
export declare class UserLogin extends UserLogin_base {
    /** @attr subscribe */
    subscribe: boolean;
    /** @attr hide-google */
    hideGoogle: boolean;
    private _name;
    private _email;
    private _verified;
    private _notice;
    private _log;
    private _sign;
    /** Arms the form-swap transition. False on the first paint. */
    private motion;
    /** Clip size. auto is the resting card. A px value is mid-roll. */
    private clipHeight;
    /** Sheet translate. none keeps the card's bottom on the clip. */
    private sheetShift;
    /** True only while this card's clip and sheet are easing. */
    private rollMotion;
    private booted;
    private stopNotice;
    private heldHeight;
    private columnWidth;
    private columnObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    private watchColumn;
    private clip;
    private sheet;
    private reduced;
    private rest;
    private clipStyle;
    private sheetStyle;
    private rollBetween;
    private onClipEnd;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-login': UserLogin;
    }
}
export {};
//# sourceMappingURL=page.d.ts.map