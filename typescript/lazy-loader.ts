
import { LitElement } from 'lit';
import { property }   from 'lit/decorators.js';

export class LazyLoader extends LitElement {

  /** @attr active */
  @property({type: Boolean}) public active : boolean = false;

  constructor() {
    super();
  }
 
  // Only render this page, if it is actually visible.
  shouldUpdate() { return this.active;  }
 
}

declare global {
  interface HTMLElementTagNameMap {
    'lazy-loader': LazyLoader;
  }
}

