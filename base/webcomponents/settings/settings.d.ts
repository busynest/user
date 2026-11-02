import { CSSResultArray, LitElement, PropertyValues } from 'lit';
import { AppState } from '../../store.js';
import './input/uploader.js';
import './input/name.js';
import './input/email.js';
import './input/password.js';
import './input/delete.js';
import './input/verify.js';
declare const UserSettings_base: (new (...args: any[]) => {
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
export declare class UserSettings extends UserSettings_base {
    empty: string;
    private profileTopic;
    private name;
    private email;
    private login;
    private clipHeight;
    private sheetShift;
    private rollMotion;
    private leaving;
    private leaveClipHeight;
    private leaveSheetShift;
    private leaveMotion;
    private booted;
    private heldHeight;
    private leaveFrom;
    private columnWidth;
    private columnObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private onSubmit;
    private onTabKey;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    private openTab;
    private tabOn;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    private watchColumn;
    private clipFor;
    private frontClip;
    private backClip;
    private sheetOf;
    private reduced;
    private sheetPx;
    private rest;
    private layerStyle;
    private shiftStyle;
    private clipStyle;
    private sheetStyle;
    private leaveClipStyle;
    private leaveSheetStyle;
    private rollLayer;
    private onFrontEnd;
    private onBackEnd;
    private layerOf;
    private panel;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-settings': UserSettings;
    }
}
export {};
//# sourceMappingURL=settings.d.ts.map