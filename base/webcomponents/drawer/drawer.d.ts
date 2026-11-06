import { CSSResultArray, LitElement, PropertyValues } from 'lit';
import { AppState } from '../../store.js';
import '../settings/input/verify.js';
import '../form/login.js';
import '../form/signup.js';
declare const UserDrawer_base: (new (...args: any[]) => {
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
export declare class UserDrawer extends UserDrawer_base {
    /** @attr url */
    url: string;
    /** @attr drawer */
    drawer: boolean;
    /** @attr subscribe */
    subscribe: boolean;
    /** @attr hide-google */
    hideGoogle: boolean;
    private name;
    private email;
    private verified;
    private notice;
    private user;
    /** What the sheet paints. Stays on the account menu until a logout close reaches 0. */
    private sheetSigned;
    private holdSheet;
    private openSheetPx;
    private liveName;
    private liveEmail;
    private liveVerified;
    private signup;
    /** True while the panel is open or still rolling shut. Drops on transitionend. */
    private sliding;
    /** Arms the form-swap transition. False on the first paint. */
    private motion;
    /** Clip height. 0px is shut. auto is the resting open size. */
    private clipHeight;
    /** Sheet translate. -100% parks the sheet above the clip. */
    private sheetShift;
    /** True only while this drawer's clip and sheet are easing. */
    private rollMotion;
    private booted;
    private wasOpen;
    private sawOpen;
    private returnFocus;
    private stopNotice;
    private heldHeight;
    private columnWidth;
    private columnObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(state: AppState): void;
    private paintAccount;
    private releaseSheet;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    private clip;
    private sheet;
    private toggleButton;
    private reduced;
    private restShut;
    private restOpen;
    private clipStyle;
    private sheetStyle;
    private unroll;
    private rollUp;
    private sheetPx;
    private rollBetween;
    private onClipEnd;
    private onKey;
    private onLightClick;
    protected firstUpdated(): void;
    private placeAnchor;
    private watchColumn;
    private onColumnResize;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
    private destination;
    private settingsControl;
    private onSettings;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-drawer': UserDrawer;
    }
}
export {};
//# sourceMappingURL=drawer.d.ts.map