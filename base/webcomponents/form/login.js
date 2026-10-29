var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, LitElement, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EmailAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase/authentication';
import { pwaAuthError, pwaLogin } from '../../events/names';
import { emitWindow, toAuthError, toPwaUser } from '../../events/emit';
import { userMessage } from '../../firebase/message';
import { buttonStyle } from './css/button';
import { labelStyle } from './css/label';
import { inputStyle } from './css/input';
import { listStyle } from './css/list';
import { toggleStyle } from './css/toggle';
import { tapStyle } from '../css/tap';
import store from '../../store';
import { universalToggle } from '../../redux/frontend';
let FormLogin = class FormLogin extends LitElement {
    constructor() {
        super();
        this.source = '';
        this.email = '';
        this.password = '';
        this.signIn = async (email, password) => {
            try {
                const authCredential = EmailAuthProvider.credential(email, password);
                const signed = await signInWithCredential(auth, authCredential);
                const person = toPwaUser(signed.user);
                if (person)
                    emitWindow(pwaLogin, { user: person });
            }
            catch (error) {
                emitWindow(pwaAuthError, toAuthError(error));
                alert(userMessage(error));
            }
        };
    }
    static get styles() {
        return [
            listStyle,
            labelStyle,
            inputStyle,
            buttonStyle,
            toggleStyle,
            tapStyle,
            css `
    
      :host {
        background-color:           var(--section_background_color, #fffdf8);
      }

      .double {
        display:                    grid;
        grid-template-columns:      1fr auto;
      }

      form { display: grid; }

    `
        ];
    }
    ;
    render() {
        return html `

      <!-- Log-in State -->
      <form
        @submit=          ${this._handleSubmit}
        autocomplete=     "on">

        <ul>

          <li>

            <label>Email

              <input
                id=             "${this.source}-login-email"
                part=           "email"
                type=           "email"
                autocomplete=   "email"
                @change=        "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label>Password

              <input
                id=             "${this.source}-login-pass"
                part=           "password"
                type=           "password"
                autocomplete=   "current-password"
                @change=        "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=       "submit"
              part=       "submit"
              class=      "login action-button">Sign in</button>

          </li>
    
          <!-- Change State 
          <li>

            <p class=     "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
          part="switch"
          class="new"
          @click="${this.change}">create a new account</button>

      </form>

    `;
    }
    change() {
        store.dispatch(universalToggle(this.source));
    }
    handleEmail(event) {
        const input = event.target;
        this.email = input.value;
    }
    handlePassword(event) {
        const input = event.target;
        this.password = input.value;
    }
    readFields() {
        const email = this.renderRoot.querySelector('input[type="email"]');
        const password = this.renderRoot.querySelector('input[type="password"]');
        this.email = email?.value ?? '';
        this.password = password?.value ?? '';
    }
    _handleSubmit(event) {
        event.preventDefault();
        this.login();
    }
    login() {
        this.readFields();
        if (this.email.length < 4) {
            const detail = { code: 'pwa/missing-email', message: 'Enter an email address.' };
            emitWindow(pwaAuthError, detail);
            alert(userMessage(detail));
            return;
        }
        if (this.password.length < 4) {
            const detail = { code: 'pwa/missing-password', message: 'Enter a password.' };
            emitWindow(pwaAuthError, detail);
            alert(userMessage(detail));
            return;
        }
        this.signIn(this.email, this.password);
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormLogin.prototype, "source", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormLogin.prototype, "password", void 0);
FormLogin = __decorate([
    customElement('form-login'),
    __metadata("design:paramtypes", [])
], FormLogin);
export { FormLogin };
//# sourceMappingURL=login.js.map