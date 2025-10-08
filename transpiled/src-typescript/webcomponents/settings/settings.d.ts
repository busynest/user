import { CSSResultArray, LitElement } from 'lit';
import { AppState } from '../../store';
import './input/uploader';
import './input/name';
import './input/email';
import './input/password';
import './input/delete';
declare const UserSettings_base: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        frontend: import("../../redux/object").frontendAuth;
        drawer: {
            drawer: boolean;
        };
        backend: import("../../redux/object").backendAuth;
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
export declare class UserSettings extends UserSettings_base {
    emptyArtwork: string;
    private profileTopic;
    private name;
    constructor();
    protected firstUpdated(): void;
    stateChanged(state: AppState): void;
    static get styles(): CSSResultArray;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-settings': UserSettings;
    }
}
export {};
//# sourceMappingURL=settings.d.ts.map