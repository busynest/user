var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, } from 'lit';
import { customElement, state } from "lit/decorators.js";
import { LazyLoader } from '../../lazy-loader';
import { auth } from '../../firebase/authentication';
import { sendPasswordResetEmail } from 'firebase/auth';
let EmailReset = class EmailReset extends LazyLoader {
    constructor() {
        super();
        this.userEmail = '';
        this.restPassword = async () => {
            await sendPasswordResetEmail(auth, this.userEmail)
                .catch((error) => { console.log(error); });
        };
    }
    firstUpdated() {
        this.shadowRoot.querySelector(".reset").addEventListener("click", () => {
            this.restPassword();
        });
    }
    handleEmail(event) {
        const input = event.target;
        this.userEmail = input.value;
    }
    render() {
        return html `

        <form class="resetPass">

          <input
            class       ="email"
            type        ="text"
            placeholder ="email"
            @change     ="${this.handleEmail}">

          <button
            type        ="submit"
            class       ="reset">Forgot Password</button>

        </form>

        <input
          class ="phoneVerify"
          type  ="text" />

    `;
    }
};
__decorate([
    state(),
    __metadata("design:type", String)
], EmailReset.prototype, "userEmail", void 0);
EmailReset = __decorate([
    customElement('email-reset'),
    __metadata("design:paramtypes", [])
], EmailReset);
export { EmailReset };
//# sourceMappingURL=forgot.js.map