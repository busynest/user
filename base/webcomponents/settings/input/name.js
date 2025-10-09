var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { connect } from "pwa-helpers";
import { store } from "../../../store";
import { updateProfile } from "firebase/auth";
import { accName } from "../../../redux/backend";
import { auth } from "../../../firebase/authentication";
import { labelStyle } from "../../../css/form/label";
import { inputStyle } from "../../../css/form/input";
import { buttonStyle } from "../../../css/form/button";
export class InputName extends connect(store)(LitElement) {
    constructor() {
        super();
        this.value = '';
        this.login = false;
        this.default = (e) => {
            e.preventDefault();
        };
        this.alertProfile = async () => {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: this.value })
                    .then(() => { store.dispatch(accName(this.value)); })
                    .then(() => { alert('updated name:' + this.value); });
            }
            else {
                alert('Please Login');
            }
        };
    }
    stateChanged(state) {
        this.login = state.frontend.login;
        this.value = state.backend.name;
    }
    static get styles() {
        return [
            labelStyle,
            inputStyle,
            buttonStyle,
            css `

      :host, form { display: grid; }

    `
        ];
    }
    render() {
        return html `

      <form
        @submit="${this.default}">
  
        <label
          for="pwa-name"><span>Name:</span></label>

          <input
            id            = "pwa-name"
            name          = "username"
            type          = "text"
            data-label    = "Contact Name"
            @input        = "${this.handleInput}"
            .value        = "${this.value}" />
    
        <!-- Save to Database -->
        <button
          class="action-button save"
          @click="${this.alertProfile}"
          ?disabled="${this.login === false}">Update</button>

      </form>

    `;
    }
    handleInput(event) {
        const input = event.target;
        this.value = input.value;
    }
}
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], InputName.prototype, "value", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], InputName.prototype, "login", void 0);
customElements.define('input-name', InputName);
//# sourceMappingURL=name.js.map