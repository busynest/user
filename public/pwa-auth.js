!function(e){
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new s(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",y=f.reactiveElementPolyfillSupport,w=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},v=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&h(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const s=i?.call(this);r?.call(this,t),this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...u(e),...d(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:_).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i;const s=r.fromAttribute(t,e.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){const i=this.constructor,r=this[e];if(n??=i.getPropertyOptions(e),!((n.hasChanged??v)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[w("elementProperties")]=new Map,I[w("finalized")]=new Map,y?.({ReactiveElement:I}),(f.reactiveElementVersions??=[]).push("2.1.1");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const E=globalThis,T=E.trustedTypes,S=T?T.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,P=`<${C}>`,R=document,O=()=>R.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,x="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,M=/>/g,$=RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,F=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),H=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),W=new WeakMap,q=R.createTreeWalker(R,129);function K(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const n=e.length-1,i=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=L;for(let t=0;t<n;t++){const n=e[t];let a,c,h=-1,l=0;for(;l<n.length&&(o.lastIndex=l,c=o.exec(n),null!==c);)l=o.lastIndex,o===L?"!--"===c[1]?o=U:void 0!==c[1]?o=M:void 0!==c[2]?(B.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=$):void 0!==c[3]&&(o=$):o===$?">"===c[0]?(o=r??L,h=-1):void 0===c[1]?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?$:'"'===c[3]?F:j):o===F||o===j?o=$:o===U||o===M?o=L:(o=$,r=void 0);const u=o===$&&e[t+1].startsWith("/>")?" ":"";s+=o===L?n+P:h>=0?(i.push(a),n.slice(0,h)+k+n.slice(h)+A+u):n+A+(-2===h?t:u)}return[K(e,s+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};let J=class e{constructor({strings:t,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,c=this.parts,[h,l]=G(t,n);if(this.el=e.createElement(h,i),q.currentNode=this.el.content,2===n||3===n){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=q.nextNode())&&c.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(k)){const t=l[o++],n=r.getAttribute(e).split(A),i=/([.?@])?(.*)/.exec(t);c.push({type:1,index:s,name:i[2],strings:n,ctor:"."===i[1]?ee:"?"===i[1]?te:"@"===i[1]?ne:Q}),r.removeAttribute(e)}else e.startsWith(A)&&(c.push({type:6,index:s}),r.removeAttribute(e));if(B.test(r.tagName)){const e=r.textContent.split(A),t=e.length-1;if(t>0){r.textContent=T?T.emptyScript:"";for(let n=0;n<t;n++)r.append(e[n],O()),q.nextNode(),c.push({type:2,index:++s});r.append(e[t],O())}}}else if(8===r.nodeType)if(r.data===C)c.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(A,e+1));)c.push({type:7,index:s}),e+=A.length-1}s++}}static createElement(e,t){const n=R.createElement("template");return n.innerHTML=e,n}};function X(e,t,n=e,i){if(t===H)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const s=N(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,i)),t}let Y=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??R).importNode(t,!0);q.currentNode=i;let r=q.nextNode(),s=0,o=0,a=n[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new Z(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new ie(r,this,e)),this._$AV.push(t),a=n[++o]}s!==a?.index&&(r=q.nextNode(),s++)}return q.currentNode=R,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}};class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),N(e)?e===z||null==e||""===e?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==z&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=J.createElement(K(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Y(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new J(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new Z(this.O(O()),this.O(O()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=z}_$AI(e,t=this,n,i){const r=this.strings;let s=!1;if(void 0===r)e=X(this,e,t,0),s=!N(e)||e!==this._$AH&&e!==H,s&&(this._$AH=e);else{const i=e;let o,a;for(e=r[0],o=0;o<r.length-1;o++)a=X(this,i[n+o],t,o),a===H&&(a=this._$AH[o]),s||=!N(a)||a!==this._$AH[o],a===z?e=z:e!==z&&(e+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!i&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==z)}}let ne=class extends Q{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??z)===H)return;const n=this._$AH,i=e===z&&n!==z||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==z&&(n===z||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class ie{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=E.litHtmlPolyfillSupport;re?.(J,Z),(E.litHtmlVersions??=[]).push("3.3.1");const se=globalThis;
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class oe extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new Z(t.insertBefore(O(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ae=se.litElementPolyfillSupport;ae?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.1");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const ce=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v},le=(e=he,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e)}}throw Error("Unsupported decorator location: "+i)};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function ue(e){return(t,n)=>"object"==typeof n?le(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function de(e){return ue({...e,state:!0,attribute:!1})}
/**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */const pe=e=>t=>class extends t{connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._storeUnsubscribe=e.subscribe(()=>this.stateChanged(e.getState())),this.stateChanged(e.getState())}disconnectedCallback(){this._storeUnsubscribe(),super.disconnectedCallback&&super.disconnectedCallback()}stateChanged(e){}};function fe(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ge=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),me=()=>Math.random().toString(36).substring(7).split("").join("."),ye={INIT:`@@redux/INIT${me()}`,REPLACE:`@@redux/REPLACE${me()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${me()}`};function we(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function _e(e,t,n){if("function"!=typeof e)throw new Error(fe(2));if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(fe(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(fe(1));return n(_e)(e,t)}let i=e,r=t,s=new Map,o=s,a=0,c=!1;function h(){o===s&&(o=new Map,s.forEach((e,t)=>{o.set(t,e)}))}function l(){if(c)throw new Error(fe(3));return r}function u(e){if("function"!=typeof e)throw new Error(fe(4));if(c)throw new Error(fe(5));let t=!0;h();const n=a++;return o.set(n,e),function(){if(t){if(c)throw new Error(fe(6));t=!1,h(),o.delete(n),s=null}}}function d(e){if(!we(e))throw new Error(fe(7));if(void 0===e.type)throw new Error(fe(8));if("string"!=typeof e.type)throw new Error(fe(17));if(c)throw new Error(fe(9));try{c=!0,r=i(r,e)}finally{c=!1}return(s=o).forEach(e=>{e()}),e}d({type:ye.INIT});return{dispatch:d,subscribe:u,getState:l,replaceReducer:function(e){if("function"!=typeof e)throw new Error(fe(10));i=e,d({type:ye.REPLACE})},[ge]:function(){const e=u;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(fe(11));function n(){const e=t;e.next&&e.next(l())}n();return{unsubscribe:e(n)}},[ge](){return this}}}}}function ve(e){const t=Object.keys(e),n={};for(let i=0;i<t.length;i++){const r=t[i];"function"==typeof e[r]&&(n[r]=e[r])}const i=Object.keys(n);let r;try{!function(e){Object.keys(e).forEach(t=>{const n=e[t];if(void 0===n(void 0,{type:ye.INIT}))throw new Error(fe(12));if(void 0===n(void 0,{type:ye.PROBE_UNKNOWN_ACTION()}))throw new Error(fe(13))})}(n)}catch(e){r=e}return function(e={},t){if(r)throw r;let s=!1;const o={};for(let r=0;r<i.length;r++){const a=i[r],c=n[a],h=e[a],l=c(h,t);if(void 0===l)throw t&&t.type,new Error(fe(14));o[a]=l,s=s||l!==h}return s=s||i.length!==Object.keys(e).length,s?o:e}}function be(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}var Ie=Symbol.for("immer-nothing"),Ee=Symbol.for("immer-draftable"),Te=Symbol.for("immer-state");function Se(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var ke=Object.getPrototypeOf;function Ae(e){return!!e&&!!e[Te]}function Ce(e){return!!e&&(Re(e)||Array.isArray(e)||!!e[Ee]||!!e.constructor?.[Ee]||Le(e)||Ue(e))}var Pe=Object.prototype.constructor.toString();function Re(e){if(!e||"object"!=typeof e)return!1;const t=ke(e);if(null===t)return!0;const n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Pe}function Oe(e,t){0===Ne(e)?Reflect.ownKeys(e).forEach(n=>{t(n,e[n],e)}):e.forEach((n,i)=>t(i,n,e))}function Ne(e){const t=e[Te];return t?t.type_:Array.isArray(e)?1:Le(e)?2:Ue(e)?3:0}function De(e,t){return 2===Ne(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function xe(e,t,n){const i=Ne(e);2===i?e.set(t,n):3===i?e.add(n):e[t]=n}function Le(e){return e instanceof Map}function Ue(e){return e instanceof Set}function Me(e){return e.copy_||e.base_}function $e(e,t){if(Le(e))return new Map(e);if(Ue(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const n=Re(e);if(!0===t||"class_only"===t&&!n){const t=Object.getOwnPropertyDescriptors(e);delete t[Te];let n=Reflect.ownKeys(t);for(let i=0;i<n.length;i++){const r=n[i],s=t[r];!1===s.writable&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(t[r]={configurable:!0,writable:!0,enumerable:s.enumerable,value:e[r]})}return Object.create(ke(e),t)}{const t=ke(e);if(null!==t&&n)return{...e};const i=Object.create(t);return Object.assign(i,e)}}function je(e,t=!1){return Be(e)||Ae(e)||!Ce(e)||(Ne(e)>1&&(e.set=e.add=e.clear=e.delete=Fe),Object.freeze(e),t&&Object.entries(e).forEach(([e,t])=>je(t,!0))),e}function Fe(){Se(2)}function Be(e){return Object.isFrozen(e)}var Ve,He={};function ze(e){const t=He[e];return t||Se(0),t}function We(){return Ve}function qe(e,t){t&&(ze("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Ke(e){Ge(e),e.drafts_.forEach(Xe),e.drafts_=null}function Ge(e){e===Ve&&(Ve=e.parent_)}function Je(e){return Ve={drafts_:[],parent_:Ve,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Xe(e){const t=e[Te];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function Ye(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];return void 0!==e&&e!==n?(n[Te].modified_&&(Ke(t),Se(4)),Ce(e)&&(e=Ze(t,e),t.parent_||et(t,e)),t.patches_&&ze("Patches").generateReplacementPatches_(n[Te].base_,e,t.patches_,t.inversePatches_)):e=Ze(t,n,[]),Ke(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Ie?e:void 0}function Ze(e,t,n){if(Be(t))return t;const i=t[Te];if(!i)return Oe(t,(r,s)=>Qe(e,i,t,r,s,n)),t;if(i.scope_!==e)return t;if(!i.modified_)return et(e,i.base_,!0),i.base_;if(!i.finalized_){i.finalized_=!0,i.scope_.unfinalizedDrafts_--;const t=i.copy_;let r=t,s=!1;3===i.type_&&(r=new Set(t),t.clear(),s=!0),Oe(r,(r,o)=>Qe(e,i,t,r,o,n,s)),et(e,t,!1),n&&e.patches_&&ze("Patches").generatePatches_(i,n,e.patches_,e.inversePatches_)}return i.copy_}function Qe(e,t,n,i,r,s,o){if(Ae(r)){const o=Ze(e,r,s&&t&&3!==t.type_&&!De(t.assigned_,i)?s.concat(i):void 0);if(xe(n,i,o),!Ae(o))return;e.canAutoFreeze_=!1}else o&&n.add(r);if(Ce(r)&&!Be(r)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;Ze(e,r),t&&t.scope_.parent_||"symbol"==typeof i||!Object.prototype.propertyIsEnumerable.call(n,i)||et(e,r)}}function et(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&je(t,n)}var tt={get(e,t){if(t===Te)return e;const n=Me(e);if(!De(n,t))return function(e,t,n){const i=rt(t,n);return i?"value"in i?i.value:i.get?.call(e.draft_):void 0}(e,n,t);const i=n[t];return e.finalized_||!Ce(i)?i:i===it(e.base_,t)?(ot(e),e.copy_[t]=at(i,e)):i},has:(e,t)=>t in Me(e),ownKeys:e=>Reflect.ownKeys(Me(e)),set(e,t,n){const i=rt(Me(e),t);if(i?.set)return i.set.call(e.draft_,n),!0;if(!e.modified_){const i=it(Me(e),t),r=i?.[Te];if(r&&r.base_===n)return e.copy_[t]=n,e.assigned_[t]=!1,!0;if(function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,i)&&(void 0!==n||De(e.base_,t)))return!0;ot(e),st(e)}return e.copy_[t]===n&&(void 0!==n||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==it(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,ot(e),st(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const n=Me(e),i=Reflect.getOwnPropertyDescriptor(n,t);return i?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:i.enumerable,value:n[t]}:i},defineProperty(){Se(11)},getPrototypeOf:e=>ke(e.base_),setPrototypeOf(){Se(12)}},nt={};function it(e,t){const n=e[Te];return(n?Me(n):e)[t]}function rt(e,t){if(!(t in e))return;let n=ke(e);for(;n;){const e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=ke(n)}}function st(e){e.modified_||(e.modified_=!0,e.parent_&&st(e.parent_))}function ot(e){e.copy_||(e.copy_=$e(e.base_,e.scope_.immer_.useStrictShallowCopy_))}Oe(tt,(e,t)=>{nt[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),nt.deleteProperty=function(e,t){return nt.set.call(this,e,t,void 0)},nt.set=function(e,t,n){return tt.set.call(this,e[0],t,n,e[0])};function at(e,t){const n=Le(e)?ze("MapSet").proxyMap_(e,t):Ue(e)?ze("MapSet").proxySet_(e,t):function(e,t){const n=Array.isArray(e),i={type_:n?1:0,scope_:t?t.scope_:We(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let r=i,s=tt;n&&(r=[i],s=nt);const{revoke:o,proxy:a}=Proxy.revocable(r,s);return i.draft_=a,i.revoke_=o,a}(e,t);return(t?t.scope_:We()).drafts_.push(n),n}function ct(e){if(!Ce(e)||Be(e))return e;const t=e[Te];let n;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=$e(e,t.scope_.immer_.useStrictShallowCopy_)}else n=$e(e,!0);return Oe(n,(e,t)=>{xe(n,e,ct(t))}),t&&(t.finalized_=!1),n}var ht=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,n)=>{if("function"==typeof e&&"function"!=typeof t){const n=t;t=e;const i=this;return function(e=n,...r){return i.produce(e,e=>t.call(this,e,...r))}}let i;if("function"!=typeof t&&Se(6),void 0!==n&&"function"!=typeof n&&Se(7),Ce(e)){const r=Je(this),s=at(e,void 0);let o=!0;try{i=t(s),o=!1}finally{o?Ke(r):Ge(r)}return qe(r,n),Ye(i,r)}if(!e||"object"!=typeof e){if(i=t(e),void 0===i&&(i=e),i===Ie&&(i=void 0),this.autoFreeze_&&je(i,!0),n){const t=[],r=[];ze("Patches").generateReplacementPatches_(e,i,t,r),n(t,r)}return i}Se(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,i;const r=this.produce(e,t,(e,t)=>{n=e,i=t});return[r,n,i]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){Ce(e)||Se(8),Ae(e)&&(e=function(e){Ae(e)||Se(10);return ct(e)}(e));const t=Je(this),n=at(e,void 0);return n[Te].isManual_=!0,Ge(t),n}finishDraft(e,t){const n=e&&e[Te];n&&n.isManual_||Se(9);const{scope_:i}=n;return qe(i,t),Ye(void 0,i)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const i=t[n];if(0===i.path.length&&"replace"===i.op){e=i.value;break}}n>-1&&(t=t.slice(n+1));const i=ze("Patches").applyPatches_;return Ae(e)?i(e,t):this.produce(e,e=>i(e,t))}},lt=ht.produce;function ut(e){return({dispatch:t,getState:n})=>i=>r=>"function"==typeof r?r(t,n,e):i(r)}ht.produceWithPatches.bind(ht),ht.setAutoFreeze.bind(ht),ht.setUseStrictShallowCopy.bind(ht),ht.applyPatches.bind(ht),ht.createDraft.bind(ht),ht.finishDraft.bind(ht);var dt=ut(),pt=ut,ft="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?be:be.apply(null,arguments)};function gt(e,t){function n(...n){if(t){let i=t(...n);if(!i)throw new Error(Ct(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>function(e){return we(e)&&"type"in e&&"string"==typeof e.type}(t)&&t.type===e,n}var mt=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function yt(e){return Ce(e)?lt(e,()=>{}):e}function wt(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}var _t=e=>t=>{setTimeout(t,e)},vt=e=>function(t){const{autoBatch:n=!0}=t??{};let i=new mt(e);return n&&i.push(((e={type:"raf"})=>t=>(...n)=>{const i=t(...n);let r=!0,s=!1,o=!1;const a=new Set,c="tick"===e.type?queueMicrotask:"raf"===e.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:_t(10):"callback"===e.type?e.queueNotification:_t(e.timeout),h=()=>{o=!1,s&&(s=!1,a.forEach(e=>e()))};return Object.assign({},i,{subscribe(e){const t=i.subscribe(()=>r&&e());return a.add(e),()=>{t(),a.delete(e)}},dispatch(e){try{return r=!e?.meta?.RTK_autoBatch,s=!r,s&&(o||(o=!0,c(h))),i.dispatch(e)}finally{r=!0}}})})("object"==typeof n?n:void 0)),i};function bt(e){const t={},n=[];let i;const r={addCase(e,n){const i="string"==typeof e?e:e.type;if(!i)throw new Error(Ct(28));if(i in t)throw new Error(Ct(29));return t[i]=n,r},addMatcher:(e,t)=>(n.push({matcher:e,reducer:t}),r),addDefaultCase:e=>(i=e,r)};return e(r),[t,n,i]}var It=Symbol.for("rtk-slice-createasyncthunk");function Et(e,t){return`${e}/${t}`}function Tt({creators:e}={}){const t=e?.asyncThunk?.[It];return function(e){const{name:n,reducerPath:i=n}=e;if(!n)throw new Error(Ct(11));const r=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},s=Object.keys(r),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(e,t){const n="string"==typeof e?e:e.type;if(!n)throw new Error(Ct(12));if(n in o.sliceCaseReducersByType)throw new Error(Ct(13));return o.sliceCaseReducersByType[n]=t,a},addMatcher:(e,t)=>(o.sliceMatchers.push({matcher:e,reducer:t}),a),exposeAction:(e,t)=>(o.actionCreators[e]=t,a),exposeCaseReducer:(e,t)=>(o.sliceCaseReducersByName[e]=t,a)};function c(){const[t={},n=[],i]="function"==typeof e.extraReducers?bt(e.extraReducers):[e.extraReducers],r={...t,...o.sliceCaseReducersByType};return function(e,t){let n,[i,r,s]=bt(t);if(function(e){return"function"==typeof e}(e))n=()=>yt(e());else{const t=yt(e);n=()=>t}function o(e=n(),t){let o=[i[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return 0===o.filter(e=>!!e).length&&(o=[s]),o.reduce((e,n)=>{if(n){if(Ae(e)){const i=n(e,t);return void 0===i?e:i}if(Ce(e))return lt(e,e=>n(e,t));{const i=n(e,t);if(void 0===i){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return i}}return e},e)}return o.getInitialState=n,o}(e.initialState,e=>{for(let t in r)e.addCase(t,r[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);i&&e.addDefaultCase(i)})}s.forEach(i=>{const s=r[i],o={reducerName:i,type:Et(n,i),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(s)?function({type:e,reducerName:t,createNotation:n},i,r){let s,o;if("reducer"in i){if(n&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(i))throw new Error(Ct(17));s=i.reducer,o=i.prepare}else s=i;r.addCase(e,s).exposeCaseReducer(t,s).exposeAction(t,o?gt(e,o):gt(e))}(o,s,a):function({type:e,reducerName:t},n,i,r){if(!r)throw new Error(Ct(18));const{payloadCreator:s,fulfilled:o,pending:a,rejected:c,settled:h,options:l}=n,u=r(e,s,l);i.exposeAction(t,u),o&&i.addCase(u.fulfilled,o);a&&i.addCase(u.pending,a);c&&i.addCase(u.rejected,c);h&&i.addMatcher(u.settled,h);i.exposeCaseReducer(t,{fulfilled:o||At,pending:a||At,rejected:c||At,settled:h||At})}(o,s,a,t)});const h=e=>e,l=new Map,u=new WeakMap;let d;function p(e,t){return d||(d=c()),d(e,t)}function f(){return d||(d=c()),d.getInitialState()}function g(t,n=!1){function i(e){let r=e[t];return void 0===r&&n&&(r=wt(u,i,f)),r}function r(t=h){const i=wt(l,n,()=>new WeakMap);return wt(i,t,()=>{const i={};for(const[r,s]of Object.entries(e.selectors??{}))i[r]=St(s,t,()=>wt(u,t,f),n);return i})}return{reducerPath:t,getSelectors:r,get selectors(){return r(i)},selectSlice:i}}const m={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:f,...g(i),injectInto(e,{reducerPath:t,...n}={}){const r=t??i;return e.inject({reducerPath:r,reducer:p},n),{...m,...g(r,!0)}}};return m}}function St(e,t,n,i){function r(r,...s){let o=t(r);return void 0===o&&i&&(o=n()),e(o,...s)}return r.unwrapped=e,r}var kt=Tt();function At(){}function Ct(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}const Pt=kt({name:"user",initialState:{settings:"profile",login:!1,drawer:!1,register:!0,userId:"user",customer:"John Doe",profileChoice:"unChosen",name:"Modern Business",photoURL:"images/empty.jpg",phone:"(...) ... - ....",email:""},reducers:{navigateAuth:(e,t)=>{switch(t.payload){case"profile":case"verification":case"password":case"delete":break;default:t.payload="profile"}e.settings=t.payload},userAuth:(e,t)=>{e.login=t.payload},toggleSign:e=>{!0===e.drawer?e.drawer=!1:e.drawer=!0},closeSign:e=>{e.drawer=!1},signUpAction:e=>{!1===e.register?e.register=!0:e.register=!1},signUpClose:(e,t)=>{e.register=t.payload},iconAuth:(e,t)=>{e.photoURL=t.payload},nameAuth:(e,t)=>{e.name=t.payload}}}),{navigateAuth:Rt,iconAuth:Ot,nameAuth:Nt,userAuth:Dt,toggleSign:xt,closeSign:Lt,signUpAction:Ut,signUpClose:Mt}=Pt.actions,$t=kt({name:"drawers",initialState:{drawer:!1},reducers:{setDrawer:e=>{!1===e.drawer?e.drawer=!0:e.drawer=!1},closeDrawer:e=>{e.drawer=!1}}}),{setDrawer:jt,closeDrawer:Ft}=$t.actions,Bt=kt({name:"backend",initialState:{verified:!1,anon:!1,userId:"",name:"John Doe",email:"",photoURL:"",phone:"",msgToken:""},reducers:{accVerified:(e,t)=>{e.verified=t.payload},accAnon:(e,t)=>{e.anon=t.payload},accID:(e,t)=>{e.userId=t.payload},accName:(e,t)=>{e.name=t.payload},accPhone:(e,t)=>{e.phone=t.payload},accEmail:(e,t)=>{e.email=t.payload},accImage:(e,t)=>{e.photoURL=t.payload},messageId:(e,t)=>{e.msgToken=t.payload}}}),{accVerified:Vt,accID:Ht,accName:zt,accPhone:Wt,accEmail:qt,accImage:Kt,accAnon:Gt,messageId:Jt}=Bt.actions,Xt=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:i=!0,actionCreatorCheck:r=!0}=e??{};let s=new mt;return t&&(function(e){return"boolean"==typeof e}(t)?s.push(dt):s.push(pt(t.extraArgument))),s},{reducer:n,middleware:i,devTools:r=!0,preloadedState:s,enhancers:o}=e||{};let a,c;if("function"==typeof n)a=n;else{if(!we(n))throw new Error(Ct(1));a=ve(n)}c="function"==typeof i?i(t):t();let h=be;r&&(h=ft({trace:!1,..."object"==typeof r&&r}));const l=function(...e){return t=>(n,i)=>{const r=t(n,i);let s=()=>{throw new Error(fe(15))};const o={getState:r.getState,dispatch:(e,...t)=>s(e,...t)},a=e.map(e=>e(o));return s=be(...a)(r.dispatch),{...r,dispatch:s}}}(...c),u=vt(l);return _e(a,s,h(..."function"==typeof o?o(u):u()))}({reducer:{frontend:Pt.reducer,drawer:$t.reducer,backend:Bt.reducer},devTools:!0}),Yt=o`ul{list-style-type:none;padding:0;margin:0}`;V`<svg viewBox="0 0 24 24" height="34px" width="34px"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></svg>`,V`<svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>`;const Zt=V`<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`,Qt=o`.spec[on]{display:grid}.spec{display:none}`,en=o`.visibility[on]{visibility:visible;transform:translate3d(0,0,0)}.visibility{position:fixed;right:0;visibility:hidden;will-change:transform;transform:translate3d(0,-150%,0);transition-property:visibility,transform;transition-duration:1.4s;display:block}.userDrawer{z-index:1;max-width:600px;margin:auto;background-color:var(--pwa_drawer_background_color);color:var(--pwa_drawer_text_color);padding:8px 18px;box-sizing:border-box;border:3px #303030 solid;border-radius:20px}.exit{display:grid;grid-template-columns:80px 1fr 80px}.exit>h3{font-weight:800;font-size:.9em;margin:0 auto;opacity:.8;line-height:36px}.exit>.remove{background-color:transparent;border:0;color:red;font-weight:800;font-size:.7em;text-transform:uppercase;opacity:.6}.exit>.refresh{background-color:transparent;border:0;fill:#00f;height:36px;width:36px;padding:0}.sign{height:36px;width:36px;margin:auto;background-color:transparent;border:0;fill:red;opacity:.8}label{font-size:.9em}.setLog>p{margin:12px;box-sizing:border-box}.divide{border:2px solid #606060;margin:6px 0 0 0;border-radius:50%}input{box-sizing:border-box;width:100%;padding:12px 20px;margin:8px 0 0 0;display:inline-block;border:1px solid #ccc;border-radius:4px}a{text-transform:uppercase;font-size:.6em;color:#696969;font-weight:800;text-decoration:none}p{text-align:center}.inpat{display:grid;grid-template-columns:1fr;grid-template-rows:1fr 1fr}@media (max-width:460px){#bat,label{font-size:.8em}}`,tn=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=63&r|128):55296==(64512&r)&&i+1<e.length&&56320==(64512&e.charCodeAt(i+1))?(r=65536+((1023&r)<<10)+(1023&e.charCodeAt(++i)),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=63&r|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=63&r|128)}return t},nn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let t=0;t<e.length;t+=3){const r=e[t],s=t+1<e.length,o=s?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,h=r>>2,l=(3&r)<<4|o>>4;let u=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(u=64)),i.push(n[h],n[l],n[u],n[d])}return i.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(tn(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,i=0;for(;n<e.length;){const r=e[n++];if(r<128)t[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=e[n++];t[i++]=String.fromCharCode((31&r)<<6|63&s)}else if(r>239&&r<365){const s=((7&r)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[i++]=String.fromCharCode(55296+(s>>10)),t[i++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],o=e[n++];t[i++]=String.fromCharCode((15&r)<<12|(63&s)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let t=0;t<e.length;){const r=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==r||null==s||null==o||null==a)throw new rn;const c=r<<2|s>>4;if(i.push(c),64!==o){const e=s<<4&240|o>>2;if(i.push(e),64!==a){const e=o<<6&192|a;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class rn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sn=function(e){return function(e){const t=tn(e);return nn.encodeByteArray(t,!0)}(e).replace(/\./g,"")},on=function(e){try{return nn.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const an=()=>
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,cn=()=>{try{return an()||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&on(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},hn=e=>cn()?.emulatorHosts?.[e],ln=e=>{const t=hn(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),i]:[t.substring(0,n),i]},un=()=>cn()?.config,dn=e=>cn()?.[`_${e}`];
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class pn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function fn(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gn(e){return(await fetch(e,{credentials:"include"})).ok}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function mn(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",i=e.iat||0,r=e.sub||e.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...e};return[sn(JSON.stringify({alg:"none",type:"JWT"})),sn(JSON.stringify(s)),""].join(".")}const yn={};let wn=!1;function _n(e,t){if("undefined"==typeof window||"undefined"==typeof document||!fn(window.location.host)||yn[e]===t||yn[e]||wn)return;function n(e){return`__firebase__banner__${e}`}yn[e]=t;const i="__firebase__banner",r=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(yn))yn[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function s(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{wn=!0,function(){const e=document.getElementById(i);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(i),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),h=n("preprendIcon"),l=document.getElementById(h)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=s();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(l,h),t.append(l,o,c,n),document.body.appendChild(t)}r?(o.innerText="Preview backend disconnected.",l.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(l.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function vn(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function bn(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function In(){try{return"object"==typeof indexedDB}catch(e){return!1}}function En(){return new Promise((e,t)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{t(r.error?.message||"")}}catch(e){t(e)}})}function Tn(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Sn extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Sn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kn.prototype.create)}}class kn{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],s=r?function(e,t){return e.replace(An,(e,n)=>{const i=t[n];return null!=i?String(i):`<${n}?>`})}(r,n):"Error",o=`${this.serviceName}: ${s} (${i}).`;return new Sn(i,o,n)}}const An=/\{\$([^}]+)}/g;function Cn(e,t){if(e===t)return!0;const n=Object.keys(e),i=Object.keys(t);for(const r of n){if(!i.includes(r))return!1;const n=e[r],s=t[r];if(Pn(n)&&Pn(s)){if(!Cn(n,s))return!1}else if(n!==s)return!1}for(const e of i)if(!n.includes(e))return!1;return!0}function Pn(e){return null!==e&&"object"==typeof e}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Rn(e){const t=[];for(const[n,i]of Object.entries(e))Array.isArray(i)?i.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}function On(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,i]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(i)}}),t}function Nn(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class Dn{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");i=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===i.next&&(i.next=xn),void 0===i.error&&(i.error=xn),void 0===i.complete&&(i.complete=xn);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(e){}}),this.observers.push(i),r}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xn(){}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ln(e,t=1e3,n=2){const i=t*Math.pow(n,e),r=Math.round(.5*i*(Math.random()-.5)*2);return Math.min(144e5,i+r)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Un(e){return e&&e._delegate?e._delegate:e}class Mn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const $n="[DEFAULT]";
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class jn{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new pn;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(i)}return i}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(n)??new Set;i.add(e),this.onInitCallbacks.set(n,i);const r=this.instances.get(n);return r&&e(r,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(i=e,i===$n?void 0:i),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var i;return n||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class Fn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jn(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var Bn;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(Bn||(Bn={}));const Vn={debug:Bn.DEBUG,verbose:Bn.VERBOSE,info:Bn.INFO,warn:Bn.WARN,error:Bn.ERROR,silent:Bn.SILENT},Hn=Bn.INFO,zn={[Bn.DEBUG]:"log",[Bn.VERBOSE]:"log",[Bn.INFO]:"info",[Bn.WARN]:"warn",[Bn.ERROR]:"error"},Wn=(e,t,...n)=>{if(t<e.logLevel)return;const i=(new Date).toISOString(),r=zn[t];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[r](`[${i}]  ${e.name}:`,...n)};class qn{constructor(e){this.name=e,this._logLevel=Hn,this._logHandler=Wn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Bn))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?Vn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Bn.DEBUG,...e),this._logHandler(this,Bn.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Bn.VERBOSE,...e),this._logHandler(this,Bn.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Bn.INFO,...e),this._logHandler(this,Bn.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Bn.WARN,...e),this._logHandler(this,Bn.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Bn.ERROR,...e),this._logHandler(this,Bn.ERROR,...e)}}let Kn,Gn;const Jn=new WeakMap,Xn=new WeakMap,Yn=new WeakMap,Zn=new WeakMap,Qn=new WeakMap;let ei={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return Xn.get(e);if("objectStoreNames"===t)return e.objectStoreNames||Yn.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ii(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function ti(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(Gn||(Gn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(ri(this),t),ii(Jn.get(this))}:function(...t){return ii(e.apply(ri(this),t))}:function(t,...n){const i=e.call(ri(this),t,...n);return Yn.set(i,t.sort?t.sort():[t]),ii(i)}}function ni(e){return"function"==typeof e?ti(e):(e instanceof IDBTransaction&&function(e){if(Xn.has(e))return;const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",s),e.removeEventListener("abort",s)},r=()=>{t(),i()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",r),e.addEventListener("error",s),e.addEventListener("abort",s)});Xn.set(e,t)}(e),t=e,(Kn||(Kn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,ei):e);var t}function ii(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const i=()=>{e.removeEventListener("success",r),e.removeEventListener("error",s)},r=()=>{t(ii(e.result)),i()},s=()=>{n(e.error),i()};e.addEventListener("success",r),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&Jn.set(t,e)}).catch(()=>{}),Qn.set(t,e),t}(e);if(Zn.has(e))return Zn.get(e);const t=ni(e);return t!==e&&(Zn.set(e,t),Qn.set(t,e)),t}const ri=e=>Qn.get(e);function si(e,t,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(e,t),a=ii(o);return i&&o.addEventListener("upgradeneeded",e=>{i(ii(o.result),e.oldVersion,e.newVersion,ii(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),r&&e.addEventListener("versionchange",e=>r(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}function oi(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",e=>t(e.oldVersion,e)),ii(n).then(()=>{})}const ai=["get","getKey","getAll","getAllKeys","count"],ci=["put","add","delete","clear"],hi=new Map;function li(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(hi.get(t))return hi.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,r=ci.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!r&&!ai.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,r?"readwrite":"readonly");let o=s.store;return i&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),r&&s.done]))[0]};return hi.set(t,s),s}ei=(e=>({...e,get:(t,n,i)=>li(t,n)||e.get(t,n,i),has:(t,n)=>!!li(t,n)||e.has(t,n)}))(ei);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class ui{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const di="@firebase/app",pi="0.14.1",fi=new qn("@firebase/app"),gi="@firebase/app-compat",mi="@firebase/analytics-compat",yi="@firebase/analytics",wi="@firebase/app-check-compat",_i="@firebase/app-check",vi="@firebase/auth",bi="@firebase/auth-compat",Ii="@firebase/database",Ei="@firebase/data-connect",Ti="@firebase/database-compat",Si="@firebase/functions",ki="@firebase/functions-compat",Ai="@firebase/installations",Ci="@firebase/installations-compat",Pi="@firebase/messaging",Ri="@firebase/messaging-compat",Oi="@firebase/performance",Ni="@firebase/performance-compat",Di="@firebase/remote-config",xi="@firebase/remote-config-compat",Li="@firebase/storage",Ui="@firebase/storage-compat",Mi="@firebase/firestore",$i="@firebase/ai",ji="@firebase/firestore-compat",Fi="firebase",Bi="[DEFAULT]",Vi={[di]:"fire-core",[gi]:"fire-core-compat",[yi]:"fire-analytics",[mi]:"fire-analytics-compat",[_i]:"fire-app-check",[wi]:"fire-app-check-compat",[vi]:"fire-auth",[bi]:"fire-auth-compat",[Ii]:"fire-rtdb",[Ei]:"fire-data-connect",[Ti]:"fire-rtdb-compat",[Si]:"fire-fn",[ki]:"fire-fn-compat",[Ai]:"fire-iid",[Ci]:"fire-iid-compat",[Pi]:"fire-fcm",[Ri]:"fire-fcm-compat",[Oi]:"fire-perf",[Ni]:"fire-perf-compat",[Di]:"fire-rc",[xi]:"fire-rc-compat",[Li]:"fire-gcs",[Ui]:"fire-gcs-compat",[Mi]:"fire-fst",[ji]:"fire-fst-compat",[$i]:"fire-vertex","fire-js":"fire-js",[Fi]:"fire-js-all"},Hi=new Map,zi=new Map,Wi=new Map;function qi(e,t){try{e.container.addComponent(t)}catch(n){fi.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Ki(e){const t=e.name;if(Wi.has(t))return fi.debug(`There were multiple attempts to register component ${t}.`),!1;Wi.set(t,e);for(const t of Hi.values())qi(t,e);for(const t of zi.values())qi(t,e);return!0}function Gi(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ji(e){return null!=e&&void 0!==e.settings}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Xi=new kn("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Yi{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xi.create("app-deleted",{appName:this._name})}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Zi="12.1.0";function Qi(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const i={name:Bi,automaticDataCollectionEnabled:!0,...t},r=i.name;if("string"!=typeof r||!r)throw Xi.create("bad-app-name",{appName:String(r)});if(n||(n=un()),!n)throw Xi.create("no-options");const s=Hi.get(r);if(s){if(Cn(n,s.options)&&Cn(i,s.config))return s;throw Xi.create("duplicate-app",{appName:r})}const o=new Fn(r);for(const e of Wi.values())o.addComponent(e);const a=new Yi(n,i,o);return Hi.set(r,a),a}function er(e=Bi){const t=Hi.get(e);if(!t&&e===Bi&&un())return Qi();if(!t)throw Xi.create("no-app",{appName:e});return t}function tr(e,t,n){let i=Vi[e]??e;n&&(i+=`-${n}`);const r=i.match(/\s|\//),s=t.match(/\s|\//);if(r||s){const e=[`Unable to register library "${i}" with version "${t}":`];return r&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void fi.warn(e.join(" "))}Ki(new Mn(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const nr="firebase-heartbeat-store";let ir=null;function rr(){return ir||(ir=si("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(nr)}catch(e){console.warn(e)}}}).catch(e=>{throw Xi.create("idb-open",{originalErrorMessage:e.message})})),ir}async function sr(e,t){try{const n=(await rr()).transaction(nr,"readwrite"),i=n.objectStore(nr);await i.put(t,or(e)),await n.done}catch(e){if(e instanceof Sn)fi.warn(e.message);else{const t=Xi.create("idb-set",{originalErrorMessage:e?.message});fi.warn(t.message)}}}function or(e){return`${e.name}!${e.options.appId}`}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ar{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hr(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=cr();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let i=1;i<e.length;i++)e[i].date<n&&(n=e[i].date,t=i);return t}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){fi.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=cr(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let i=e.slice();for(const r of e){const e=n.find(e=>e.agent===r.agent);if(e){if(e.dates.push(r.date),lr(n)>t){e.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),lr(n)>t){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}(this._heartbeatsCache.heartbeats),i=sn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return fi.warn(e),""}}}function cr(){return(new Date).toISOString().substring(0,10)}class hr{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!In()&&En().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await rr()).transaction(nr),n=await t.objectStore(nr).get(or(e));return await t.done,n}catch(e){if(e instanceof Sn)fi.warn(e.message);else{const t=Xi.create("idb-get",{originalErrorMessage:e?.message});fi.warn(t.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return sr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return sr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function lr(e){return sn(JSON.stringify({version:2,heartbeats:e})).length}var ur;ur="",Ki(new Mn("platform-logger",e=>new ui(e),"PRIVATE")),Ki(new Mn("heartbeat",e=>new ar(e),"PRIVATE")),tr(di,pi,ur),tr(di,pi,"esm2020"),tr("fire-js","");function dr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
tr("firebase","12.1.0","app");const pr=dr,fr=new kn("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),gr=new qn("@firebase/auth");function mr(e,...t){gr.logLevel<=Bn.ERROR&&gr.error(`Auth (${Zi}): ${e}`,...t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function yr(e,...t){throw br(e,...t)}function wr(e,...t){return br(e,...t)}function _r(e,t,n){const i={...pr(),[t]:n};return new kn("auth","Firebase",i).create(t,{appName:e.name})}function vr(e){return _r(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function br(e,...t){if("string"!=typeof e){const n=t[0],i=[...t.slice(1)];return i[0]&&(i[0].appName=e.name),e._errorFactory.create(n,...i)}return fr.create(e,...t)}function Ir(e,t,...n){if(!e)throw br(t,...n)}function Er(e){const t="INTERNAL ASSERTION FAILED: "+e;throw mr(t),new Error(t)}function Tr(e,t){e||Er(t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Sr(){return"undefined"!=typeof self&&self.location?.href||""}function kr(){return"undefined"!=typeof self&&self.location?.protocol||null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ar(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==kr()&&"https:"!==kr()&&!bn()&&!("connection"in navigator)||navigator.onLine}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Cr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tr(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vn())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return Ar()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Pr(e,t){Tr(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Rr{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void Er("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void Er("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void Er("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Or={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Nr=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dr=new Cr(3e4,6e4);
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function xr(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Lr(e,t,n,i,r={}){return Ur(e,r,async()=>{let r={},s={};i&&("GET"===t?s=i:r={body:JSON.stringify(i)});const o=Rn({key:e.config.apiKey,...s}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...r};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&fn(e.emulatorConfig.host)&&(c.credentials="include"),Rr.fetch()(await $r(e,e.config.apiHost,n,o),c)})}async function Ur(e,t,n){e._canInitEmulator=!1;const i={...Or,...t};try{const t=new Fr(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await r.json();if("needConfirmation"in s)throw Br(e,"account-exists-with-different-credential",s);if(r.ok&&!("errorMessage"in s))return s;{const t=r.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Br(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw Br(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw Br(e,"user-disabled",s);const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw _r(e,a,o);yr(e,a)}}catch(t){if(t instanceof Sn)throw t;yr(e,"network-request-failed",{message:String(t)})}}async function Mr(e,t,n,i,r={}){const s=await Lr(e,t,n,i,r);return"mfaPendingCredential"in s&&yr(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function $r(e,t,n,i){const r=`${t}${n}?${i}`,s=e,o=s.config.emulator?Pr(e.config,r):`${e.config.apiScheme}://${r}`;if(Nr.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){return s._getPersistence()._getFinalTarget(o).toString()}return o}function jr(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Fr{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(wr(this.auth,"network-request-failed")),Dr.get())})}}function Br(e,t,n){const i={appName:e.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=wr(e,t,i);return r.customData._tokenResponse=n,r}function Vr(e){return void 0!==e&&void 0!==e.enterprise}class Hr{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return jr(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function zr(e,t){return Lr(e,"POST","/v1/accounts:lookup",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Wr(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}function qr(e){return 1e3*Number(e)}function Kr(e){const[t,n,i]=e.split(".");if(void 0===t||void 0===n||void 0===i)return mr("JWT malformed, contained fewer than 3 sections"),null;try{const e=on(n);return e?JSON.parse(e):(mr("Failed to decode base64 JWT payload"),null)}catch(e){return mr("Caught error parsing JWT payload as JSON",e?.toString()),null}}function Gr(e){const t=Kr(e);return Ir(t,"internal-error"),Ir(void 0!==t.exp,"internal-error"),Ir(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Jr(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof Sn&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class Xr{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Yr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wr(this.lastLoginAt),this.creationTime=Wr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Zr(e){const t=e.auth,n=await e.getIdToken(),i=await Jr(e,zr(t,{idToken:n}));Ir(i?.users.length,t,"internal-error");const r=i.users[0];e._notifyReloadListener(r);const s=r.providerUserInfo?.length?Qr(r.providerUserInfo):[],o=function(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}(e.providerData,s),a=e.isAnonymous,c=!(e.email&&r.passwordHash||o?.length),h=!!a&&c,l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Yr(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(e,l)}function Qr(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class es{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Ir(e.idToken,"internal-error"),Ir(void 0!==e.idToken,"internal-error"),Ir(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Gr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Ir(0!==e.length,"internal-error");const t=Gr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(Ir(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:r}=await async function(e,t){const n=await Ur(e,{},async()=>{const n=Rn({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:r}=e.config,s=await $r(e,i,"/v1/token",`key=${r}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&fn(e.emulatorConfig.host)&&(a.credentials="include"),Rr.fetch()(s,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,i,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:r}=t,s=new es;return n&&(Ir("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),i&&(Ir("string"==typeof i,"internal-error",{appName:e}),s.accessToken=i),r&&(Ir("number"==typeof r,"internal-error",{appName:e}),s.expirationTime=r),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new es,this.toJSON())}_performRefresh(){return Er("not implemented")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ts(e,t){Ir("string"==typeof e||void 0===e,"internal-error",{appName:t})}class ns{constructor({uid:e,auth:t,stsTokenManager:n,...i}){this.providerId="firebase",this.proactiveRefresh=new Xr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Yr(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Jr(this,this.stsTokenManager.getToken(this.auth,e));return Ir(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=Un(e),i=await n.getIdToken(t),r=Kr(i);Ir(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s="object"==typeof r.firebase?r.firebase:void 0,o=s?.sign_in_provider;return{claims:r,token:i,authTime:Wr(qr(r.auth_time)),issuedAtTime:Wr(qr(r.iat)),expirationTime:Wr(qr(r.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=Un(e);await Zr(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(Ir(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ns({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Ir(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Zr(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ji(this.auth.app))return Promise.reject(vr(this.auth));const e=await this.getIdToken();return await Jr(this,
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function(e,t){return Lr(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,i=t.email??void 0,r=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:l,emailVerified:u,isAnonymous:d,providerData:p,stsTokenManager:f}=t;Ir(l&&f,e,"internal-error");const g=es.fromJSON(this.name,f);Ir("string"==typeof l,e,"internal-error"),ts(n,e.name),ts(i,e.name),Ir("boolean"==typeof u,e,"internal-error"),Ir("boolean"==typeof d,e,"internal-error"),ts(r,e.name),ts(s,e.name),ts(o,e.name),ts(a,e.name),ts(c,e.name),ts(h,e.name);const m=new ns({uid:l,auth:e,email:i,emailVerified:u,displayName:n,isAnonymous:d,photoURL:s,phoneNumber:r,tenantId:o,stsTokenManager:g,createdAt:c,lastLoginAt:h});return p&&Array.isArray(p)&&(m.providerData=p.map(e=>({...e}))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,t,n=!1){const i=new es;i.updateFromServerResponse(t);const r=new ns({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Zr(r),r}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];Ir(void 0!==i.localId,"internal-error");const r=void 0!==i.providerUserInfo?Qr(i.providerUserInfo):[],s=!(i.email&&i.passwordHash||r?.length),o=new es;o.updateFromIdToken(n);const a=new ns({uid:i.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new Yr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash||r?.length)};return Object.assign(a,c),a}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const is=new Map;function rs(e){Tr(e instanceof Function,"Expected a class definition");let t=is.get(e);return t?(Tr(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,is.set(e,t),t)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ss{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ss.type="NONE";const os=ss;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function as(e,t,n){return`firebase:${e}:${t}:${n}`}class cs{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:r}=this.auth;this.fullUserKey=as(this.userKey,i.apiKey,r),this.fullPersistenceKey=as("persistence",i.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await zr(this.auth,{idToken:e}).catch(()=>{});return t?ns._fromGetAccountInfoResponse(this.auth,t,e):null}return ns._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new cs(rs(os),e,n);const i=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let r=i[0]||rs(os);const s=as(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(s);if(t){let i;if("string"==typeof t){const n=await zr(e,{idToken:t}).catch(()=>{});if(!n)break;i=await ns._fromGetAccountInfoResponse(e,n,t)}else i=ns._fromJSON(e,t);n!==r&&(o=i),r=n;break}}catch{}const a=i.filter(e=>e._shouldAllowMigration);return r._shouldAllowMigration&&a.length?(r=a[0],o&&await r._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==r)try{await e._remove(s)}catch{}})),new cs(r,e,n)):new cs(r,e,n)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function hs(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ps(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(ls(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(gs(t))return"Blackberry";if(ms(t))return"Webos";if(us(t))return"Safari";if((t.includes("chrome/")||ds(t))&&!t.includes("edge/"))return"Chrome";if(fs(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function ls(e=vn()){return/firefox\//i.test(e)}function us(e=vn()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ds(e=vn()){return/crios\//i.test(e)}function ps(e=vn()){return/iemobile/i.test(e)}function fs(e=vn()){return/android/i.test(e)}function gs(e=vn()){return/blackberry/i.test(e)}function ms(e=vn()){return/webos/i.test(e)}function ys(e=vn()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function ws(){return function(){const e=vn();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function _s(e=vn()){return ys(e)||fs(e)||ms(e)||gs(e)||/windows phone/i.test(e)||ps(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function vs(e,t=[]){let n;switch(e){case"Browser":n=hs(vn());break;case"Worker":n=`${hs(vn())}-${e}`;break;default:n=e}const i=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Zi}/${i}`}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class bs{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,i)=>{try{n(e(t))}catch(e){i(e)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:e?.message})}}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Is{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Es{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ss(this),this.idTokenSubscription=new Ss(this),this.beforeStateQueue=new bs(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=fr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rs(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await cs.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await zr(this,{idToken:e}),n=await ns._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ji(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==r||!s?.user||(n=s.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return Ir(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Zr(e)}catch(e){if("auth/network-request-failed"!==e?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ji(this.app))return Promise.reject(vr(this));const t=e?Un(e):null;return t&&Ir(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Ir(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ji(this.app)?Promise.reject(vr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ji(this.app)?Promise.reject(vr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rs(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return Lr(e,"GET","/v2/passwordPolicy",xr(e,t))}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(this),t=new Is(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new kn("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return Lr(e,"POST","/v2/accounts:revokeToken",xr(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&rs(e)||this._popupRedirectResolver;Ir(t,this,"argument-error"),this.redirectPersistenceManager=await cs.create(this,[rs(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const r="function"==typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(Ir(o,this,"internal-error"),o.then(()=>{s||r(this.currentUser)}),"function"==typeof t){const r=e.addObserver(t,n,i);return()=>{s=!0,r()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Ir(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Ji(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e,...t){gr.logLevel<=Bn.WARN&&gr.warn(`Auth (${Zi}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Ts(e){return Un(e)}class Ss{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new Dn(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return Ir(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */let ks={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function As(e){return ks.loadJS(e)}class Cs{constructor(){this.enterprise=new Ps}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ps{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Rs="NO_RECAPTCHA";class Os{constructor(e){this.type="recaptcha-enterprise",this.auth=Ts(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return Lr(e,"GET","/v2/recaptchaConfig",xr(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(i=>{if(void 0!==i.recaptchaKey){const n=new Hr(i);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function i(t,n,i){const r=window.grecaptcha;Vr(r)?r.enterprise.ready(()=>{r.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(Rs)})}):i(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new Cs).execute("siteKey",{action:"verify"})}return new Promise((e,r)=>{n(this.auth).then(n=>{if(!t&&Vr(window.grecaptcha))i(n,e,r);else{if("undefined"==typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));let t=ks.recaptchaEnterpriseScript;0!==t.length&&(t+=n),As(t).then(()=>{i(n,e,r)}).catch(e=>{r(e)})}}).catch(e=>{r(e)})})}}async function Ns(e,t,n,i=!1,r=!1){const s=new Os(e);let o;if(r)o=Rs;else try{o=await s.verify(n)}catch(e){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ds(e,t,n,i,r){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Ns(e,t,n,"getOobCode"===n);return i(e,r)}return i(e,t).catch(async r=>{if("auth/missing-recaptcha-token"===r.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const r=await Ns(e,t,n,"getOobCode"===n);return i(e,r)}return Promise.reject(r)})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function xs(e,t,n){const i=Ts(e);Ir(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const r=Ls(t),{host:s,port:o}=function(e){const t=Ls(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const e=r[1];return{host:e,port:Us(i.substr(e.length+1))}}{const[e,t]=i.split(":");return{host:e,port:Us(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${r}//${s}${a}/`},h=Object.freeze({host:s,port:o,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!i._canInitEmulator)return Ir(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),void Ir(Cn(c,i.config.emulator)&&Cn(h,i.emulatorConfig),i,"emulator-config-failed");i.config.emulator=c,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,fn(s)?(gn(`${r}//${s}${a}`),_n("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */()}function Ls(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Us(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Ms{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Er("not implemented")}_getIdTokenResponse(e){return Er("not implemented")}_linkToIdToken(e,t){return Er("not implemented")}_getReauthenticationResolver(e){return Er("not implemented")}}async function $s(e,t){return Lr(e,"POST","/v1/accounts:signUp",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function js(e,t){return Mr(e,"POST","/v1/accounts:signInWithPassword",xr(e,t))}async function Fs(e,t){return async function(e,t){return Lr(e,"POST","/v1/accounts:sendOobCode",xr(e,t))}(e,t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Bs extends Ms{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Bs(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Bs(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Ds(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",js);case"emailLink":return async function(e,t){return Mr(e,"POST","/v1/accounts:signInWithEmailLink",xr(e,t))}(e,{email:this._email,oobCode:this._password});default:yr(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Ds(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",$s);case"emailLink":return async function(e,t){return Mr(e,"POST","/v1/accounts:signInWithEmailLink",xr(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:yr(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Vs(e,t){return Mr(e,"POST","/v1/accounts:signInWithIdp",xr(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Hs extends Ms{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Hs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):yr("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:i,...r}=t;if(!n||!i)return null;const s=new Hs(n,i);return s.idToken=r.idToken||void 0,s.accessToken=r.accessToken||void 0,s.secret=r.secret,s.nonce=r.nonce,s.pendingToken=r.pendingToken||null,s}_getIdTokenResponse(e){return Vs(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Vs(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vs(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Rn(t)}return e}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class zs{constructor(e){const t=On(Nn(e)),n=t.apiKey??null,i=t.oobCode??null,r=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);Ir(n&&i&&r,"argument-error"),this.apiKey=n,this.operation=r,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=On(Nn(e)).link,n=t?On(Nn(t)).deep_link_id:null,i=On(Nn(e)).deep_link_id;return(i?On(Nn(i)).link:null)||i||n||t||e}(e);try{return new zs(t)}catch{return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ws{constructor(){this.providerId=Ws.PROVIDER_ID}static credential(e,t){return Bs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=zs.parseLink(t);return Ir(n,"argument-error"),Bs._fromEmailAndCode(e,n.code,n.tenantId)}}Ws.PROVIDER_ID="password",Ws.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Ws.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class qs{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ks extends qs{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Gs extends Ks{constructor(){super("facebook.com")}static credential(e){return Hs._fromParams({providerId:Gs.PROVIDER_ID,signInMethod:Gs.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gs.credentialFromTaggedObject(e)}static credentialFromError(e){return Gs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Gs.credential(e.oauthAccessToken)}catch{return null}}}Gs.FACEBOOK_SIGN_IN_METHOD="facebook.com",Gs.PROVIDER_ID="facebook.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Js extends Ks{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Hs._fromParams({providerId:Js.PROVIDER_ID,signInMethod:Js.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Js.credentialFromTaggedObject(e)}static credentialFromError(e){return Js.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Js.credential(t,n)}catch{return null}}}Js.GOOGLE_SIGN_IN_METHOD="google.com",Js.PROVIDER_ID="google.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Xs extends Ks{constructor(){super("github.com")}static credential(e){return Hs._fromParams({providerId:Xs.PROVIDER_ID,signInMethod:Xs.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xs.credentialFromTaggedObject(e)}static credentialFromError(e){return Xs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Xs.credential(e.oauthAccessToken)}catch{return null}}}Xs.GITHUB_SIGN_IN_METHOD="github.com",Xs.PROVIDER_ID="github.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Ys extends Ks{constructor(){super("twitter.com")}static credential(e,t){return Hs._fromParams({providerId:Ys.PROVIDER_ID,signInMethod:Ys.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ys.credentialFromTaggedObject(e)}static credentialFromError(e){return Ys.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ys.credential(t,n)}catch{return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function Zs(e,t){return Mr(e,"POST","/v1/accounts:signUp",xr(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */Ys.TWITTER_SIGN_IN_METHOD="twitter.com",Ys.PROVIDER_ID="twitter.com";class Qs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const r=await ns._fromIdTokenResponse(e,n,i),s=eo(n);return new Qs({user:r,providerId:s,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=eo(n);return new Qs({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function eo(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class to extends Sn{constructor(e,t,n,i){super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,to.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new to(e,t,n,i)}}function no(e,t,n,i){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw to._fromErrorAndOperation(e,n,t,i);throw n})}async function io(e,t,n=!1){const i=await Jr(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Qs._forOperation(e,"link",i)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function ro(e,t,n=!1){if(Ji(e.app))return Promise.reject(vr(e));const i="signIn",r=await no(e,i,t),s=await Qs._fromIdTokenResponse(e,i,r);return n||await e._updateCurrentUser(s.user),s}async function so(e,t,n){if(Ji(e.app))return Promise.reject(vr(e));const i=Ts(e),r=Ds(i,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Zs),s=await r.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function(e){const t=Ts(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}(e),t}),o=await Qs._fromIdTokenResponse(i,"signIn",s);return await i._updateCurrentUser(o.user),o}async function oo(e,t){const n=Un(e),i={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()},{email:r}=await Fs(n.auth,i);r!==e.email&&await e.reload()}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function ao(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const i=Un(e),r={idToken:await i.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},s=await Jr(i,async function(e,t){return Lr(e,"POST","/v1/accounts:update",t)}(i.auth,r));i.displayName=s.displayName||null,i.photoURL=s.photoUrl||null;const o=i.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=i.displayName,o.photoURL=i.photoURL),await i._updateTokensIfNecessary(s)}async function co(e,t,n){const{auth:i}=e,r={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(r.email=t),n&&(r.password=n);const s=await Jr(e,async function(e,t){return Lr(e,"POST","/v1/accounts:update",t)}(i,r));await e._updateTokensIfNecessary(s,!0)}const ho="__sak";
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class lo{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ho,"1"),this.storage.removeItem(ho),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class uo extends lo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_s(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},r=this.storage.getItem(n);ws()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,10):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}uo.type="LOCAL";const po=uo;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class fo extends lo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}fo.type="SESSION";const go=fo;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class mo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new mo(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:r}=t.data,s=this.handlersMap[i];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const o=Array.from(s).map(async e=>e(t.origin,r)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function yo(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */mo.receivers=[];class wo{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,s;return new Promise((o,a)=>{const c=yo("",20);i.port1.start();const h=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:i,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),o(t.data.response);break;default:clearTimeout(h),clearTimeout(r),a(new Error("invalid_response"))}}},this.handlers.add(s),i.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _o(){return window}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function vo(){return void 0!==_o().WorkerGlobalScope&&"function"==typeof _o().importScripts}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const bo="firebaseLocalStorageDb",Io="firebaseLocalStorage",Eo="fbase_key";class To{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function So(e,t){return e.transaction([Io],t?"readwrite":"readonly").objectStore(Io)}function ko(){const e=indexedDB.open(bo,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Io,{keyPath:Eo})}catch(e){n(e)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(Io)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(bo);return new To(e).toPromise()}(),t(await ko()))})})}async function Ao(e,t,n){const i=So(e,!0).put({[Eo]:t,value:n});return new To(i).toPromise()}function Co(e,t){const n=So(e,!0).delete(t);return new To(n).toPromise()}class Po{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await ko()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return vo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=mo._getInstance(vo()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new wo(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ko();return await Ao(e,ho,"1"),await Co(e,ho),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ao(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=So(e,!1).get(t),i=await new To(n).toPromise();return void 0===i?null:i.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Co(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=So(e,!1).getAll();return new To(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:i,value:r}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),t.push(i));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Po.type="LOCAL";const Ro=Po;new Cr(3e4,6e4);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Oo extends Ms{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vs(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vs(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vs(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function No(e){return ro(e.auth,new Oo(e),e.bypassAuthState)}function Do(e){const{auth:t,user:n}=e;return Ir(n,t,"internal-error"),async function(e,t,n=!1){const{auth:i}=e;if(Ji(i.app))return Promise.reject(vr(i));const r="reauthenticate";try{const s=await Jr(e,no(i,r,t,e),n);Ir(s.idToken,i,"internal-error");const o=Kr(s.idToken);Ir(o,i,"internal-error");const{sub:a}=o;return Ir(e.uid===a,i,"user-mismatch"),Qs._forOperation(e,r,s)}catch(e){throw"auth/user-not-found"===e?.code&&yr(i,"user-mismatch"),e}}(n,new Oo(e),e.bypassAuthState)}async function xo(e){const{auth:t,user:n}=e;return Ir(n,t,"internal-error"),io(n,new Oo(e),e.bypassAuthState)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Lo{constructor(e,t,n,i,r=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:r,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return No;case"linkViaPopup":case"linkViaRedirect":return xo;case"reauthViaPopup":case"reauthViaRedirect":return Do;default:yr(this.auth,"internal-error")}}resolve(e){Tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Uo=new Cr(2e3,1e4);class Mo extends Lo{constructor(e,t,n,i,r){super(e,t,i,r),this.provider=n,this.authWindow=null,this.pollId=null,Mo.currentPopupAction&&Mo.currentPopupAction.cancel(),Mo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Ir(e,this.auth,"internal-error"),e}async onExecution(){Tr(1===this.filter.length,"Popup operations only handle one event");const e=yo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(wr(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(wr(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mo.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(wr(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Uo.get())};e()}}Mo.currentPopupAction=null;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const $o="pendingRedirect",jo=new Map;class Fo extends Lo{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=jo.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return as($o,e.config.apiKey,e.name)}(t),i=function(e){return rs(e._redirectPersistence)}(e);if(!await i._isAvailable())return!1;const r="true"===await i._get(n);return await i._remove(n),r}(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}jo.set(this.auth._key(),e)}return this.bypassAuthState||jo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Bo(e,t){jo.set(e._key(),t)}async function Vo(e,t,n=!1){if(Ji(e.app))return Promise.reject(vr(e));const i=Ts(e),r=
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(e,t){return t?rs(t):(Ir(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(i,t),s=new Fo(i,r,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,t)),o}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ho{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wo(e);default:return!1}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Wo(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(wr(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(zo(e))}saveEventToCache(e){this.cachedEventUids.add(zo(e)),this.lastProcessedEventTime=Date.now()}}function zo(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Wo({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const qo=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ko=/^https?/;async function Go(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Lr(e,"GET","/v1/projects",t)}(e);for(const e of t)try{if(Jo(e))return}catch{}yr(e,"unauthorized-domain")}function Jo(e){const t=Sr(),{protocol:n,hostname:i}=new URL(t);if(e.startsWith("chrome-extension://")){const r=new URL(e);return""===r.hostname&&""===i?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&r.hostname===i}if(!Ko.test(n))return!1;if(qo.test(e))return i===e;const r=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Xo=new Cr(3e4,6e4);function Yo(){const e=_o().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}function Zo(e){return new Promise((t,n)=>{function i(){Yo(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Yo(),n(wr(e,"network-request-failed"))},timeout:Xo.get()})}if(_o().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!_o().gapi?.load){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return _o()[t]=()=>{gapi.load?i():n(wr(e,"network-request-failed"))},As(`${ks.gapiScript}?onload=${t}`).catch(e=>n(e))}i()}}).catch(e=>{throw Qo=null,e})}let Qo=null;
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const ea=new Cr(5e3,15e3),ta={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},na=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ia(e){const t=e.config;Ir(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Pr(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,i={apiKey:t.apiKey,appName:e.name,v:Zi},r=na.get(e.config.apiHost);r&&(i.eid=r);const s=e._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${Rn(i).slice(1)}`}async function ra(e){const t=await function(e){return Qo=Qo||Zo(e),Qo}(e),n=_o().gapi;return Ir(n,e,"internal-error"),t.open({where:document.body,url:ia(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ta,dontclear:!0},t=>new Promise(async(n,i)=>{await t.restyle({setHideOnLeave:!1});const r=wr(e,"network-request-failed"),s=_o().setTimeout(()=>{i(r)},ea.get());function o(){_o().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{i(r)})}))}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const sa={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class oa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function aa(e,t,n,i=500,r=600){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...sa,width:i.toString(),height:r.toString(),top:s,left:o},h=vn().toLowerCase();n&&(a=ds(h)?"_blank":n),ls(h)&&(t=t||"http://localhost",c.scrollbars="yes");const l=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=vn()){return ys(e)&&!!window.navigator?.standalone}(h)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(t||"",a),new oa(null);const u=window.open(t||"",a,l);Ir(u,e,"popup-blocked");try{u.focus()}catch(e){}return new oa(u)}const ca="__/auth/handler",ha="emulator/auth/handler",la=encodeURIComponent("fac");async function ua(e,t,n,i,r,s){Ir(e.config.authDomain,e,"auth-domain-config-required"),Ir(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:i,v:Zi,eventId:r};if(t instanceof qs){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Ks){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const e of Object.keys(a))void 0===a[e]&&delete a[e];const c=await e._getAppCheckToken(),h=c?`#${la}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${ca}`;return Pr(e,ha)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e)}?${Rn(a).slice(1)}${h}`}const da="webStorageSupport";const pa=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=go,this._completeRedirectFn=Vo,this._overrideRedirectResult=Bo}async _openPopup(e,t,n,i){Tr(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return aa(e,await ua(e,t,n,Sr(),i),yo())}async _openRedirect(e,t,n,i){await this._originValidation(e);return function(e){_o().location.href=e}(await ua(e,t,n,Sr(),i)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Tr(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await ra(e),n=new Ho(e);return t.register("authEvent",t=>{Ir(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(da,{type:da},n=>{const i=n?.[0]?.[da];void 0!==i&&t(!!i),yr(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Go(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _s()||us()||ys()}};var fa="@firebase/auth",ga="1.11.0";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class ma{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Ir(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const ya=dn("authIdTokenMaxAge")||300;let wa=null;function _a(e=er()){const t=Gi(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=Gi(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(Cn(n.getOptions(),t??{}))return e;yr(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:pa,persistence:[Ro,po,go]}),i=dn("authTokenSyncURL");if(i&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(i,location.origin);if(location.origin===e.origin){const t=(r=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>ya)return;const i=t?.token;wa!==i&&(wa=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))});!function(e,t,n){Un(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,i){Un(e).onIdTokenChanged(t,n,i)}(n,e=>t(e))}}var r;const s=hn("auth");return s&&xs(n,`http://${s}`),n}var va;!function(e){ks=e}({loadJS:e=>new Promise((t,n)=>{const i=document.createElement("script");i.setAttribute("src",e),i.onload=t,i.onerror=e=>{const t=wr("internal-error");t.customData=e,n(t)},i.type="text/javascript",i.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(i)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),va="Browser",Ki(new Mn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:s,authDomain:o}=n.options;Ir(s&&!s.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:s,authDomain:o,clientPlatform:va,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vs(va)},c=new Es(n,i,r,a);return function(e,t){const n=t?.persistence||[],i=(Array.isArray(n)?n:[n]).map(rs);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(i,t?.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Ki(new Mn("auth-internal",e=>(e=>new ma(e))(Ts(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),tr(fa,ga,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(va)),tr(fa,ga,"esm2020");var ba,Ia="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  */(function(){var e;
/** @license

   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(e,t,n){n||(n=0);var i=Array(16);if("string"==typeof t)for(var r=0;16>r;++r)i[r]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(r=0;16>r;++r)i[r]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],r=e.g[2];var s=e.g[3],o=t+(s^n&(r^s))+i[0]+3614090360&4294967295;o=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=(n=(r=(s=(t=n+(o<<7&4294967295|o>>>25))+((o=s+(r^t&(n^r))+i[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^s&(t^n))+i[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(s^t))+i[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(r^s))+i[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=s+(r^t&(n^r))+i[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^s&(t^n))+i[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(s^t))+i[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(r^s))+i[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=s+(r^t&(n^r))+i[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^s&(t^n))+i[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(s^t))+i[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^n&(r^s))+i[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=s+(r^t&(n^r))+i[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=r+(n^s&(t^n))+i[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^r&(s^t))+i[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^s&(n^r))+i[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^r&(t^n))+i[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(s^t))+i[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(r^s))+i[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^s&(n^r))+i[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^r&(t^n))+i[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(s^t))+i[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(r^s))+i[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^s&(n^r))+i[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^r&(t^n))+i[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(s^t))+i[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(r^s))+i[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=t+(r^s&(n^r))+i[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=s+(n^r&(t^n))+i[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=r+(t^n&(s^t))+i[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(s^t&(r^s))+i[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=t+(n^r^s)+i[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^r)+i[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=r+(s^t^n)+i[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^s^t)+i[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^s)+i[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^r)+i[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=r+(s^t^n)+i[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^s^t)+i[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^s)+i[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^r)+i[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=r+(s^t^n)+i[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^s^t)+i[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^r^s)+i[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=s+(t^n^r)+i[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=r+(s^t^n)+i[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(r^s^t)+i[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=t+(r^(n|~s))+i[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~r))+i[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(s|~n))+i[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(r|~t))+i[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=t+(r^(n|~s))+i[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~r))+i[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(s|~n))+i[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(r|~t))+i[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=t+(r^(n|~s))+i[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~r))+i[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=r+(t^(s|~n))+i[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(s^(r|~t))+i[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((s=(t=n+((o=t+(r^(n|~s))+i[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=s+(n^(t|~r))+i[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((r=s+((o=r+(t^(s|~n))+i[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~t))+i[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+r&4294967295,e.g[3]=e.g[3]+s&4294967295}function i(e,t){this.h=t;for(var n=[],i=!0,r=e.length-1;0<=r;r--){var s=0|e[r];i&&s==t||(n[r]=s,i=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,i){for(var r=Array(arguments.length-2),s=2;s<arguments.length;s++)r[s-2]=arguments[s];return t.prototype[n].apply(e,r)}}(t,function(){this.blockSize=-1}),t.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var i=t-this.blockSize,r=this.B,s=this.h,o=0;o<t;){if(0==s)for(;o<=i;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(r[s++]=e.charCodeAt(o++),s==this.blockSize){n(this,r),s=0;break}}else for(;o<t;)if(r[s++]=e[o++],s==this.blockSize){n(this,r),s=0;break}}this.h=s,this.o+=t},t.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var i=0;32>i;i+=8)e[n++]=this.g[t]>>>i&255;return e};var r={};function s(e){return-128<=e&&128>e?function(e,t){var n=r;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new i([0|e],0>e?-1:0)}):new i([0|e],0>e?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(0>e)return d(o(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new i(t,0)}var a=s(0),c=s(1),h=s(16777216);function l(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function u(e){return-1==e.h}function d(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new i(n,~e.h).add(c)}function p(e,t){return e.add(d(t))}function f(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function g(e,t){this.g=e,this.h=t}function m(e,t){if(l(t))throw Error("division by zero");if(l(e))return new g(a,a);if(u(e))return t=m(d(e),t),new g(d(t.g),d(t.h));if(u(t))return t=m(e,d(t)),new g(d(t.g),t.h);if(30<e.g.length){if(u(e)||u(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,i=t;0>=i.l(e);)n=y(n),i=y(i);var r=w(n,1),s=w(i,1);for(i=w(i,2),n=w(n,2);!l(i);){var h=s.add(i);0>=h.l(e)&&(r=r.add(n),s=h),i=w(i,1),n=w(n,1)}return t=p(e,r.j(t)),new g(r,t)}for(r=a;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),i=48>=(i=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,i-48),h=(s=o(n)).j(t);u(h)||0<h.l(e);)h=(s=o(n-=i)).j(t);l(s)&&(s=c),r=r.add(s),e=p(e,h)}return new g(r,e)}function y(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new i(n,e.h)}function w(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,s=[],o=0;o<r;o++)s[o]=0<t?e.i(o+n)>>>t|e.i(o+n+1)<<32-t:e.i(o+n);return new i(s,e.h)}(e=i.prototype).m=function(){if(u(this))return-d(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var i=this.i(n);e+=(0<=i?i:4294967296+i)*t,t*=4294967296}return e},e.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(u(this))return"-"+d(this).toString(e);for(var t=o(Math.pow(e,6)),n=this,i="";;){var r=m(n,t).g,s=((0<(n=p(n,r.j(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(l(n=r))return s+i;for(;6>s.length;)s="0"+s;i=s+i}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return u(e=p(this,e))?-1:l(e)?0:1},e.abs=function(){return u(this)?d(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,s=0;s<=t;s++){var o=r+(65535&this.i(s))+(65535&e.i(s)),a=(o>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);r=a>>>16,o&=65535,a&=65535,n[s]=a<<16|o}return new i(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return a;if(u(this))return u(e)?d(this).j(d(e)):d(d(this).j(e));if(u(e))return d(this.j(d(e)));if(0>this.l(h)&&0>e.l(h))return o(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<e.g.length;s++){var c=this.i(r)>>>16,p=65535&this.i(r),g=e.i(s)>>>16,m=65535&e.i(s);n[2*r+2*s]+=p*m,f(n,2*r+2*s),n[2*r+2*s+1]+=c*m,f(n,2*r+2*s+1),n[2*r+2*s+1]+=p*g,f(n,2*r+2*s+1),n[2*r+2*s+2]+=c*g,f(n,2*r+2*s+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new i(n,0)},e.A=function(e){return m(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new i(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new i(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new i(n,this.h^e.h)},t.prototype.digest=t.prototype.v,t.prototype.reset=t.prototype.s,t.prototype.update=t.prototype.u,i.prototype.add=i.prototype.add,i.prototype.multiply=i.prototype.j,i.prototype.modulo=i.prototype.A,i.prototype.compare=i.prototype.l,i.prototype.toNumber=i.prototype.m,i.prototype.toString=i.prototype.toString,i.prototype.getBits=i.prototype.i,i.fromNumber=o,i.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var i=o(Math.pow(n,8)),r=a,s=0;s<t.length;s+=8){var c=Math.min(8,t.length-s),h=parseInt(t.substring(s,s+c),n);8>c?(c=o(Math.pow(n,c)),r=r.j(c).add(o(h))):r=(r=r.j(i)).add(o(h))}return r},ba=i}).apply(void 0!==Ia?Ia:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Ea="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e};var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Ea&&Ea];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(e,i){if(i)e:{var r=n;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in r))break e;r=r[o]}(i=i(s=r[e=e[e.length-1]]))!=s&&null!=i&&t(r,e,{configurable:!0,writable:!0,value:i})}}("Array.prototype.values",function(e){return e||function(){return function(e,t){e instanceof String&&(e+="");var n=0,i=!1,r={next:function(){if(!i&&n<e.length){var r=n++;return{value:t(r,e[r]),done:!1}}return i=!0,{done:!0,value:void 0}}};return r[Symbol.iterator]=function(){return r},r}(this,function(e,t){return t})}});
/** @license

   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var i=i||{},r=this||self;function s(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){if(!e)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function h(e,t,n){return(h=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function u(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,i){for(var r=Array(arguments.length-2),s=2;s<arguments.length;s++)r[s-2]=arguments[s];return t.prototype[n].apply(e,r)}}function d(e){const t=e.length;if(0<t){const n=Array(t);for(let i=0;i<t;i++)n[i]=e[i];return n}return[]}function p(e,t){for(let t=1;t<arguments.length;t++){const n=arguments[t];if(s(n)){const t=e.length||0,i=n.length||0;e.length=t+i;for(let r=0;r<i;r++)e[t+r]=n[r]}else e.push(n)}}function f(e){return/^[\s\xa0]*$/.test(e)}function g(){var e=r.navigator;return e&&(e=e.userAgent)?e:""}function m(e){return m[" "](e),e}m[" "]=function(){};var y=!(-1==g().indexOf("Gecko")||-1!=g().toLowerCase().indexOf("webkit")&&-1==g().indexOf("Edge")||-1!=g().indexOf("Trident")||-1!=g().indexOf("MSIE")||-1!=g().indexOf("Edge"));function w(e,t,n){for(const i in e)t.call(n,e[i],i,e)}function _(e){const t={};for(const n in e)t[n]=e[n];return t}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(e,t){let n,i;for(let t=1;t<arguments.length;t++){for(n in i=arguments[t],i)e[n]=i[n];for(let t=0;t<v.length;t++)n=v[t],Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}}function I(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function E(e){r.setTimeout(()=>{throw e},0)}function T(){var e=P;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var S=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new k,e=>e.reset());class k{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let A,C=!1,P=new class{constructor(){this.h=this.g=null}add(e,t){const n=S.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},R=()=>{const e=r.Promise.resolve(void 0);A=()=>{e.then(O)}};var O=()=>{for(var e;e=T();){try{e.h.call(e.g)}catch(e){E(e)}var t=S;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}C=!1};function N(){this.s=this.s,this.C=this.C}function D(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}N.prototype.s=!1,N.prototype.ma=function(){this.s||(this.s=!0,this.N())},N.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},D.prototype.h=function(){this.defaultPrevented=!0};var x=function(){if(!r.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};r.addEventListener("test",e,t),r.removeEventListener("test",e,t)}catch(e){}return e}();function L(e,t){if(D.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,i=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(y){e:{try{m(t.nodeName);var r=!0;break e}catch(e){}r=!1}r||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,i?(this.clientX=void 0!==i.clientX?i.clientX:i.pageX,this.clientY=void 0!==i.clientY?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:U[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&L.aa.h.call(this)}}u(L,D);var U={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var M="closure_listenable_"+(1e6*Math.random()|0),$=0;function j(e,t,n,i,r){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!i,this.ha=r,this.key=++$,this.da=this.fa=!1}function F(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function B(e){this.src=e,this.g={},this.h=0}function V(e,t){var n=t.type;if(n in e.g){var i,r=e.g[n],s=Array.prototype.indexOf.call(r,t,void 0);(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(F(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function H(e,t,n,i){for(var r=0;r<e.length;++r){var s=e[r];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==i)return r}return-1}B.prototype.add=function(e,t,n,i,r){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=H(e,t,i,r);return-1<o?(t=e[o],n||(t.fa=!1)):((t=new j(t,this.src,s,!!i,r)).fa=n,e.push(t)),t};var z="closure_lm_"+(1e6*Math.random()|0),W={};function q(e,t,n,i,r){if(Array.isArray(t)){for(var s=0;s<t.length;s++)q(e,t[s],n,i,r);return null}return n=Q(n),e&&e[M]?e.K(t,n,!!o(i)&&!!i.capture,r):function(e,t,n,i,r,s){if(!t)throw Error("Invalid event type");var a=o(r)?!!r.capture:!!r,c=Y(e);if(c||(e[z]=c=new B(e)),n=c.add(t,n,i,a,s),n.proxy)return n;if(i=function(){function e(n){return t.call(e.src,e.listener,n)}const t=X;return e}(),n.proxy=i,i.src=e,i.listener=n,e.addEventListener)x||(r=a),void 0===r&&(r=!1),e.addEventListener(t.toString(),i,r);else if(e.attachEvent)e.attachEvent(J(t.toString()),i);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(i)}return n}(e,t,n,!1,i,r)}function K(e,t,n,i,r){if(Array.isArray(t))for(var s=0;s<t.length;s++)K(e,t[s],n,i,r);else i=o(i)?!!i.capture:!!i,n=Q(n),e&&e[M]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=H(s=e.g[t],n,i,r))&&(F(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete e.g[t],e.h--)))):e&&(e=Y(e))&&(t=e.g[t.toString()],e=-1,t&&(e=H(t,n,i,r)),(n=-1<e?t[e]:null)&&G(n))}function G(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[M])V(t.i,e);else{var n=e.type,i=e.proxy;t.removeEventListener?t.removeEventListener(n,i,e.capture):t.detachEvent?t.detachEvent(J(n),i):t.addListener&&t.removeListener&&t.removeListener(i),(n=Y(t))?(V(n,e),0==n.h&&(n.src=null,t[z]=null)):F(e)}}}function J(e){return e in W?W[e]:W[e]="on"+e}function X(e,t){if(e.da)e=!0;else{t=new L(t,this);var n=e.listener,i=e.ha||e.src;e.fa&&G(e),e=n.call(i,t)}return e}function Y(e){return(e=e[z])instanceof B?e:null}var Z="__closure_events_fn_"+(1e9*Math.random()>>>0);function Q(e){return"function"==typeof e?e:(e[Z]||(e[Z]=function(t){return e.handleEvent(t)}),e[Z])}function ee(){N.call(this),this.i=new B(this),this.M=this,this.F=null}function te(e,t){var n,i=e.F;if(i)for(n=[];i;i=i.F)n.push(i);if(e=e.M,i=t.type||t,"string"==typeof t)t=new D(t,e);else if(t instanceof D)t.target=t.target||e;else{var r=t;b(t=new D(i,e),r)}if(r=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];r=ne(o,i,!0,t)&&r}if(r=ne(o=t.g=e,i,!0,t)&&r,r=ne(o,i,!1,t)&&r,n)for(s=0;s<n.length;s++)r=ne(o=t.g=n[s],i,!1,t)&&r}function ne(e,t,n,i){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var r=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&V(e.i,o),r=!1!==a.call(c,i)&&r}}return r&&!i.defaultPrevented}function ie(e,t,n){if("function"==typeof e)n&&(e=h(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=h(e.handleEvent,e)}return 2147483647<Number(t)?-1:r.setTimeout(e,t||0)}function re(e){e.g=ie(()=>{e.g=null,e.i&&(e.i=!1,re(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}u(ee,N),ee.prototype[M]=!0,ee.prototype.removeEventListener=function(e,t,n,i){K(this,e,t,n,i)},ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],i=0;i<n.length;i++)F(n[i]);delete t.g[e],t.h--}}this.F=null},ee.prototype.K=function(e,t,n,i){return this.i.add(String(e),t,!1,n,i)},ee.prototype.L=function(e,t,n,i){return this.i.add(String(e),t,!0,n,i)};class se extends N{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:re(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oe(e){N.call(this),this.h=e,this.g={}}u(oe,N);var ae=[];function ce(e){w(e.g,function(e,t){this.g.hasOwnProperty(t)&&G(e)},e),e.g={}}oe.prototype.N=function(){oe.aa.N.call(this),ce(this)},oe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var he=r.JSON.stringify,le=r.JSON.parse,ue=class{stringify(e){return r.JSON.stringify(e,void 0)}parse(e){return r.JSON.parse(e,void 0)}};function de(){}function pe(e){return e.h||(e.h=e.i())}de.prototype.h=null;var fe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ge(){D.call(this,"d")}function me(){D.call(this,"c")}u(ge,D),u(me,D);var ye={},we=null;function _e(){return we=we||new ee}function ve(e){D.call(this,ye.La,e)}function be(e){const t=_e();te(t,new ve(t))}function Ie(e,t){D.call(this,ye.STAT_EVENT,e),this.stat=t}function Ee(e){const t=_e();te(t,new Ie(t,e))}function Te(e,t){D.call(this,ye.Ma,e),this.size=t}function Se(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){e()},t)}function ke(){this.g=!0}function Ae(e,t,n,i){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var i=n[e];if(!(2>i.length)){var r=i[1];if(Array.isArray(r)&&!(1>r.length)){var s=r[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<r.length;o++)r[o]=""}}}return he(n)}catch(e){return t}}(e,n)+(i?" "+i:"")})}ye.La="serverreachability",u(ve,D),ye.STAT_EVENT="statevent",u(Ie,D),ye.Ma="timingevent",u(Te,D),ke.prototype.xa=function(){this.g=!1},ke.prototype.info=function(){};var Ce,Pe={NO_ERROR:0,TIMEOUT:8};function Re(){}function Oe(e,t,n,i){this.j=e,this.i=t,this.l=n,this.R=i||1,this.U=new oe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}u(Re,de),Re.prototype.g=function(){return new XMLHttpRequest},Re.prototype.i=function(){return{}},Ce=new Re;var De={},xe={};function Le(e,t,n){e.L=1,e.v=at(nt(t)),e.m=n,e.P=!0,Ue(e,null)}function Ue(e,t){e.F=Date.now(),je(e),e.A=nt(e.v);var n=e.A,i=e.R;Array.isArray(i)||(i=[String(i)]),vt(n.i,"t",i),e.C=0,n=e.j.J,e.h=new Ne,e.g=cn(e.j,n?t:null,!e.m),0<e.O&&(e.M=new se(h(e.Y,e,e.g),e.O)),t=e.U,n=e.g,i=e.ca;var r="readystatechange";Array.isArray(r)||(r&&(ae[0]=r.toString()),r=ae);for(var s=0;s<r.length;s++){var o=q(n,r[s],i||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?_(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),be(),function(e,t,n,i,r,s){e.info(function(){if(e.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var h=a[c].split("=");if(1<h.length){var l=h[0];h=h[1];var u=l.split("_");o=2<=u.length&&"type"==u[1]?o+(l+"=")+h+"&":o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+i+") [attempt "+r+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.u,e.A,e.l,e.R,e.m)}function Me(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.j.Ca)}function $e(e,t){var n=e.C,i=t.indexOf("\n",n);return-1==i?xe:(n=Number(t.substring(n,i)),isNaN(n)?De:(i+=1)+n>t.length?xe:(t=t.slice(i,i+n),e.C=i+n,t))}function je(e){e.S=Date.now()+e.I,Fe(e,e.I)}function Fe(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Se(h(e.ba,e),t)}function Be(e){e.B&&(r.clearTimeout(e.B),e.B=null)}function Ve(e){0==e.j.G||e.J||nn(e.j,e)}function He(e){Be(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ce(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function ze(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||Je(n.h,e)))if(!e.K&&Je(n.h,e)&&3==n.G){try{var i=n.Da.g.parse(t)}catch(e){i=null}if(Array.isArray(i)&&3==i.length){var r=i;if(0==r[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;tn(n),Wt(n)}Zt(n),Ee(18)}}else n.za=r[1],0<n.za-n.T&&37500>r[2]&&n.F&&0==n.v&&!n.C&&(n.C=Se(h(n.Za,n),6e3));if(1>=Ge(n.h)&&n.ca){try{n.ca()}catch(e){}n.ca=void 0}}else sn(n,11)}else if((e.K||n.g==e)&&tn(n),!f(t))for(r=n.Da.g.parse(t),t=0;t<r.length;t++){let h=r[t];if(n.T=h[0],h=h[1],2==n.G)if("c"==h[0]){n.K=h[1],n.ia=h[2];const t=h[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const r=h[4];null!=r&&(n.Aa=r,n.j.info("SVER="+n.Aa));const l=h[5];null!=l&&"number"==typeof l&&0<l&&(i=1.5*l,n.L=i,n.j.info("backChannelRequestTimeoutMs_="+i)),i=n;const u=e.g;if(u){const e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=i.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(Xe(s,s.h),s.h=null))}if(i.D){const e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(i.ya=e,ot(i.I,i.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=e;if((i=n).qa=an(i,i.J?i.ia:null,i.W),o.K){Ye(i.h,o);var a=o,c=i.L;c&&(a.I=c),a.B&&(Be(a),je(a)),i.g=o}else Yt(i);0<n.i.length&&Kt(n)}else"stop"!=h[0]&&"close"!=h[0]||sn(n,7);else 3==n.G&&("stop"==h[0]||"close"==h[0]?"stop"==h[0]?sn(n,7):zt(n):"noop"!=h[0]&&n.l&&n.l.ta(h),n.v=0)}be()}catch(e){}}Oe.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==Ft(e)?t.j():this.Y(e)},Oe.prototype.Y=function(e){try{if(e==this.g)e:{const d=Ft(this.g);var t=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Bt(this.g)))){this.J||4!=d||7==t||be(),Be(this);var n=this.g.Z();this.X=n;t:if(Me(this)){var i=Bt(this.g);e="";var s=i.length,o=4==Ft(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){He(this),Ve(this);var a="";break t}this.h.i=new r.TextDecoder}for(t=0;t<s;t++)this.h.h=!0,e+=this.h.i.decode(i[t],{stream:!(o&&t==s-1)});i.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(e,t,n,i,r,s,o){e.info(function(){return"XMLHTTP RESP ("+i+") [ attempt "+r+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){t:{if(this.g){var c,h=this.g;if((c=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!f(c)){var l=c;break t}}l=null}if(!(n=l)){this.o=!1,this.s=3,Ee(12),He(this),Ve(this);break e}Ae(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ze(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<a.length;){if(e=$e(this,a),e==xe){4==d&&(this.s=4,Ee(14),n=!1),Ae(this.i,this.l,null,"[Incomplete Response]");break}if(e==De){this.s=4,Ee(15),Ae(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Ae(this.i,this.l,e,null),ze(this,e)}if(Me(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,Ee(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var u=this.j;u.g==this&&u.ba&&!u.M&&(u.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),Qt(u),u.M=!0,Ee(11))}}else Ae(this.i,this.l,a,"[Invalid Chunked Response]"),He(this),Ve(this)}else Ae(this.i,this.l,a,null),ze(this,a);4==d&&He(this),this.o&&!this.J&&(4==d?nn(this.j,this):(this.o=!1,je(this)))}else(function(e){const t={};e=(e.g&&2<=Ft(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let i=0;i<e.length;i++){if(f(e[i]))continue;var n=I(e[i]);const r=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const s=t[r]||[];t[r]=s,s.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,Ee(12)):(this.s=0,Ee(13)),He(this),Ve(this)}}}catch(e){}},Oe.prototype.cancel=function(){this.J=!0,He(this)},Oe.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(be(),Ee(17)),He(this),this.s=2,Ve(this)):Fe(this,this.S-e)};var We=class{constructor(e,t){this.g=e,this.map=t}};function qe(e){this.l=e||10,r.PerformanceNavigationTiming?e=0<(e=r.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ke(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ge(e){return e.h?1:e.g?e.g.size:0}function Je(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Xe(e,t){e.g?e.g.add(t):e.h=t}function Ye(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Ze(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return d(e.i)}function Qe(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(s(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(s(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const i in e)t[n++]=i;return t}}}(e),i=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(s(e)){for(var t=[],n=e.length,i=0;i<n;i++)t.push(e[i]);return t}for(i in t=[],n=0,e)t[n++]=e[i];return t}(e),r=i.length,o=0;o<r;o++)t.call(void 0,i[o],n&&n[o],e)}qe.prototype.cancel=function(){if(this.i=Ze(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var et=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tt(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof tt){this.h=e.h,it(this,e.j),this.o=e.o,this.g=e.g,rt(this,e.s),this.l=e.l;var t=e.i,n=new mt;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),st(this,n),this.m=e.m}else e&&(t=String(e).match(et))?(this.h=!1,it(this,t[1]||"",!0),this.o=ct(t[2]||""),this.g=ct(t[3]||"",!0),rt(this,t[4]),this.l=ct(t[5]||"",!0),st(this,t[6]||"",!0),this.m=ct(t[7]||"")):(this.h=!1,this.i=new mt(null,this.h))}function nt(e){return new tt(e)}function it(e,t,n){e.j=n?ct(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function rt(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function st(e,t,n){t instanceof mt?(e.i=t,function(e,t){t&&!e.j&&(yt(e),e.i=null,e.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(wt(this,t),vt(this,n,e))},e)),e.j=t}(e.i,e.h)):(n||(t=ht(t,ft)),e.i=new mt(t,e.h))}function ot(e,t,n){e.i.set(t,n)}function at(e){return ot(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ct(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ht(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,lt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function lt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}tt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ht(t,ut,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(ht(t,ut,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(ht(n,"/"==n.charAt(0)?pt:dt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",ht(n,gt)),e.join("")};var ut=/[#\/\?@]/g,dt=/[#\?:]/g,pt=/[#\?]/g,ft=/[#\?@]/g,gt=/#/g;function mt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function yt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var i=e[n].indexOf("="),r=null;if(0<=i){var s=e[n].substring(0,i);r=e[n].substring(i+1)}else s=e[n];t(s,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function wt(e,t){yt(e),t=bt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function _t(e,t){return yt(e),t=bt(e,t),e.g.has(t)}function vt(e,t,n){wt(e,t),0<n.length&&(e.i=null,e.g.set(bt(e,t),d(n)),e.h+=n.length)}function bt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function It(e,t,n,i,r){try{r&&(r.onload=null,r.onerror=null,r.onabort=null,r.ontimeout=null),i(n)}catch(e){}}function Et(){this.g=new ue}function Tt(e,t,n){const i=n||"";try{Qe(e,function(e,n){let r=e;o(e)&&(r=he(e)),t.push(i+n+"="+encodeURIComponent(r))})}catch(e){throw t.push(i+"type="+encodeURIComponent("_badmap")),e}}function St(e){this.l=e.Ub||null,this.j=e.eb||!1}function kt(e,t){ee.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function At(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function Ct(e){e.readyState=4,e.l=null,e.j=null,e.v=null,Pt(e)}function Pt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Rt(e){let t="";return w(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Ot(e,t,n){e:{for(i in n){var i=!1;break e}i=!0}i||(n=Rt(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):ot(e,t,n))}function Nt(e){ee.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(e=mt.prototype).add=function(e,t){yt(this),this.i=null,e=bt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){yt(this),this.g.forEach(function(n,i){n.forEach(function(n){e.call(t,n,i,this)},this)},this)},e.na=function(){yt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let i=0;i<t.length;i++){const r=e[i];for(let e=0;e<r.length;e++)n.push(t[i])}return n},e.V=function(e){yt(this);let t=[];if("string"==typeof e)_t(this,e)&&(t=t.concat(this.g.get(bt(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return yt(this),this.i=null,_t(this,e=bt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var i=t[n];const s=encodeURIComponent(String(i)),o=this.V(i);for(i=0;i<o.length;i++){var r=s;""!==o[i]&&(r+="="+encodeURIComponent(String(o[i]))),e.push(r)}}return this.i=e.join("&")},u(St,de),St.prototype.g=function(){return new kt(this.l,this.j)},St.prototype.i=function(e){return function(){return e}}({}),u(kt,ee),(e=kt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,Pt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||r).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ct(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Pt(this)),this.g&&(this.readyState=3,Pt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==r.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;At(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Ct(this):Pt(this),3==this.readyState&&At(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,Ct(this))},e.Qa=function(e){this.g&&(this.response=e,Ct(this))},e.ga=function(){this.g&&Ct(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(kt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),u(Nt,ee);var Dt=/^https?$/i,xt=["POST","PUT"];function Lt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,Ut(e),$t(e)}function Ut(e){e.A||(e.A=!0,te(e,"complete"),te(e,"error"))}function Mt(e){if(e.h&&void 0!==i&&(!e.v[1]||4!=Ft(e)||2!=e.Z()))if(e.u&&4==Ft(e))ie(e.Ea,0,e);else if(te(e,"readystatechange"),4==Ft(e)){e.h=!1;try{const i=e.Z();e:switch(i){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var s;if(s=0===i){var o=String(e.D).match(et)[1]||null;!o&&r.self&&r.self.location&&(o=r.self.location.protocol.slice(0,-1)),s=!Dt.test(o?o.toLowerCase():"")}n=s}if(n)te(e,"complete"),te(e,"success");else{e.m=6;try{var a=2<Ft(e)?e.g.statusText:""}catch(e){a=""}e.l=a+" ["+e.Z()+"]",Ut(e)}}finally{$t(e)}}}function $t(e,t){if(e.g){jt(e);const n=e.g,i=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||te(e,"ready");try{n.onreadystatechange=i}catch(e){}}}function jt(e){e.I&&(r.clearTimeout(e.I),e.I=null)}function Ft(e){return e.g?e.g.readyState:0}function Bt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ht(e){this.Aa=0,this.i=[],this.j=new ke,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vt("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vt("baseRetryDelayMs",5e3,e),this.cb=Vt("retryDelaySeedMs",1e4,e),this.Wa=Vt("forwardChannelMaxRetries",2,e),this.wa=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new qe(e&&e.concurrentRequestLimit),this.Da=new Et,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function zt(e){if(qt(e),3==e.G){var t=e.U++,n=nt(e.I);if(ot(n,"SID",e.K),ot(n,"RID",t),ot(n,"TYPE","terminate"),Jt(e,n),(t=new Oe(e,e.j,t)).L=2,t.v=at(nt(n)),n=!1,r.navigator&&r.navigator.sendBeacon)try{n=r.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!n&&r.Image&&((new Image).src=t.v,n=!0),n||(t.g=cn(t.j,null),t.g.ea(t.v)),t.F=Date.now(),je(t)}on(e)}function Wt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function qt(e){Wt(e),e.u&&(r.clearTimeout(e.u),e.u=null),tn(e),e.h.cancel(),e.s&&("number"==typeof e.s&&r.clearTimeout(e.s),e.s=null)}function Kt(e){if(!Ke(e.h)&&!e.s){e.s=!0;var t=e.Ga;A||R(),C||(A(),C=!0),P.add(t,e),e.B=0}}function Gt(e,t){var n;n=t?t.l:e.U++;const i=nt(e.I);ot(i,"SID",e.K),ot(i,"RID",n),ot(i,"AID",e.T),Jt(e,i),e.m&&e.o&&Ot(i,e.m,e.o),n=new Oe(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=Xt(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),Xe(e.h,n),Le(n,i,t)}function Jt(e,t){e.H&&w(e.H,function(e,n){ot(t,n,e)}),e.l&&Qe({},function(e,n){ot(t,n,e)})}function Xt(e,t,n){n=Math.min(e.i.length,n);var i=e.l?h(e.l.Na,e.l,e):null;e:{var r=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=r[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let o=0;o<n;o++){let n=r[o].g;const a=r[o].map;if(n-=t,0>n)t=Math.max(0,r[o].g-100),s=!1;else try{Tt(a,e,"req"+n+"_")}catch(e){i&&i(a)}}if(s){i=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,i}function Yt(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;A||R(),C||(A(),C=!0),P.add(t,e),e.v=0}}function Zt(e){return!(e.g||e.u||3<=e.v)&&(e.Y++,e.u=Se(h(e.Fa,e),rn(e,e.v)),e.v++,!0)}function Qt(e){null!=e.A&&(r.clearTimeout(e.A),e.A=null)}function en(e){e.g=new Oe(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=nt(e.qa);ot(t,"RID","rpc"),ot(t,"SID",e.K),ot(t,"AID",e.T),ot(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&ot(t,"TO",e.ja),ot(t,"TYPE","xmlhttp"),Jt(e,t),e.m&&e.o&&Ot(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=at(nt(t)),n.m=null,n.P=!0,Ue(n,e)}function tn(e){null!=e.C&&(r.clearTimeout(e.C),e.C=null)}function nn(e,t){var n=null;if(e.g==t){tn(e),Qt(e),e.g=null;var i=2}else{if(!Je(e.h,t))return;n=t.D,Ye(e.h,t),i=1}if(0!=e.G)if(t.o)if(1==i){n=t.m?t.m.length:0,t=Date.now()-t.F;var r=e.B;te(i=_e(),new Te(i,n)),Kt(e)}else Yt(e);else if(3==(r=t.s)||0==r&&0<t.X||!(1==i&&function(e,t){return!(Ge(e.h)>=e.h.j-(e.s?1:0)||(e.s?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa)||(e.s=Se(h(e.Ga,e,t),rn(e,e.B)),e.B++,0)))}(e,t)||2==i&&Zt(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),r){case 1:sn(e,5);break;case 4:sn(e,10);break;case 3:sn(e,6);break;default:sn(e,2)}}function rn(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function sn(e,t){if(e.j.info("Error code "+t),2==t){var n=h(e.fb,e),i=e.Xa;const t=!i;i=new tt(i||"//www.google.com/images/cleardot.gif"),r.location&&"http"==r.location.protocol||it(i,"https"),at(i),t?function(e,t){const n=new ke;if(r.Image){const i=new Image;i.onload=l(It,n,"TestLoadImage: loaded",!0,t,i),i.onerror=l(It,n,"TestLoadImage: error",!1,t,i),i.onabort=l(It,n,"TestLoadImage: abort",!1,t,i),i.ontimeout=l(It,n,"TestLoadImage: timeout",!1,t,i),r.setTimeout(function(){i.ontimeout&&i.ontimeout()},1e4),i.src=e}else t(!1)}(i.toString(),n):function(e,t){new ke;const n=new AbortController,i=setTimeout(()=>{n.abort(),It(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(i),e.ok?It(0,0,!0,t):It(0,0,!1,t)}).catch(()=>{clearTimeout(i),It(0,0,!1,t)})}(i.toString(),n)}else Ee(2);e.G=0,e.l&&e.l.sa(t),on(e),qt(e)}function on(e){if(e.G=0,e.ka=[],e.l){const t=Ze(e.h);0==t.length&&0==e.i.length||(p(e.ka,t),p(e.ka,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.ra()}}function an(e,t,n){var i=n instanceof tt?nt(n):new tt(n);if(""!=i.g)t&&(i.g=t+"."+i.g),rt(i,i.s);else{var s=r.location;i=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;var o=new tt(null);i&&it(o,i),t&&(o.g=t),s&&rt(o,s),n&&(o.l=n),i=o}return n=e.D,t=e.ya,n&&t&&ot(i,n,t),ot(i,"VER",e.la),Jt(e,i),i}function cn(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Ca&&!e.pa?new Nt(new St({eb:n})):new Nt(e.pa)).Ha(e.J),t}function hn(){}function ln(e,t){ee.call(this),this.g=new Ht(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!f(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!f(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new pn(this)}function un(e){ge.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function dn(){me.call(this),this.status=1}function pn(e){this.g=e}(e=Nt.prototype).Ha=function(e){this.J=e},e.ea=function(e,t,n,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ce.g(),this.v=this.o?pe(this.o):pe(Ce),this.g.onreadystatechange=h(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(e){return void Lt(this,e)}if(e=n||"",n=new Map(this.headers),i)if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)n.set(s,i[s]);else{if("function"!=typeof i.keys||"function"!=typeof i.get)throw Error("Unknown input type for opt_headers: "+String(i));for(const e of i.keys())n.set(e,i.get(e))}i=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=r.FormData&&e instanceof r.FormData,!(0<=Array.prototype.indexOf.call(xt,t,void 0))||i||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[e,t]of n)this.g.setRequestHeader(e,t);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{jt(this),this.u=!0,this.g.send(e),this.u=!1}catch(e){Lt(this,e)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,te(this,"complete"),te(this,"abort"),$t(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$t(this,!0)),Nt.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?Mt(this):this.bb())},e.bb=function(){Mt(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<Ft(this)?this.g.status:-1}catch(e){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),le(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ht.prototype).la=8,e.G=1,e.connect=function(e,t,n,i){Ee(0),this.W=e,this.H=t||{},n&&void 0!==i&&(this.H.OSID=n,this.H.OAID=i),this.F=this.X,this.I=an(this,null,this.W),Kt(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const r=new Oe(this,this.j,e);let s=this.o;if(this.S&&(s?(s=_(s),b(s,this.S)):s=this.S),null!==this.m||this.O||(r.H=s,s=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var i=this.i[n];if(void 0===(i="__data__"in i.map&&"string"==typeof(i=i.map.__data__)?i.length:void 0))break;if(4096<(t+=i)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Xt(this,r,t),ot(n=nt(this.I),"RID",e),ot(n,"CVER",22),this.D&&ot(n,"X-HTTP-Session-Id",this.D),Jt(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(Rt(s)))+"&"+t:this.m&&Ot(n,this.m,s)),Xe(this.h,r),this.Ua&&ot(n,"TYPE","init"),this.P?(ot(n,"$req",t),ot(n,"SID","null"),r.T=!0,Le(r,n,null)):Le(r,n,t),this.G=2}}else 3==this.G&&(e?Gt(this,e):0==this.i.length||Ke(this.h)||Gt(this))},e.Fa=function(){if(this.u=null,en(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=Se(h(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ee(10),Wt(this),en(this))},e.Za=function(){null!=this.C&&(this.C=null,Wt(this),Zt(this),Ee(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),Ee(2)):(this.j.info("Failed to ping google.com"),Ee(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=hn.prototype).ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},u(ln,ee),ln.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ln.prototype.close=function(){zt(this.g)},ln.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.u&&((n={}).__data__=he(e),e=n);t.i.push(new We(t.Ya++,e)),3==t.G&&Kt(t)},ln.prototype.N=function(){this.g.l=null,delete this.j,zt(this.g),delete this.g,ln.aa.N.call(this)},u(un,ge),u(dn,me),u(pn,hn),pn.prototype.ua=function(){te(this.g,"a")},pn.prototype.ta=function(e){te(this.g,new un(e))},pn.prototype.sa=function(e){te(this.g,new dn)},pn.prototype.ra=function(){te(this.g,"b")},ln.prototype.send=ln.prototype.o,ln.prototype.open=ln.prototype.m,ln.prototype.close=ln.prototype.close,Pe.NO_ERROR=0,Pe.TIMEOUT=8,Pe.HTTP_ERROR=6,fe.OPEN="a",fe.CLOSE="b",fe.ERROR="c",fe.MESSAGE="d",ee.prototype.listen=ee.prototype.K,Nt.prototype.listenOnce=Nt.prototype.L,Nt.prototype.getLastError=Nt.prototype.Ka,Nt.prototype.getLastErrorCode=Nt.prototype.Ba,Nt.prototype.getStatus=Nt.prototype.Z,Nt.prototype.getResponseJson=Nt.prototype.Oa,Nt.prototype.getResponseText=Nt.prototype.oa,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Ha}).apply(void 0!==Ea?Ea:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Ta="@firebase/firestore",Sa="4.9.0";
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ka{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ka.UNAUTHENTICATED=new ka(null),ka.GOOGLE_CREDENTIALS=new ka("google-credentials-uid"),ka.FIRST_PARTY=new ka("first-party-uid"),ka.MOCK_USER=new ka("mock-user");
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
let Aa="12.0.0";
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Ca=new qn("@firebase/firestore");function Pa(e,...t){if(Ca.logLevel<=Bn.DEBUG){const n=t.map(Oa);Ca.debug(`Firestore (${Aa}): ${e}`,...n)}}function Ra(e,...t){if(Ca.logLevel<=Bn.ERROR){const n=t.map(Oa);Ca.error(`Firestore (${Aa}): ${e}`,...n)}}function Oa(e){if("string"==typeof e)return e;try{
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Na(e,t,n){let i="Unexpected state";"string"==typeof t?i=t:n=t,Da(e,i,n)}function Da(e,t,n){let i=`FIRESTORE (${Aa}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{i+=" CONTEXT: "+JSON.stringify(n)}catch(e){i+=" CONTEXT: "+n}throw Ra(i),new Error(i)}function xa(e,t,n,i){let r="Unexpected state";"string"==typeof n?r=n:i=n,e||Da(t,r,i)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const La="cancelled",Ua="invalid-argument",Ma="failed-precondition";class $a extends Sn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ja{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Fa{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ba{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ka.UNAUTHENTICATED))}shutdown(){}}class Va{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Ha{constructor(e){this.t=e,this.currentUser=ka.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){xa(void 0===this.o,42304);let n=this.i;const i=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let r=new ja;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new ja,e.enqueueRetryable(()=>i(this.currentUser))};const s=()=>{const t=r;e.enqueueRetryable(async()=>{await t.promise,await i(this.currentUser)})},o=e=>{Pa("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Pa("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new ja)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Pa("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(xa("string"==typeof t.accessToken,31837,{l:t}),new Fa(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xa(null===e||"string"==typeof e,2055,{h:e}),new ka(e)}}class za{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=ka.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Wa{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new za(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ka.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class qa{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ka{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ji(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){xa(void 0===this.o,3512);const n=e=>{null!=e.error&&Pa("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,Pa("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const i=e=>{Pa("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>i(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?i(e):Pa("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new qa(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(xa("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new qa(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ga(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ja{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Ga(40);for(let i=0;i<n.length;++i)t.length<20&&n[i]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[i]%62))}return t}}function Xa(e,t){return e<t?-1:e>t?1:0}const Ya=55296,Za=57343;function Qa(e){const t=e.charCodeAt(0);return t>=Ya&&t<=Za}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ec="__name__";class tc{constructor(e,t,n){void 0===t?t=0:t>e.length&&Na(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&Na(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===tc.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof tc?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const n=tc.compareSegments(e.get(i),t.get(i));if(0!==n)return n}return Xa(e.length,t.length)}static compareSegments(e,t){const n=tc.isNumericId(e),i=tc.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?tc.extractNumericId(e).compare(tc.extractNumericId(t)):function(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const n=e.charAt(i),r=t.charAt(i);if(n!==r)return Qa(n)===Qa(r)?Xa(n,r):Qa(n)?1:-1}return Xa(e.length,t.length)}(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ba.fromString(e.substring(4,e.length-2))}}class nc extends tc{construct(e,t,n){return new nc(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new $a(Ua,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new nc(t)}static emptyPath(){return new nc([])}}const ic=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class rc extends tc{construct(e,t,n){return new rc(e,t,n)}static isValidIdentifier(e){return ic.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),rc.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===ec}static keyField(){return new rc([ec])}static fromServerFormat(e){const t=[];let n="",i=0;const r=()=>{if(0===n.length)throw new $a(Ua,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;i<e.length;){const t=e[i];if("\\"===t){if(i+1===e.length)throw new $a(Ua,"Path has trailing escape character: "+e);const t=e[i+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new $a(Ua,"Path has invalid escape sequence: "+e);n+=t,i+=2}else"`"===t?(s=!s,i++):"."!==t||s?(n+=t,i++):(r(),i++)}if(r(),s)throw new $a(Ua,"Unterminated ` in path: "+e);return new rc(t)}static emptyPath(){return new rc([])}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class sc{constructor(e){this.path=e}static fromPath(e){return new sc(nc.fromString(e))}static fromName(e){return new sc(nc.fromString(e).popFirst(5))}static empty(){return new sc(nc.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===nc.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return nc.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new sc(new nc(e.slice()))}}function oc(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new $a(Ua,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":Na(12329,{type:typeof e})}(e);throw new $a(Ua,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ac(e,t){const n={typeString:e};return t&&(n.value=t),n}function cc(e,t){if(!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(e))throw new $a(Ua,"JSON must be an object");let n;for(const i in t)if(t[i]){const r=t[i].typeString,s="value"in t[i]?{value:t[i].value}:void 0;if(!(i in e)){n=`JSON missing required field: '${i}'`;break}const o=e[i];if(r&&typeof o!==r){n=`JSON field '${i}' must be a ${r}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${i}' field to equal '${s.value}'`;break}}if(n)throw new $a(Ua,n);return!0}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const hc=-62135596800,lc=1e6;class uc{static now(){return uc.fromMillis(Date.now())}static fromDate(e){return uc.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*lc);return new uc(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new $a(Ua,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new $a(Ua,"Timestamp nanoseconds out of range: "+t);if(e<hc)throw new $a(Ua,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new $a(Ua,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/lc}_compareTo(e){return this.seconds===e.seconds?Xa(this.nanoseconds,e.nanoseconds):Xa(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:uc._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(cc(e,uc._jsonSchema))return new uc(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-hc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}uc._jsonSchemaVersion="firestore/timestamp/1.0",uc._jsonSchema={type:ac("string",uc._jsonSchemaVersion),seconds:ac("number"),nanoseconds:ac("number")};
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class dc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class pc{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new dc("Invalid base64 string: "+e):e}}(e);return new pc(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new pc(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Xa(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pc.EMPTY_BYTE_STRING=new pc("");const fc="(default)";class gc{constructor(e,t){this.projectId=e,this.database=t||fc}static empty(){return new gc("","")}get isDefaultDatabase(){return this.database===fc}isEqual(e){return e instanceof gc&&e.projectId===this.projectId&&e.database===this.database}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class mc{constructor(e,t=null,n=[],i=[],r=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=r,this.limitType=s,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
var yc,wc;(wc=yc||(yc={}))[wc.OK=0]="OK",wc[wc.CANCELLED=1]="CANCELLED",wc[wc.UNKNOWN=2]="UNKNOWN",wc[wc.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",wc[wc.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",wc[wc.NOT_FOUND=5]="NOT_FOUND",wc[wc.ALREADY_EXISTS=6]="ALREADY_EXISTS",wc[wc.PERMISSION_DENIED=7]="PERMISSION_DENIED",wc[wc.UNAUTHENTICATED=16]="UNAUTHENTICATED",wc[wc.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",wc[wc.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",wc[wc.ABORTED=10]="ABORTED",wc[wc.OUT_OF_RANGE=11]="OUT_OF_RANGE",wc[wc.UNIMPLEMENTED=12]="UNIMPLEMENTED",wc[wc.INTERNAL=13]="INTERNAL",wc[wc.UNAVAILABLE=14]="UNAVAILABLE",wc[wc.DATA_LOSS=15]="DATA_LOSS",
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
new ba([4294967295,4294967295],0);function _c(){return"undefined"!=typeof document?document:null}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vc{constructor(e,t,n=1e3,i=1.5,r=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=i,this.R_=r,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-n);i>0&&Pa("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class bc{constructor(e,t,n,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=r,this.deferred=new ja,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,r){const s=Date.now()+n,o=new bc(e,t,s,i,r);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new $a(La,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Ic,Ec;(Ec=Ic||(Ic={})).Ma="default",Ec.Cache="cache";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Tc=new Map,Sc="firestore.googleapis.com",kc=!0;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ac{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new $a(Ua,"Can't provide ssl option if host option is not set");this.host=Sc,this.ssl=kc}else this.host=e.host,this.ssl=e.ssl??kc;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new $a(Ua,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,i){if(!0===t&&!0===i)throw new $a(Ua,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new $a(Ua,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new $a(Ua,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new $a(Ua,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Cc{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ac({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new $a(Ma,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new $a(Ma,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ac(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new Ba;switch(e.type){case"firstParty":return new Wa(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new $a(Ua,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Tc.get(e);t&&(Pa("ComponentProvider","Removing Datastore"),Tc.delete(e),t.terminate())}(this),Promise.resolve()}}function Pc(e,t,n,i={}){e=oc(e,Cc);const r=fn(t),s=e._getSettings(),o={...s,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;r&&(gn(`https://${a}`),_n("Firestore",!0)),s.host!==Sc&&s.host!==a&&function(e,...t){if(Ca.logLevel<=Bn.WARN){const n=t.map(Oa);Ca.warn(`Firestore (${Aa}): ${e}`,...n)}}("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:a,ssl:r,emulatorOptions:i};if(!Cn(c,o)&&(e._setSettings(c),i.mockUserToken)){let t,n;if("string"==typeof i.mockUserToken)t=i.mockUserToken,n=ka.MOCK_USER;else{t=mn(i.mockUserToken,e._app?.options.projectId);const r=i.mockUserToken.sub||i.mockUserToken.user_id;if(!r)throw new $a(Ua,"mockUserToken must contain 'sub' or 'user_id' field!");n=new ka(r)}e._authCredentials=new Va(new Fa(t,n))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Rc{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Rc(this.firestore,e,this._query)}}class Oc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Nc(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Oc(this.firestore,e,this._key)}toJSON(){return{type:Oc._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(cc(t,Oc._jsonSchema))return new Oc(e,n||null,new sc(nc.fromString(t.referencePath)))}}Oc._jsonSchemaVersion="firestore/documentReference/1.0",Oc._jsonSchema={type:ac("string",Oc._jsonSchemaVersion),referencePath:ac("string")};class Nc extends Rc{constructor(e,t,n){super(e,t,function(e){return new mc(e)}(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Oc(this.firestore,null,new sc(e))}withConverter(e){return new Nc(this.firestore,e,this._path)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Dc="AsyncQueue";class xc{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new vc(this,"async_queue_retry"),this._c=()=>{const e=_c();e&&Pa(Dc,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=_c();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=_c();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new ja;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!function(e){return"IndexedDbTransactionError"===e.name}(e))throw e;Pa(Dc,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,Ra("INTERNAL UNHANDLED ERROR: ",Lc(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=bc.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(i),i}uc(){this.nc&&Na(47125,{Pc:Lc(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Lc(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class Uc extends Cc{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new xc,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new xc(e),this._firestoreClient=void 0,await e}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Mc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Mc(pc.fromBase64String(e))}catch(e){throw new $a(Ua,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Mc(pc.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Mc._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(cc(e,Mc._jsonSchema))return Mc.fromBase64String(e.bytes)}}Mc._jsonSchemaVersion="firestore/bytes/1.0",Mc._jsonSchema={type:ac("string",Mc._jsonSchemaVersion),bytes:ac("string")};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class $c{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new $a(Ua,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new rc(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class jc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new $a(Ua,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new $a(Ua,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Xa(this._lat,e._lat)||Xa(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:jc._jsonSchemaVersion}}static fromJSON(e){if(cc(e,jc._jsonSchema))return new jc(e.latitude,e.longitude)}}jc._jsonSchemaVersion="firestore/geoPoint/1.0",jc._jsonSchema={type:ac("string",jc._jsonSchemaVersion),latitude:ac("number"),longitude:ac("number")};
/**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Fc{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Fc._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(cc(e,Fc._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Fc(e.vectorValues);throw new $a(Ua,"Expected 'vectorValues' field to be a number array")}}}Fc._jsonSchemaVersion="firestore/vectorValue/1.0",Fc._jsonSchema={type:ac("string",Fc._jsonSchemaVersion),vectorValues:ac("object")};const Bc=new RegExp("[~\\*/\\[\\]]");function Vc(e,t,n,i,r){let s=`Function ${t}() called with invalid data`;s+=". ";return new $a(Ua,s+e+"")}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Hc{constructor(e,t,n,i,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Oc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new zc(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Wc("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class zc extends Hc{data(){return super.data()}}function Wc(e,t){return"string"==typeof t?function(e,t){if(t.search(Bc)>=0)throw Vc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e);try{return new $c(...t.split("."))._internalPath}catch(n){throw Vc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e)}}(e,t):t instanceof $c?t._internalPath:t._delegate._internalPath}class qc{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kc extends Hc{constructor(e,t,n,i,r,s){super(e,t,n,i,s),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Gc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Wc("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new $a(Ma,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Kc._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}Kc._jsonSchemaVersion="firestore/documentSnapshot/1.0",Kc._jsonSchema={type:ac("string",Kc._jsonSchemaVersion),bundleSource:ac("string","DocumentSnapshot"),bundleName:ac("string"),bundle:ac("string")};class Gc extends Kc{data(e={}){return super.data(e)}}class Jc{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new qc(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Gc(this._firestore,this._userDataWriter,n.key,n,new qc(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new $a(Ua,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const i=new Gc(e._firestore,e._userDataWriter,n.doc.key,n.doc,new qc(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:i,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const i=new Gc(e._firestore,e._userDataWriter,t.doc.key,t.doc,new qc(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let r=-1,s=-1;return 0!==t.type&&(r=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:Xc(t.type),doc:i,oldIndex:r,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new $a(Ma,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Jc._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ja.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],i=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),i.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Xc(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Na(61501,{type:e})}}Jc._jsonSchemaVersion="firestore/querySnapshot/1.0",Jc._jsonSchema={type:ac("string",Jc._jsonSchemaVersion),bundleSource:ac("string","QuerySnapshot"),bundleName:ac("string"),bundle:ac("string")},function(e,t=!0){!function(e){Aa=e}(Zi),Ki(new Mn("firestore",(e,{instanceIdentifier:n,options:i})=>{const r=e.getProvider("app").getImmediate(),s=new Uc(new Ha(e.getProvider("auth-internal")),new Ka(r,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new $a(Ua,'"projectId" not provided in firebase.initializeApp.');return new gc(e.options.projectId,t)}(r,n),r);return i={useFetchStreams:t,...i},s._setSettings(i),s},"PUBLIC").setMultipleInstances(!0)),tr(Ta,Sa,e),tr(Ta,Sa,"esm2020")}();
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Yc="firebasestorage.googleapis.com",Zc="storageBucket";
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Qc extends Sn{constructor(e,t,n=0){super(nh(e),`Firebase Storage: ${t} (${nh(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Qc.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return nh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var eh,th;function nh(e){return"storage/"+e}function ih(){return new Qc(eh.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function rh(e){return new Qc(eh.INVALID_ARGUMENT,e)}function sh(){return new Qc(eh.APP_DELETED,"The Firebase app was deleted.")}function oh(e,t){return new Qc(eh.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function ah(e){throw new Qc(eh.INTERNAL_ERROR,"Internal error: "+e)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(eh||(eh={}));class ch{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=ch.makeFromUrl(e,t)}catch(t){return new ch(e,"")}if(""===n.path)return n;throw i=e,new Qc(eh.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+i+"'.");var i}static makeFromUrl(e,t){let n=null;const i="([A-Za-z0-9.\\-_]+)";const r=new RegExp("^gs://"+i+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:r,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${i}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${t===Yc?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${i}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<a.length;t++){const i=a[t],r=i.regex.exec(e);if(r){const e=r[i.indices.bucket];let t=r[i.indices.path];t||(t=""),n=new ch(e,t),i.postModify(n);break}}if(null==n)throw function(e){return new Qc(eh.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class hh{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function lh(e){return"string"==typeof e||e instanceof String}function uh(e){return dh()&&e instanceof Blob}function dh(){return"undefined"!=typeof Blob}function ph(e,t,n,i){if(i<t)throw rh(`Invalid value for '${e}'. Expected ${t} or greater.`);if(i>n)throw rh(`Invalid value for '${e}'. Expected ${n} or less.`)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function fh(e,t,n){let i=t;return null==n&&(i=`https://${t}`),`${n}://${i}/v0${e}`}function gh(e){const t=encodeURIComponent;let n="?";for(const i in e)if(e.hasOwnProperty(i)){n=n+(t(i)+"="+t(e[i]))+"&"}return n=n.slice(0,-1),n}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(th||(th={}));
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class mh{constructor(e,t,n,i,r,s,o,a,c,h,l,u=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=l,this.retry=u,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new yh(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const i=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(i),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(i),this.pendingConnection_=null;const t=n.getErrorCode()===th.NO_ERROR,r=n.getStatus();if(!t||
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(e,t){const n=e>=500&&e<600,i=-1!==[408,429].indexOf(e),r=-1!==t.indexOf(e);return n||i||r}(r,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===th.ABORT;return void e(!1,new yh(!1,null,t))}const s=-1!==this.successCodes_.indexOf(r);e(!0,new yh(s,n))})},t=(e,t)=>{const n=this.resolve_,i=this.reject_,r=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(r,r.getResponse());!
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(e){return void 0!==e}(e)?n():n(e)}catch(e){i(e)}else if(null!==r){const e=ih();e.serverResponse=r.getErrorText(),this.errorCallback_?i(this.errorCallback_(r,e)):i(e)}else if(t.canceled){i(this.appDelete_?sh():new Qc(eh.CANCELED,"User canceled the upload/download."))}else{i(new Qc(eh.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new yh(!1,null,!0)):this.backoffId_=function(e,t,n){let i=1,r=null,s=null,o=!1,a=0;function c(){return 2===a}let h=!1;function l(...e){h||(h=!0,t.apply(null,e))}function u(t){r=setTimeout(()=>{r=null,e(p,c())},t)}function d(){s&&clearTimeout(s)}function p(e,...t){if(h)return void d();if(e)return d(),void l.call(null,e,...t);if(c()||o)return d(),void l.call(null,e,...t);let n;i<64&&(i*=2),1===a?(a=2,n=0):n=1e3*(i+Math.random()),u(n)}let f=!1;function g(e){f||(f=!0,d(),h||(null!==r?(e||(a=2),clearTimeout(r),u(0)):e||(a=1)))}return u(0),s=setTimeout(()=>{o=!0,g(!0)},n),g}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class yh{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function wh(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function _h(...e){const t=wh();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(dh())return new Blob(e);throw new Qc(eh.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function vh(e){if("undefined"==typeof atob)throw t="base-64",new Qc(eh.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var t;return atob(e)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const bh="raw",Ih="base64",Eh="base64url",Th="data_url";class Sh{constructor(e,t){this.data=e,this.contentType=t||null}}function kh(e,t){switch(e){case bh:return new Sh(Ah(t));case Ih:case Eh:return new Sh(Ch(e,t));case Th:return new Sh(function(e){const t=new Ph(e);return t.base64?Ch(Ih,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw oh(Th,"Malformed data URL.")}return Ah(t)}(t.rest)}(t),new Ph(t).contentType)}throw ih()}function Ah(e){const t=[];for(let n=0;n<e.length;n++){let i=e.charCodeAt(n);if(i<=127)t.push(i);else if(i<=2047)t.push(192|i>>6,128|63&i);else if(55296==(64512&i)){if(n<e.length-1&&56320==(64512&e.charCodeAt(n+1))){i=65536|(1023&i)<<10|1023&e.charCodeAt(++n),t.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|63&i)}else t.push(239,191,189)}else 56320==(64512&i)?t.push(239,191,189):t.push(224|i>>12,128|i>>6&63,128|63&i)}return new Uint8Array(t)}function Ch(e,t){switch(e){case Ih:{const n=-1!==t.indexOf("-"),i=-1!==t.indexOf("_");if(n||i){throw oh(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case Eh:{const n=-1!==t.indexOf("+"),i=-1!==t.indexOf("/");if(n||i){throw oh(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=vh(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw oh(e,"Invalid character found")}const i=new Uint8Array(n.length);for(let e=0;e<n.length;e++)i[e]=n.charCodeAt(e);return i}class Ph{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw oh(Th,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){const n=e.length>=t.length;if(!n)return!1;return e.substring(e.length-t.length)===t}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class Rh{constructor(e,t){let n=0,i="";uh(e)?(this.data_=e,n=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(uh(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new Rh(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new Rh(n,!0)}}static getBlob(...e){if(dh()){const t=e.map(e=>e instanceof Rh?e.data_:e);return new Rh(_h.apply(null,t))}{const t=e.map(e=>lh(e)?kh(bh,e).data:e.data_);let n=0;t.forEach(e=>{n+=e.byteLength});const i=new Uint8Array(n);let r=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)i[r++]=e[t]}),new Rh(i,!0)}}uploadData(){return this.data_}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Oh(e){let t;try{t=JSON.parse(e)}catch(e){return null}return function(e){return"object"==typeof e&&!Array.isArray(e)}(t)?t:null}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Nh(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Dh(e,t){return t}class xh{constructor(e,t,n,i){this.server=e,this.local=t||e,this.writable=!!n,this.xform=i||Dh}}let Lh=null;function Uh(){if(Lh)return Lh;const e=[];e.push(new xh("bucket")),e.push(new xh("generation")),e.push(new xh("metageneration")),e.push(new xh("name","fullPath",!0));const t=new xh("name");t.xform=function(e,t){return function(e){return!lh(e)||e.length<2?e:Nh(e)}(t)},e.push(t);const n=new xh("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new xh("timeCreated")),e.push(new xh("updated")),e.push(new xh("md5Hash",null,!0)),e.push(new xh("cacheControl",null,!0)),e.push(new xh("contentDisposition",null,!0)),e.push(new xh("contentEncoding",null,!0)),e.push(new xh("contentLanguage",null,!0)),e.push(new xh("contentType",null,!0)),e.push(new xh("metadata","customMetadata",!0)),Lh=e,Lh}function Mh(e,t,n){const i={type:"file"},r=n.length;for(let e=0;e<r;e++){const r=n[e];i[r.local]=r.xform(i,t[r.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,i=e.fullPath,r=new ch(n,i);return t._makeStorageReference(r)}})}(i,e),i}function $h(e,t,n){const i=Oh(t);if(null===i)return null;return Mh(e,i,n)}function jh(e,t){const n={},i=t.length;for(let r=0;r<i;r++){const i=t[r];i.writable&&(n[i.server]=e[i.local])}return JSON.stringify(n)}class Fh{constructor(e,t,n,i){this.url=e,this.method=t,this.handler=n,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Bh(e){if(!e)throw ih()}function Vh(e,t){return function(n,i){const r=$h(e,i,t);return Bh(null!==r),r}}function Hh(e,t){return function(n,i){const r=$h(e,i,t);return Bh(null!==r),function(e,t,n,i){const r=Oh(t);if(null===r)return null;if(!lh(r.downloadTokens))return null;const s=r.downloadTokens;if(0===s.length)return null;const o=encodeURIComponent;return s.split(",").map(t=>{const r=e.bucket,s=e.fullPath;return fh("/b/"+o(r)+"/o/"+o(s),n,i)+gh({alt:"media",token:t})})[0]}(r,i,e.host,e._protocol)}}function zh(e){return function(t,n){let i;var r,s;return 401===t.getStatus()?i=t.getErrorText().includes("Firebase App Check token is invalid")?new Qc(eh.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new Qc(eh.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(s=e.bucket,i=new Qc(eh.QUOTA_EXCEEDED,"Quota for bucket '"+s+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(r=e.path,i=new Qc(eh.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")):i=n,i.status=t.getStatus(),i.serverResponse=n.serverResponse,i}}function Wh(e){const t=zh(e);return function(n,i){let r=t(n,i);var s;return 404===n.getStatus()&&(s=e.path,r=new Qc(eh.OBJECT_NOT_FOUND,"Object '"+s+"' does not exist.")),r.serverResponse=i.serverResponse,r}}function qh(e,t,n,i,r){const s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};const a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+a;const c=function(e,t,n){const i=Object.assign({},n);return i.fullPath=e.path,i.size=t.size(),i.contentType||(i.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),i}(t,i,r),h="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+jh(c,n)+"\r\n--"+a+"\r\nContent-Type: "+c.contentType+"\r\n\r\n",l="\r\n--"+a+"--",u=Rh.getBlob(h,i,l);if(null===u)throw new Qc(eh.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");const d={name:c.fullPath},p=fh(s,e.host,e._protocol),f=e.maxUploadRetryTime,g=new Fh(p,"POST",Vh(e,n),f);return g.urlParams=d,g.headers=o,g.body=u.uploadData(),g.errorHandler=zh(t),g}class Kh{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=th.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=th.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=th.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,i,r){if(this.sent_)throw ah("cannot .send() more than once");if(fn(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(const e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==i?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ah("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ah("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw ah("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ah("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class Gh extends Kh{initXhr(){this.xhr_.responseType="text"}}function Jh(){return new Gh}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Xh{constructor(e,t){this._service=e,this._location=t instanceof ch?t:ch.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Xh(e,t)}get root(){const e=new ch(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Nh(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new ch(this._location.bucket,e);return new Xh(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new Qc(eh.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Yh(e,t){e._throwIfRoot("updateMetadata");const n=function(e,t,n,i){const r=fh(t.fullServerUrl(),e.host,e._protocol),s=jh(n,i),o=e.maxOperationRetryTime,a=new Fh(r,"PATCH",Vh(e,i),o);return a.headers={"Content-Type":"application/json; charset=utf-8"},a.body=s,a.errorHandler=Wh(t),a}(e.storage,e._location,t,Uh());return e.storage.makeRequestWithTokens(n,Jh)}function Zh(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const i=fh(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,s=new Fh(i,"GET",Hh(e,n),r);return s.errorHandler=Wh(t),s}(e.storage,e._location,Uh());return e.storage.makeRequestWithTokens(t,Jh).then(e=>{if(null===e)throw new Qc(eh.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}function Qh(e,t){if(e instanceof nl){const n=e;if(null==n._bucket)throw new Qc(eh.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Zc+"' property when initializing the app?");const i=new Xh(n,n._bucket);return null!=t?Qh(i,t):i}return void 0!==t?function(e,t){const n=function(e,t){const n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),i=new ch(e._location.bucket,n);return new Xh(e.storage,i)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e,t):e}function el(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof nl)return new Xh(e,t);throw rh("To use ref(service, url), the first argument must be a Storage instance.")}return Qh(e,t)}function tl(e,t){const n=t?.[Zc];return null==n?null:ch.makeFromBucketSpec(n,e)}class nl{constructor(e,t,n,i,r,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=s,this._bucket=null,this._host=Yc,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=i?ch.makeFromBucketSpec(i,this._host):tl(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=ch.makeFromBucketSpec(this._url,e):this._bucket=tl(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ph("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ph("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(Ji(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Xh(this,e)}_makeRequest(e,t,n,i,r=!0){if(this._deleted)return new hh(sh());{const s=function(e,t,n,i,r,s,o=!0,a=!1){const c=gh(e.urlParams),h=e.url+c,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,s),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,i),new mh(h,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,o,a)}(e,this._appId,n,i,t,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){const[n,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,i).getPromise()}}const il="@firebase/storage",rl="0.14.0",sl="storage";function ol(e,t,n){return function(e,t,n){e._throwIfRoot("uploadBytes");const i=qh(e.storage,e._location,Uh(),new Rh(t,!0),n);return e.storage.makeRequestWithTokens(i,Jh).then(t=>({metadata:t,ref:e}))}(e=Un(e),t,n)}function al(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new nl(n,i,r,t,Zi)}Ki(new Mn(sl,al,"PUBLIC").setMultipleInstances(!0)),tr(il,rl,""),tr(il,rl,"esm2020");const cl="@firebase/installations",hl="0.6.19",ll=1e4,ul=`w:${hl}`,dl="FIS_v2",pl=36e5,fl=new kn("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function gl(e){return e instanceof Sn&&e.code.includes("request-failed")}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ml({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function yl(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function wl(e,t){const n=(await t.json()).error;return fl.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function _l({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function vl(e,{refreshToken:t}){const n=_l(e);return n.append("Authorization",function(e){return`${dl} ${e}`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(t)),n}async function bl(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function Il(e){return new Promise(t=>{setTimeout(t,e)})}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const El=/^[cdef][\w-]{21}$/;function Tl(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e);return El.test(t)?t:""}catch{return""}}function Sl(e){return`${e.appName}!${e.appId}`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const kl=new Map;function Al(e,t){const n=Sl(e);Cl(n,t),function(e,t){const n=function(){!Pl&&"BroadcastChannel"in self&&(Pl=new BroadcastChannel("[Firebase] FID Change"),Pl.onmessage=e=>{Cl(e.data.key,e.data.fid)});return Pl}();n&&n.postMessage({key:e,fid:t});0===kl.size&&Pl&&(Pl.close(),Pl=null)}(n,t)}function Cl(e,t){const n=kl.get(e);if(n)for(const e of n)e(t)}let Pl=null;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Rl="firebase-installations-store";let Ol=null;function Nl(){return Ol||(Ol=si("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(Rl)}})),Ol}async function Dl(e,t){const n=Sl(e),i=(await Nl()).transaction(Rl,"readwrite"),r=i.objectStore(Rl),s=await r.get(n);return await r.put(t,n),await i.done,s&&s.fid===t.fid||Al(e,t.fid),t}async function xl(e){const t=Sl(e),n=(await Nl()).transaction(Rl,"readwrite");await n.objectStore(Rl).delete(t),await n.done}async function Ll(e,t){const n=Sl(e),i=(await Nl()).transaction(Rl,"readwrite"),r=i.objectStore(Rl),s=await r.get(n),o=t(s);return void 0===o?await r.delete(n):await r.put(o,n),await i.done,!o||s&&s.fid===o.fid||Al(e,o.fid),o}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ul(e){let t;const n=await Ll(e.appConfig,n=>{const i=function(e){const t=e||{fid:Tl(),registrationStatus:0};return jl(t)}(n),r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(fl.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=ml(e),r=_l(e),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const o={fid:n,authVersion:dl,appId:e.appId,sdkVersion:ul},a={method:"POST",headers:r,body:JSON.stringify(o)},c=await bl(()=>fetch(i,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:yl(e.authToken)}}throw await wl("Create Installation",c)}(e,t);return Dl(e.appConfig,n)}catch(n){throw gl(n)&&409===n.customData.serverCode?await xl(e.appConfig):await Dl(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Ml(e)}:{installationEntry:t}}(e,i);return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Ml(e){let t=await $l(e.appConfig);for(;1===t.registrationStatus;)await Il(100),t=await $l(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Ul(e);return n||t}return t}function $l(e){return Ll(e,e=>{if(!e)throw fl.create("installation-not-found");return jl(e)})}function jl(e){return 1===(t=e).registrationStatus&&t.registrationTime+ll<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}async function Fl({appConfig:e,heartbeatServiceProvider:t},n){const i=function(e,{fid:t}){return`${ml(e)}/${t}/authTokens:generate`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e,n),r=vl(e,n),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const o={installation:{sdkVersion:ul,appId:e.appId}},a={method:"POST",headers:r,body:JSON.stringify(o)},c=await bl(()=>fetch(i,a));if(c.ok){return yl(await c.json())}throw await wl("Generate Auth Token",c)}async function Bl(e,t=!1){let n;const i=await Ll(e.appConfig,i=>{if(!Hl(i))throw fl.create("not-registered");const r=i.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+pl}(e)}(r))return i;if(1===r.requestStatus)return n=async function(e,t){let n=await Vl(e.appConfig);for(;1===n.authToken.requestStatus;)await Il(100),n=await Vl(e.appConfig);const i=n.authToken;return 0===i.requestStatus?Bl(e,t):i}(e,t),i;{if(!navigator.onLine)throw fl.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(i);return n=async function(e,t){try{const n=await Fl(e,t),i={...t,authToken:n};return await Dl(e.appConfig,i),n}catch(n){if(!gl(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await Dl(e.appConfig,n)}else await xl(e.appConfig);throw n}}(e,t),t}});return n?await n:i.authToken}function Vl(e){return Ll(e,e=>{if(!Hl(e))throw fl.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+ll<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */})}function Hl(e){return void 0!==e&&2===e.registrationStatus}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function zl(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await Ul(e);t&&await t}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(n);return(await Bl(n,t)).token}function Wl(e){return fl.create("missing-app-config-values",{valueName:e})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ql="installations",Kl=e=>{const t=Gi(e.getProvider("app").getImmediate(),ql).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:i}=await Ul(t);return i?i.catch(console.error):Bl(t).catch(console.error),n.fid}(t),getToken:e=>zl(t,e)}};Ki(new Mn(ql,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Wl("App Configuration");if(!e.name)throw Wl("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Wl(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Gi(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),Ki(new Mn("installations-internal",Kl,"PRIVATE")),tr(cl,hl),tr(cl,hl,"esm2020");
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Gl="analytics",Jl="https://www.googletagmanager.com/gtag/js",Xl=new qn("@firebase/analytics"),Yl=new kn("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function Zl(e){if(!e.startsWith(Jl)){const t=Yl.create("invalid-gtag-resource",{gtagURL:e});return Xl.warn(t.message),""}return e}function Ql(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function eu(e,t){const n=function(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}("firebase-js-sdk-policy",{createScriptURL:Zl}),i=document.createElement("script"),r=`${Jl}?l=${e}&id=${t}`;i.src=n?n?.createScriptURL(r):r,i.async=!0,document.head.appendChild(i)}function tu(e,t,n,i){return async function(r,...s){try{if("event"===r){const[i,r]=s;await async function(e,t,n,i,r){try{let s=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const i=await Ql(n);for(const n of e){const e=i.find(e=>e.measurementId===n),r=e&&t[e.appId];if(!r){s=[];break}s.push(r)}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",i,r||{})}catch(e){Xl.error(e)}}(e,t,n,i,r)}else if("config"===r){const[r,o]=s;await async function(e,t,n,i,r,s){const o=i[r];try{if(o)await t[o];else{const e=(await Ql(n)).find(e=>e.measurementId===r);e&&await t[e.appId]}}catch(e){Xl.error(e)}e("config",r,s)}(e,t,n,i,r,o)}else if("consent"===r){const[t,n]=s;e("consent",t,n)}else if("get"===r){const[t,n,i]=s;e("get",t,n,i)}else if("set"===r){const[t]=s;e("set",t)}else e(r,...s)}catch(e){Xl.error(e)}}}const nu=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function iu(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function ru(e,t=nu,n){const{appId:i,apiKey:r,measurementId:s}=e.options;if(!i)throw Yl.create("no-app-id");if(!r){if(s)return{measurementId:s,appId:i};throw Yl.create("no-api-key")}const o=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new ou;return setTimeout(async()=>{a.abort()},6e4),su({appId:i,apiKey:r,measurementId:s},o,a,t)}async function su(e,{throttleEndTimeMillis:t,backoffCount:n},i,r=nu){const{appId:s,measurementId:o}=e;try{await function(e,t){return new Promise((n,i)=>{const r=Math.max(t-Date.now(),0),s=setTimeout(n,r);e.addEventListener(()=>{clearTimeout(s),i(Yl.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}(i,t)}catch(e){if(o)return Xl.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${e?.message}]`),{appId:s,measurementId:o};throw e}try{const t=await async function(e){const{appId:t,apiKey:n}=e,i={method:"GET",headers:iu(n)},r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",t),s=await fetch(r,i);if(200!==s.status&&304!==s.status){let e="";try{const t=await s.json();t.error?.message&&(e=t.error.message)}catch(e){}throw Yl.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}(e);return r.deleteThrottleMetadata(s),t}catch(t){const a=t;if(!function(e){if(!(e instanceof Sn&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(a)){if(r.deleteThrottleMetadata(s),o)return Xl.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:s,measurementId:o};throw t}const c=503===Number(a?.customData?.httpStatus)?Ln(n,r.intervalMillis,30):Ln(n,r.intervalMillis),h={throttleEndTimeMillis:Date.now()+c,backoffCount:n+1};return r.setThrottleMetadata(s,h),Xl.debug(`Calling attemptFetch again in ${c} millis`),su(e,h,i,r)}}class ou{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function au(e,t,n,i,r,s,o){const a=ru(e);a.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Xl.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Xl.error(e)),t.push(a);const c=
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function(){if(!In())return Xl.warn(Yl.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await En()}catch(e){return Xl.warn(Yl.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}().then(e=>e?i.getId():void 0),[h,l]=await Promise.all([a,c]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Jl)&&n.src.includes(e))return n;return null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */)(s)||eu(s,h.measurementId),r("js",new Date);const u=o?.config??{};return u.origin="firebase",u.update=!0,null!=l&&(u.firebase_id=l),r("config",h.measurementId,u),h.measurementId}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class cu{constructor(e){this.app=e}_delete(){return delete hu[this.app.options.appId],Promise.resolve()}}let hu={},lu=[];const uu={};let du,pu,fu="dataLayer",gu=!1;function mu(e,t,n){!function(){const e=[];if(bn()&&e.push("This is a browser extension environment."),Tn()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=Yl.create("invalid-analytics-context",{errorInfo:t});Xl.warn(n.message)}}();const i=e.options.appId;if(!i)throw Yl.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Yl.create("no-api-key");Xl.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=hu[i])throw Yl.create("already-exists",{id:i});if(!gu){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(fu);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,i,r){let s=function(...e){window[i].push(arguments)};return window[r]&&"function"==typeof window[r]&&(s=window[r]),window[r]=tu(s,e,t,n),{gtagCore:s,wrappedGtag:window[r]}}(hu,lu,uu,fu,"gtag");pu=e,du=t,gu=!0}hu[i]=au(e,lu,uu,t,du,fu,n);return new cu(e)}function yu(e=er()){const t=Gi(e=Un(e),Gl);return t.isInitialized()?t.getImmediate():function(e,t={}){const n=Gi(e,Gl);if(n.isInitialized()){const e=n.getImmediate();if(Cn(t,n.getOptions()))return e;throw Yl.create("already-initialized")}const i=n.initialize({options:t});return i}(e)}function wu(e,t,n,i){e=Un(e),async function(e,t,n,i,r){if(r&&r.global)e("event",n,i);else{const r=await t;e("event",n,{...i,send_to:r})}}(pu,hu[e.app.options.appId],t,n,i).catch(e=>Xl.error(e))}const _u="@firebase/analytics",vu="0.10.18";Ki(new Mn(Gl,(e,{options:t})=>mu(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),Ki(new Mn("analytics-internal",function(e){try{const t=e.getProvider(Gl).getImmediate();return{logEvent:(e,n,i)=>wu(t,e,n,i)}}catch(e){throw Yl.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),tr(_u,vu),tr(_u,vu,"esm2020");
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const bu="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Iu="google.c.a.c_id",Eu=1e4;var Tu,Su;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function ku(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Au(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(Tu||(Tu={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(Su||(Su={}));const Cu="fcm_token_details_db",Pu="fcm_token_object_Store";
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Ru="firebase-messaging-store";let Ou=null;function Nu(){return Ou||(Ou=si("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(Ru)}})),Ou}async function Du(e){const t=Lu(e),n=await Nu(),i=await n.transaction(Ru).objectStore(Ru).get(t);if(i)return i;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(Cu))return null}let t=null;return(await si(Cu,5,{upgrade:async(n,i,r,s)=>{if(i<2)return;if(!n.objectStoreNames.contains(Pu))return;const o=s.objectStore(Pu),a=await o.index("fcmSenderId").get(e);if(await o.clear(),a)if(2===i){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:ku(e.vapidKey)}}}else if(3===i){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ku(e.auth),p256dh:ku(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ku(e.vapidKey)}}}else if(4===i){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ku(e.auth),p256dh:ku(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ku(e.vapidKey)}}}}})).close(),await oi(Cu),await oi("fcm_vapid_details_db"),await oi("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await xu(e,t),t}}async function xu(e,t){const n=Lu(e),i=(await Nu()).transaction(Ru,"readwrite");return await i.objectStore(Ru).put(t,n),await i.done,t}function Lu({appConfig:e}){return e.appId}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Uu=new kn("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function Mu({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function $u({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function ju({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const r={web:{endpoint:n,auth:t,p256dh:e}};return i!==bu&&(r.web.applicationPubKey=i),r}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Fu(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Au(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ku(t.getKey("auth")),p256dh:ku(t.getKey("p256dh"))},i=await Du(e.firebaseDependencies);if(i){if(function(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,r=t.auth===e.auth,s=t.p256dh===e.p256dh;return n&&i&&r&&s}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await $u(e),i=ju(t.subscriptionOptions),r={method:"PATCH",headers:n,body:JSON.stringify(i)};let s;try{const n=await fetch(`${Mu(e.appConfig)}/${t.token}`,r);s=await n.json()}catch(e){throw Uu.create("token-update-failed",{errorInfo:e?.toString()})}if(s.error){const e=s.error.message;throw Uu.create("token-update-failed",{errorInfo:e})}if(!s.token)throw Uu.create("token-update-no-token");return s.token}(e.firebaseDependencies,t),i={...t,token:n,createTime:Date.now()};return await xu(e.firebaseDependencies,i),n}catch(e){throw e}}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await async function(e,t){const n={method:"DELETE",headers:await $u(e)};try{const i=await fetch(`${Mu(e.appConfig)}/${t}`,n),r=await i.json();if(r.error){const e=r.error.message;throw Uu.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw Uu.create("token-unsubscribe-failed",{errorInfo:e?.toString()})}}(e.firebaseDependencies,i.token)}catch(e){console.warn(e)}return Bu(e.firebaseDependencies,n)}return Bu(e.firebaseDependencies,n)}async function Bu(e,t){const n=
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */await async function(e,t){const n=await $u(e),i=ju(t),r={method:"POST",headers:n,body:JSON.stringify(i)};let s;try{const t=await fetch(Mu(e.appConfig),r);s=await t.json()}catch(e){throw Uu.create("token-subscribe-failed",{errorInfo:e?.toString()})}if(s.error){const e=s.error.message;throw Uu.create("token-subscribe-failed",{errorInfo:e})}if(!s.token)throw Uu.create("token-subscribe-no-token");return s.token}(e,t),i={token:n,createTime:Date.now(),subscriptionOptions:t};return await xu(e,i),i.token}function Vu(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const r=t.notification.image;r&&(e.notification.image=r);const s=t.notification.icon;s&&(e.notification.icon=s)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const i=t.fcmOptions?.analytics_label;i&&(e.fcmOptions.analyticsLabel=i)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(t,e),t}function Hu(e){return Uu.create("missing-app-config-values",{valueName:e})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class zu{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(e){if(!e||!e.options)throw Hu("App Configuration Object");if(!e.name)throw Hu("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw Hu(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Wu(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const i=setTimeout(()=>n(new Error("Service worker not registered after 10000 ms")),Eu),r=e.installing||e.waiting;e.active?(clearTimeout(i),t()):r?r.onstatechange=e=>{"activated"===e.target?.state&&(r.onstatechange=null,clearTimeout(i),t())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(e.swRegistration)}catch(e){throw Uu.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function qu(e,t){if(!navigator)throw Uu.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw Uu.create("permission-blocked");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=bu)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await Wu(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw Uu.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),Fu(e)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ku(e,t,n){const i=function(e){switch(e){case Su.NOTIFICATION_CLICKED:return"notification_open";case Su.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Iu],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function Gu(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===Su.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(Vu(n)):e.onMessageHandler.next(Vu(n)));const i=n.data;var r;"object"==typeof(r=i)&&r&&Iu in r&&"1"===i["google.c.a.e"]&&await Ku(e,n.messageType,i)}const Ju="@firebase/messaging",Xu="0.12.23",Yu=e=>{const t=new zu(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>Gu(t,e)),t},Zu=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>qu(t,e)}};Ki(new Mn("messaging",Yu,"PUBLIC")),Ki(new Mn("messaging-internal",Zu,"PRIVATE")),tr(Ju,Xu),tr(Ju,Xu,"esm2020");const Qu=Qi({appId:connect.appId,apiKey:connect.apiKey,authDomain:connect.authDomain,databaseURL:connect.databaseURL,projectId:connect.projectId,storageBucket:connect.storageBucket,messagingSenderId:connect.messagingSenderId,measurementId:connect.measurementId});!function(e){const t="object"==typeof e?e:er(),n="string"==typeof e?e:fc,i=Gi(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const e=ln("firestore");e&&Pc(i,...e)}}(Qu);const ed=function(e=er(),t){const n=Gi(e=Un(e),sl).getImmediate({identifier:t}),i=ln("storage");return i&&function(e,t,n,i={}){!function(e,t,n,i={}){e.host=`${t}:${n}`;const r=fn(t);r&&(gn(`https://${e.host}/b`),_n("Storage",!0)),e._isUsingEmulator=!0,e._protocol=r?"https":"http";const{mockUserToken:s}=i;s&&(e._overrideAuthToken="string"==typeof s?s:mn(s,e.app.options.projectId))}(e,t,n,i)}(n,...i),n}(Qu),td=_a(Qu),nd=td.currentUser;let id;console.log("user 1: ",nd),console.log("auth: ",td),_a().useDeviceLanguage(),(async()=>{
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */await async function(){try{await En()}catch(e){return!1}return"undefined"!=typeof window&&In()&&Tn()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}()?(console.log("Firebase Analytics Supported"),id=yu(Qu)):console.log("Firebase Analytics is not supported in this environment.")})();let rd=!1;window.addEventListener("userEmailChanged",e=>{console.log("Custom event received: Email changed to",e.detail.email),rd=!0}),function(e,t,n,i){Un(e).onAuthStateChanged(t,n,i)}(td,e=>{e?(console.log("user 2: ",e),Xt.dispatch(Dt(!0)),Xt.dispatch(Lt()),Xt.dispatch(Ht(e.uid)),Xt.dispatch(Gt(e.isAnonymous)),Xt.dispatch(zt(e.displayName||"John Doe")),Xt.dispatch(qt(e.email||"Nothing")),Xt.dispatch(Kt(e.photoURL||"images/empty.jpg")),Xt.dispatch(Wt(e.phoneNumber||"(000) 000-0000")),Xt.dispatch(Nt(e.displayName||"John Doe")),rd&&!e.emailVerified?oo(e).then(()=>{console.log("Verification email sent to:",e.email),rd=!1}).catch(e=>{console.error("Error sending verification email:",e.message),rd=!1}):e.emailVerified?console.log("User's email is already verified:",e.email):console.log("User signed in, no email verification pending:",e.email)):(console.log("logged out"),Xt.dispatch(Dt(!1)),Xt.dispatch(Ht("")),Xt.dispatch(Gt(!1)),Xt.dispatch(zt("John Doe")),Xt.dispatch(qt("Nothing")),Xt.dispatch(Kt("images/empty.jpg")),Xt.dispatch(Wt("(000) 000-0000")),Xt.dispatch(Nt("John Doe")))});const sd=async()=>function(e){return Un(e).signOut()}(td),od=async(e,t)=>{const n=Ws.credential(e,t);await async function(e,t){return ro(Ts(e),t)}(td,n).then(e=>{console.log(e)}).catch(e=>{console.log(e)})},ad=async(e,t)=>{await so(td,e,t).then(e=>{console.log("User created: ",e.user);oo(e.user).then(()=>{console.log("Verification email sent.")})}).then(()=>{(async()=>{wu(id,"create_account")})()})};var cd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};e.UserDrawer=class extends(pe(Xt)(oe)){constructor(){super(),this._subscribe=!1,this._log=!1,this._sign=!1}firstUpdated(){this.querySelectorAll("form").forEach(e=>{e.preventDefault()}),this.shadowRoot.querySelector(".sign").addEventListener("click",()=>{Xt.dispatch(xt())}),this.shadowRoot.querySelector(".new").addEventListener("click",()=>{Xt.dispatch(Ut())}),this.shadowRoot.querySelector(".login").addEventListener("click",()=>{this._signIn()}),this.shadowRoot.querySelector(".newUser").addEventListener("click",()=>{this._signUp()}),this.shadowRoot.querySelector(".leave").addEventListener("click",()=>{sd()})}stateChanged(e){this._subscribe=e.frontend.drawer,this._log=e.frontend.login,this._sign=e.frontend.register}static get styles(){return[Qt,en,Yt]}render(){return V`<div class="visibility userDrawer" ?on="${!0===this._subscribe}"><div class="exit"><div></div><h3>${this._log?"ACCOUNT":"SUBSCRIBE"}</h3><button class="sign">${Zt}</button></div><div class="spec" ?on="${!1===this._log}"><p><button class="new">${this._sign?"create a new account":"sign-in"}</button></p><form id="pwa-signin" @submit="${this._handleSubmit}" autocomplete="on" class="spec" ?on="${!0===this._sign}"><ul><li class="inpat"><label><input id="txtEmail" type="email">Email</label> <label><input id="txtPassword" type="password">Password</label></li><li><button class="login action-button">Sign in</button></li></ul></form><form id="pwa-signup" @submit="${this._handleSubmit}" autocomplete="on" class="spec" ?on="${!1===this._sign}"><ul><li class="inpat"><label><input id="newEmail" type="email">Email</label> <label><input id="newPassword" type="password">Password</label></li><li><button class="newUser action-button">Sign up</button></li></ul></form></div><div class="spec setLog" ?on="${!0===this._log}"><slot></slot><p><a href="/settings">Settings</a></p><p><a class="leave" aria-label="log out">log out</a></p></div></div>`}_handleSubmit(e){e.preventDefault()}_signIn(){console.log("clicked");const e=this.shadowRoot.getElementById("txtEmail"),t=this.shadowRoot.getElementById("txtPassword");e.length<4?alert("Please enter an email address."):t.length<4?alert("Please enter a password."):od(e.value,t.value)}_signUp(){const e=this.shadowRoot.getElementById("newEmail"),t=this.shadowRoot.getElementById("newPassword");console.log(e),e.length<4?alert("Please enter an email address."):t.length<4?alert("Please enter a password."):ad(e.value,t.value)}},cd([de()],e.UserDrawer.prototype,"_subscribe",void 0),cd([de()],e.UserDrawer.prototype,"_log",void 0),cd([de()],e.UserDrawer.prototype,"_sign",void 0),e.UserDrawer=cd([ce("user-drawer")],e.UserDrawer);const hd=o`nav>ul{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-gap:8px;margin:0;padding:0}nav>ul>li>button{color:var(--pwa_nav);border:0;width:100%;height:36px;margin:auto;padding:0;font-weight:800;font-size:.8em;border-radius:5px;background-color:transparent}nav>ul>li>button[on]{color:var(--pwa_nav_select)}nav>ul>li>button:hover{cursor:pointer}@media (max-width:460px){button[value=email],button[value=profile]{text-align:left}button[value=delete],button[value=password]{text-align:right}}`,ld=o`input[type=password],input[type=text]{box-sizing:border-box;-webkit-box-sizing:border-box;height:50px;text-align:left;margin:0 3px 0 3px;padding:14px 20px;background-color:var(--pwa_input_background);border:0;border-radius:4px;-webkit-border-radius:4px;font-size:smaller;box-shadow:1px 1px 1px grey}`,ud=o`label{color:var(--pwa_label_text_color);box-sizing:border-box;width:100%;font-size:smaller;margin:auto;margin-bottom:0;font-weight:700;height:36px;line-height:36px}`,dd=o`.action-button:focus,.topButton:focus{outline:0}.action-button{display:inline-block;box-sizing:border-box;white-space:nowrap;margin:10px 3px 10px auto;font-weight:400;text-align:center;vertical-align:middle;touch-action:manipulation;-webkit-appearance:button;cursor:pointer;font-size:16px;height:38px;line-height:16px;padding:10px 16px;border-radius:6px;color:var(--pwa_action_text_color);background-color:var(--pwa_action_background_color);border-color:var(--pwa_action_border_color);box-shadow:1px 1px 1px grey}`;var pd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class fd extends(pe(Xt)(oe)){constructor(){super(),this.value="",this._user=!1,this.alertProfile=async()=>{const e=this.shadowRoot.querySelector("#pwa-name");if(this._user){const t=_a();await ao(t.currentUser,{displayName:e.value}).then(()=>{Xt.dispatch(zt(e.value))}).then(()=>{alert("updated name:"+e.value)})}else alert("Please Login")}}firstUpdated(e){this.shadowRoot.querySelector(".save").addEventListener("click",e=>{e.preventDefault(),console.log("save click"),this.alertProfile()})}stateChanged(e){this._user=e.frontend.login,this.value=e.frontend.name}static get styles(){return[ud,ld,dd,o`:host{display:grid;grid-template-rows:auto auto}`]}render(){return V`<label for="pwa-name">Name:</label> <input id="pwa-name" type="text" data-label="Contact Name" value="${this.value}"> <button class="action-button save">save</button>`}}pd([ue({type:String,reflect:!0})],fd.prototype,"value",void 0),pd([de()],fd.prototype,"_user",void 0),customElements.define("input-name",fd);var gd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class md extends(pe(Xt)(oe)){constructor(){super(),this.email="",this.mail="",this.saveEmail=async()=>{if(td.currentUser){let e=this.shadowRoot?.querySelector("#pwa-email");console.log(e),console.log(e),await function(e,t){const n=Un(e);return Ji(n.auth.app)?Promise.reject(vr(n.auth)):co(n,t,null)}(td.currentUser,e.value).catch(e=>{console.log(e)});const t=new CustomEvent("userEmailChanged",{detail:{email:e.value}});window.dispatchEvent(t),alert("Email Updated")}}}stateChanged(e){this.mail=e.backend.email}static get styles(){return[ud,ld,dd,o`:host{display:grid}`]}render(){return V`<label for="pwa-email">E-mail:</label> <input id="pwa-email" type="text" class="email" type="email" data-label="Account Email" placeholder="${this.mail}"> <button class="action-button" @click="${this.saveEmail}">Update</button>`}}gd([ue({type:String,reflect:!0})],md.prototype,"email",void 0),gd([de()],md.prototype,"mail",void 0),customElements.define("contact-email",md);var yd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class wd extends(pe(Xt)(oe)){constructor(){super(),this.photo="",this.user="",this.dispatchPhoto=async e=>{td.currentUser&&(await ao(td.currentUser,{photoURL:e}).catch(e=>{console.log(e)}),Xt.dispatch(Kt(e)))}}stateChanged(e){this.user=e.backend.userId,this.photo=e.backend.photoURL}firstUpdated(e){console.log("contractor photo: ",this.photo)}static get styles(){return o`:host{box-sizing:border-box;-webkit-box-sizing:border-box;display:grid;grid-template-columns:1fr;grid-gap:4px;width:100%;border-top:2px solid var(--pwa_divider)}.contractorPhoto{border-radius:50%;overflow:hidden;margin:auto;border:2px solid #303030;box-shadow:1px 1px 2px #000,0 0 25px grey,0 0 5px #fff}label{color:var(--pwa_label_text_color);box-sizing:border-box;width:100%;font-size:smaller;margin:auto;margin-bottom:0;font-weight:700}`}render(){return V`<input id="photoURL" type="file" name="photoURL" class="contractorPhoto" accept="image/*" @change="${this.saveImage}" style="display:none;cursor:pointer;position:absolute;z-index:-1"> <label style="font-size:smaller;font-weight:700;line-height:36px" for="photoURL">Photo:<canvas style="margin:auto;height:200px;width:100%;background-image:url('${this.photo}');background-size:contain;background-repeat:no-repeat;background-position:center;cursor:pointer;overflow:hidden;box-sizing:border-box"></canvas></label>`}appendToFileLocation(e,t){const n=e.lastIndexOf(".");if(n<=0)return e;const i=e.substring(0,n),r=e.substring(n);return console.log("path: ",i,t,r),`${i}${t}${r}`}async saveImage(){const e=this.shadowRoot.querySelector("#photoURL");if(!e)return void console.error("No file selected");const t=(n=ed,i="/pwa-auth/"+this.user+"/"+e.files[0].name,el(n=Un(n),i));var n,i;const r={cacheControl:"public,max-age=300",contentType:e.files[0].type};(function(e,t){return Yh(e=Un(e),t)})(t,r).then(e=>{console.log("metadata: ",e)}).catch(e=>{console.log("error: ",e)}),ol(t,e.files[0],r).then(e=>{(function(e){return Zh(e=Un(e))})(e.ref).then(e=>{const t=this.appendToFileLocation(e,"_400x400");console.log("modifiedFilePath",t),this.dispatchPhoto(e)}).catch(()=>{})}).catch(()=>{})}}yd([ue()],wd.prototype,"photo",void 0),yd([de()],wd.prototype,"user",void 0),customElements.define("contact-photo",wd);var _d=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class vd extends(pe(Xt)(oe)){constructor(){super(),this.value="",this.phone=""}stateChanged(e){this.phone=e.backend.phone}connectedCallback(){super.connectedCallback(),this.addFormResetListener()}static get styles(){return[ld,o`:host{display:grid}`]}render(){return V`<input id="phoneNumber" type="text" value="${this.value}" @input="${this.onInput}" @keydown="${this.onKeyDown}" placeholder="${this.formatPhoneNumber(this.phone)||"(XXX) XXX-XXXX"}" inputmode="numeric" pattern="[0-9]*" data-label="Phone Number">`}onKeyDown(e){["Backspace","Delete","Tab","Escape","Enter","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)||e.key>="0"&&e.key<="9"||e.key>="Numpad0"&&e.key<="Numpad9"||e.preventDefault()}onInput(e){const t=e.target,n=this.unformatPhoneNumber(t.value);n.length<=10?this.value=n:t.value=this.formatPhoneNumber(this.value)}formatPhoneNumber(e){const t=(""+e).replace(/\D/g,"");let n="";return t.length>0&&(n=`(${t.slice(0,3)}`),t.length>=3&&(n+=`) ${t.slice(3,6)}`),t.length>6&&(n+=`-${t.slice(6,10)}`),n}unformatPhoneNumber(e){return e.replace(/\D/g,"")}addFormResetListener(){const e=this.closest("form");e&&e.addEventListener("reset",()=>this.resetInput())}resetInput(){this.value=""}}_d([ue({type:String})],vd.prototype,"value",void 0),_d([de()],vd.prototype,"phone",void 0),customElements.define("phone-format",vd);var bd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class Id extends oe{constructor(){super(),this.telephone="",this.saveTelephone=async()=>{if(td.currentUser){let e=this.shadowRoot?.querySelector("phone-format");console.log(e),await async function(e,t){const n=Un(e);if(Ji(n.auth.app))return Promise.reject(vr(n.auth));await io(n,t)}(td.currentUser,e.value).catch(e=>{console.log(e)}),Xt.dispatch(Wt(e.value)),alert("Telephone Updated: "+e.value)}}}static get styles(){return[ud,ld,dd,o`:host{display:grid;grid-template-rows:auto auto auto}`]}render(){return V`<label for="phoneNumber">Telephone: ${this.telephone}</label><phone-format></phone-format><button class="action-button" @click="${this.saveTelephone}">Update</button>`}}bd([ue({type:String,reflect:!0})],Id.prototype,"telephone",void 0),customElements.define("input-telephone",Id);const Ed=async e=>{await function(e,t){return co(Un(e),null,t)}(nd,e).then(()=>{console.log("Password successful!")}).catch(e=>{console.log("Problem: "+e.messge)})};var Td=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};class Sd extends oe{constructor(){super(),this.name="",this._user=!1}stateChanged(e){this._user=e.frontend.login}firstUpdated(){this.shadowRoot.querySelector(".pass").addEventListener("click",()=>{this.alertPassword()})}alertPassword(){const e=this.shadowRoot.querySelector("#passVerify");Ed(e.value)}static get styles(){return[ud,ld,dd,o`:host{display:grid;grid-template-rows:auto auto auto auto auto}`]}render(){return V`<label for="newPass">New Password</label> <input type="password" id="newPass"> <label for="passVerify">Verify Password</label> <input type="password" id="passVerify"> <button class="action-button pass">update</button>`}}Td([ue({type:String,reflect:!0})],Sd.prototype,"name",void 0),Td([de()],Sd.prototype,"_user",void 0),customElements.define("input-password",Sd);var kd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};e.UserSettings=class extends(pe(Xt)(oe)){constructor(){super(),this.profileTopic="",this._user=!1,this._name="",this._id="",this._phone="",this._userMail="",this._photoURL="",this._imagePath=""}firstUpdated(){this.querySelectorAll("form").forEach(e=>{e.preventDefault()}),this.shadowRoot.querySelector("button[value=profile]").addEventListener("click",()=>{Xt.dispatch(Rt("profile"))}),this.shadowRoot.querySelector("button[value=verification]").addEventListener("click",()=>{Xt.dispatch(Rt("verification"))}),this.shadowRoot.querySelector("button[value=password]").addEventListener("click",()=>{Xt.dispatch(Rt("password"))}),this.shadowRoot.querySelector("button[value=delete]").addEventListener("click",()=>{Xt.dispatch(Rt("delete"))}),this.shadowRoot.querySelector(".deleteUser").addEventListener("click",e=>{e.preventDefault(),this.alertDelete()})}stateChanged(e){this.profileTopic=e.frontend.settings,this._user=e.frontend.login,this._id=e.frontend.userId,this._name=e.backend.name,this._phone=e.backend.phone,this._userMail=e.backend.email,this._photoURL=e.backend.photoURL}alertDelete(){this._user?this.deleteUser():alert("Please Login")}deleteUser(){1==confirm("Delete Account?")?((async()=>{nd.delete().then(()=>{}).catch(()=>{})})(),console.log("user gone")):console.log("user here")}static get styles(){return[Qt,hd,dd,Yt,o`:host{margin:0 3px 0 3px}form{box-sizing:border-box;display:grid;border:0}.pageTitle{margin:0}.welcome{color:var(--pwa_section_header);text-align:center;text-shadow:1px 1px 2px #000,0 0 15px grey,0 0 5px #fff}`]}render(){return V`<nav><ul class="setMenu"><li><button value="profile" class="topButton" ?on="${"profile"===this.profileTopic}">Profile</button></li><li><button value="verification" class="topButton" ?on="${"verification"===this.profileTopic}">Verification</button></li><li><button value="password" class="topButton" ?on="${"password"===this.profileTopic}">Security</button></li><li><button value="delete" class="topButton" ?on="${"delete"===this.profileTopic}">Delete</button></li></ul></nav><section class="spec" ?on="${"profile"===this.profileTopic}"><h2 class="welcome">${this._name}</h2><contact-photo></contact-photo><form id="userName"><input-name></input-name></form></section><section class="spec" ?on="${"verification"===this.profileTopic}"><form id="userVerify"><h2 class="welcome">Change E-mail</h2><contact-email></contact-email><h2 class="welcome">Change Telephone</h2><input-telephone></input-telephone><div class="verified"></div></form></section><section class="spec" ?on="${"password"===this.profileTopic}"><form id="userPassword"><h2 class="welcome">Change Password</h2><input-password></input-password></form></section><section class="spec" ?on="${"delete"===this.profileTopic}"><form id="userDelete"><h2 class="welcome">Delete Account</h2><p>Permanently delete the user account and data related to:</p><button class="action-button deleteUser">Delete</button></form></section>`}},kd([de()],e.UserSettings.prototype,"profileTopic",void 0),kd([de()],e.UserSettings.prototype,"_user",void 0),kd([de()],e.UserSettings.prototype,"_name",void 0),kd([de()],e.UserSettings.prototype,"_id",void 0),kd([de()],e.UserSettings.prototype,"_phone",void 0),kd([de()],e.UserSettings.prototype,"_userMail",void 0),kd([de()],e.UserSettings.prototype,"_photoURL",void 0),kd([de()],e.UserSettings.prototype,"_imagePath",void 0),e.UserSettings=kd([ce("user-settings")],e.UserSettings);const Ad=o`.icon,.login{transition-property:width,border-radius;transition-duration:2s}.icon,.login{height:40px;cursor:pointer;margin:auto;overflow:hidden;border:2px solid #000;background-color:green;color:#fff;font-size:15px;text-decoration:none}.icon:hover,.login:hover{background-color:#d3d3d3}.icon{width:40px;border-radius:50%;padding:0}.login{width:80px;border-radius:6px;padding:10px 20px}.iconArea{border-radius:50%;overflow:hidden;width:38px;height:38px;margin:auto}.userImage{object-fit:cover;transition-property:all;transition-duration:2s;clip-path:circle(50%);margin:auto}`;var Cd=function(e,t,n,i){var r,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,n,o):r(t,n))||o);return s>3&&o&&Object.defineProperty(t,n,o),o};e.UserIcon=class extends(pe(Xt)(oe)){constructor(){super(),this._user=!1,this._photoURL="",this._sign=!1}firstUpdated(){this.shadowRoot.querySelector("button").addEventListener("click",()=>{console.log("logged-in: ",this._user),Xt.dispatch(xt())})}stateChanged(e){this._user=e.frontend.login,this._photoURL=e.backend.photoURL,this._sign=e.frontend.register}static get styles(){return[Ad,o`:host{margin:auto;display:grid}`]}render(){return V`<button class="${this._user?"icon":"login"}" aria-label="login">${this._user?V`<input type="image" class="userImage" alt="Login" height="38px" width="38px" src="${this._photoURL}">`:"Login"}</button>`}},Cd([de()],e.UserIcon.prototype,"_user",void 0),Cd([de()],e.UserIcon.prototype,"_photoURL",void 0),Cd([de()],e.UserIcon.prototype,"_sign",void 0),e.UserIcon=Cd([ce("user-icon")],e.UserIcon)}({});
//# sourceMappingURL=pwa-auth.js.map
