
import { LitElement, html, CSSResultArray, css } from 'lit';
import { property } from 'lit/decorators.js';
import { inputStyles } from '../css/styles';

export class PhoneFormat extends LitElement {

  /** @attr value */
  @property({ type: String }) value: string = '';

  connectedCallback() {
    super.connectedCallback();
    this.addFormResetListener();
  }

  static get styles() : CSSResultArray { return [ inputStyles, 
    css`
    
    :host {
      display: grid;
    }
    
    `
  ]};

  render() {
    return html`
      <input
        id="phoneNumber"
        type="text"
        value="${this.formatPhoneNumber(this.value)}"
        @input="${this.onInput}"
        @keydown="${this.onKeyDown}"
        placeholder="(XXX) XXX-XXXX"
        inputmode="numeric"
        pattern="[0-9]*"
        data-label="Phone Number"
      />
    `;
  }

  private onKeyDown(event: KeyboardEvent) {
    // Allow backspace, delete, tab, escape, enter, and arrow keys
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(event.key) || (event.key >= '0' && event.key <= '9') || (event.key >= 'Numpad0' && event.key <= 'Numpad9')) {
      // Allow normal operation
    } else {
      // Prevent the default action (e.g., character input)
      event.preventDefault();
    }
  }

  private onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const unformattedValue = this.unformatPhoneNumber(inputElement.value);
    // Check the length of the unformatted phone number
    if (unformattedValue.length <= 10) {
      this.value = unformattedValue;
    } else {
      // If the length exceeds 10, reset the input value to the previously stored value
      inputElement.value = this.formatPhoneNumber(this.value);
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      formatted = `(${cleaned.slice(0, 3)}`;
    }
    if (cleaned.length >= 3) {
      formatted += `) ${cleaned.slice(3, 6)}`;
    }
    if (cleaned.length > 6) {
      formatted += `-${cleaned.slice(6, 10)}`;
    }

    return formatted;
  }

  private unformatPhoneNumber(formattedPhoneNumber: string): string {
    return formattedPhoneNumber.replace(/\D/g, '');
  }

  private addFormResetListener() {
    const form = this.closest('form');
    if (form) {
      form.addEventListener('reset', () => this.resetInput());
    }
  }

  private resetInput() {
    this.value = '';
  }

}



customElements.define('phone-format', PhoneFormat);

// Declare the global tag name
declare global {
  interface HTMLElementTagNameMap {
      'phone-format': PhoneFormat;
  }
}







/*
private formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }

  private unformatPhoneNumber(formattedPhoneNumber: string): string {
    return formattedPhoneNumber.replace(/\D/g, '');
  }
}
*/