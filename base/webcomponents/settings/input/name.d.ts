import { CSSResultArray, LitElement } from "lit";
import { AppState } from "../../../store";
declare const InputName_base: (new (...args: any[]) => {
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
