import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store.js";
declare const InputName_base: (new (...args: any[]) => {
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
export declare class InputName extends InputName_base {
    private login;
    private draft;
    private busy;
    private status;
    private tone;
    private dirty;
    constructor();
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private default;
    private handleInput;
    private show;
    private alertProfile;
}
declare global {
    interface HTMLElementTagNameMap {
        'input-name': InputName;
    }
}
export {};
//# sourceMappingURL=name.d.ts.map