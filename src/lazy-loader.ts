
import { LitElement } from 'lit';
import { property }   from 'lit/decorators.js';

export class LazyLoader extends LitElement {

  /** @attr active */
  @property({type: Boolean}) public active : boolean = false;
  /* @attr active */
  // @property({type: Boolean}) public menu : boolean = false;
  shouldUpdate() { /* this.active ? this.classList.add("active") : this.classList.remove("active") ; */
    return this.active;
  } // Only render this page, if it is actually visible.
  
  // static get properties() { return { active: { type: Boolean } } }
 
}

declare global {
  interface HTMLElementTagNameMap {
    'lazy-loader': LazyLoader;
  }
}