import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const InputName_base: (new (...args: any[]) => {
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
export declare class InputName extends InputName_base {
    value: string;
    private login;
    constructor();
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    render(): import("lit-html").TemplateResult<1>;
    private default;
    private handleInput;
    private alertProfile;
}
declare global {
    interface HTMLElementTagNameMap {
        'input-name': InputName;
    }
}
export {};
