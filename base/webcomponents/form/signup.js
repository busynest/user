var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase/authentication';
import { logAccount } from '../../firebase/interface';
import { pwaAuthError, pwaSignup } from '../../events/names';
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
let FormSignup = class FormSignup extends LitElement {
    constructor() {
        super();
        this.source = '';
        this.email = '';
        this.password = '';
        this.newAccount = async (email, password) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(userCredential.user);
                await logAccount();
                const person = toPwaUser(userCredential.user);
                if (person)
                    emitWindow(pwaSignup, { user: person });
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
        display: grid;
        grid-template-columns: 1fr auto;
      }

      form { display: grid; }

    `
        ];
    }
    ;
    render() {
        return html `
  
      <!-- Sign Up State-->
      <form
        @submit=            ${this._handleSubmit}
        autocomplete=       "on"
        novalidate>
        
        <ul>

          <li>

            <label>Email

              <input
                id=           "${this.source}-signup-email"
                part=         "email"
                type=         "email"
                autocomplete= "email"
                @change=      "${this.handleEmail}">

            </label>

          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>

            <label>Password
              
              <input
                id=           "${this.source}-signup-pass"
                part=         "password"
                type=         "password"
                autocomplete= "new-password"
                @change=      "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              type=         "submit"
              part=         "submit"
              class=        "newUser action-button">Sign up</button>

          </li>

          <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->

          <!-- Change State 
          <li>

            <p class=       "divider">Or</p>



          </li> -->

        </ul>

        <button
          type="button"
          part="switch"
          class="new"
          @click="${this.change}">login with existing email</button>

      </form>

    `;
    }
    change() {
        store.dispatch(universalToggle(this.source));
    }
    readFields() {
        const email = this.renderRoot.querySelector('input[type="email"]');
        const password = this.renderRoot.querySelector('input[type="password"]');
        this.email = email?.value ?? '';
        this.password = password?.value ?? '';
    }
    _handleSubmit(event) {
        event.preventDefault();
        this.signUp();
    }
    handleEmail(event) {
        const input = event.target;
        this.email = input.value;
    }
    handlePassword(event) {
        const input = event.target;
        this.password = input.value;
    }
    signUp() {
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
        this.newAccount(this.email, this.password);
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormSignup.prototype, "source", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], FormSignup.prototype, "password", void 0);
FormSignup = __decorate([
    customElement('form-signup'),
    __metadata("design:paramtypes", [])
], FormSignup);
export { FormSignup };
//# sourceMappingURL=signup.js.map