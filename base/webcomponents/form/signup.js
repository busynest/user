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
import { buttonStyle } from './css/button';
import { labelStyle } from './css/label';
import { inputStyle } from './css/input';
import { listStyle } from './css/list';
import { toggleStyle } from './css/toggle';
import store from '../../store';
import { universalToggle } from '../../redux/frontend';
let FormSignup = class FormSignup extends LitElement {
    constructor() {
        super();
        this.source = '';
        this.email = '';
        this.password = '';
        this.newAccount = async (email, password) => {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                    console.log("Verification email sent.");
                });
            }).then(() => { logAccount(); });
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

      :host {
        background-color:           white;
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
        autocomplete=       "on">
        
        <ul>

          <li>

            <label>Email

              <input
                id=         "${this.source}-signup-email"
                type=       "email"
                @change=    "${this.handleEmail}">

            </label>

          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>

            <label>Password
              
              <input
                id=         "${this.source}-signup-pass"
                type=       "password"
                @change=    "${this.handlePassword}">

            </label>

          </li>

          <li>

            <button
              class=        "newUser action-button"
              @click=       "${this.signUp}">Sign up</button>

          </li>

          <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->

          <!-- Change State 
          <li>

            <p class=       "divider">Or</p>



          </li> -->

        </ul>

        <button
          class="new"
          @click="${this.change}">login with existing email</button>

      </form>

    `;
    }
    change() {
        store.dispatch(universalToggle(this.source));
    }
    _handleSubmit(event) {
        event.preventDefault();
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
        if (this.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.password.length < 4) {
            alert('Please enter a password.');
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