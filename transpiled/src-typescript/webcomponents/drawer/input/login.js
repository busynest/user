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
import { customElement, state } from 'lit/decorators.js';
import { EmailAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../../firebase/authentication';
import { buttonStyle } from '../../../css/form/button';
import { labelStyle } from '../../../css/form/label';
import { inputStyle } from '../../../css/form/input';
import { listStyle } from '../../../css/form/list';
import { toggleStyle } from '../css/toggle';
import store from '../../../store';
import { signUpAction } from '../../../redux/frontend';
let UserLogIn = class UserLogIn extends LitElement {
    constructor() {
        super();
        this.email = '';
        this.password = '';
        this.signIn = async (email, password) => {
            const authCredential = EmailAuthProvider.credential(email, password);
            await signInWithCredential(auth, authCredential).catch((error) => { console.log(error); });
        };
    }
    static get styles() {
        return [
            listStyle,
            labelStyle,
            inputStyle,
            buttonStyle,
            toggleStyle,
            css `
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

    `
        ];
    }
    ;
    render() {
        return html `

      <!-- Log-in State -->
      <form
        @submit=${this._handleSubmit}
        autocomplete="on">

        <ul>

          <li>
            <label for="pwa-login-email">Email</label>
            <input
              id="pwa-login-email"
              type="email"
              @change="${this.handleEmail}">
          </li>

          <li>
            <label for="pwa-login-pass">Password</label>
            <input
              id="pwa-login-pass"
              type="password"
              @change="${this.handlePassword}">
          </li>

          <li>
            <button
              class="login action-button"
              @click="${this.login}">Sign in</button>

          </li>
    
          <!-- Change State -->
          <li>
            <p class="divider">Or</p>
            <button
              class="new"
              @click="${this.change}">create a new account</button>
          </li>

        </ul>

      </form>

    `;
    }
    change() {
        store.dispatch(signUpAction());
    }
    handleEmail(event) {
        const input = event.target;
        this.email = input.value;
    }
    handlePassword(event) {
        const input = event.target;
        this.password = input.value;
    }
    _handleSubmit(event) {
        event.preventDefault();
    }
    login() {
        if (this.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        this.signIn(this.email, this.password);
    }
};
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogIn.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserLogIn.prototype, "password", void 0);
UserLogIn = __decorate([
    customElement('user-log-in'),
    __metadata("design:paramtypes", [])
], UserLogIn);
export { UserLogIn };
