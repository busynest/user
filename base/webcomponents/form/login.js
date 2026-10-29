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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/authentication';
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
                await signInWithEmailAndPassword(auth, email, password);
            }
            catch (error) {
                alert(error instanceof Error ? error.message : 'Sign in failed');
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
                id=       "${this.source}-login-email"
                type=     "email"
                @change=  "${this.handleEmail}">

            </label>

          </li>

          <li>

            <label>Password

              <input
                id=       "${this.source}-login-pass"
                type=     "password"
                @change=  "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=       "submit"
              class=      "login action-button">Sign in</button>

          </li>
    
          <!-- Change State 
          <li>

            <p class=     "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
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
            alert('Please enter an email address.');
            return;
        }
        if (this.password.length < 6) {
            alert('Password must be at least 6 characters.');
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