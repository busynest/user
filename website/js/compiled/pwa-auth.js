/**
 * pwa-auth
 * Copyright (c) 2025 Jacek Markiewicz
 * Licensed under MIT
 */

import{r as e,_ as t,C as n,a as i,E as r,o,F as a,L as s,g as c,i as l,b as d,v as p,c as u,d as h,e as f,f as g,h as y,j as m,k as w,s as b,l as v,m as _,n as $,p as x,q as S,t as A,u as k,w as E,x as P,y as C,z as I,A as T,B as O,D as R,G as j}from"./pwa-helpers-BN4uXXdl.js";const D=globalThis,U=D.ShadowRoot&&(void 0===D.ShadyCSS||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,M=Symbol(),N=new WeakMap;let z=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==M)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(U&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=N.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&N.set(t,e))}return e}toString(){return this.cssText}};const L=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new z(n,e,M)},B=U?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new z("string"==typeof e?e:e+"",void 0,M))(t)})(e):e,{is:F,defineProperty:H,getOwnPropertyDescriptor:K,getOwnPropertyNames:q,getOwnPropertySymbols:W,getPrototypeOf:V}=Object,J=globalThis,G=J.trustedTypes,X=G?G.emptyScript:"",Z=J.reactiveElementPolyfillSupport,Y=(e,t)=>e,Q={toAttribute(e,t){switch(t){case Boolean:e=e?X:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},ee=(e,t)=>!F(e,t),te={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;let ne=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&H(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=K(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;const e=V(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){const e=this.properties,t=[...q(e),...W(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(B(e))}else void 0!==e&&t.push(B(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(U)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of t){const t=document.createElement("style"),i=D.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=n.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:Q).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:Q;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){const i=this.constructor,r=this[e];if(n??=i.getPropertyOptions(e),!((n.hasChanged??ee)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};ne.elementStyles=[],ne.shadowRootOptions={mode:"open"},ne[Y("elementProperties")]=new Map,ne[Y("finalized")]=new Map,Z?.({ReactiveElement:ne}),(J.reactiveElementVersions??=[]).push("2.1.1");const ie=globalThis,re=ie.trustedTypes,oe=re?re.createPolicy("lit-html",{createHTML:e=>e}):void 0,ae="$lit$",se=`lit$${Math.random().toFixed(9).slice(2)}$`,ce="?"+se,le=`<${ce}>`,de=document,pe=()=>de.createComment(""),ue=e=>null===e||"object"!=typeof e&&"function"!=typeof e,he=Array.isArray,fe="[ \t\n\f\r]",ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,me=/>/g,we=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ve=/"/g,_e=/^(?:script|style|textarea|title)$/i,$e=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),xe=Symbol.for("lit-noChange"),Se=Symbol.for("lit-nothing"),Ae=new WeakMap,ke=de.createTreeWalker(de,129);function Ee(e,t){if(!he(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==oe?oe.createHTML(t):t}const Pe=(e,t)=>{const n=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=ge;for(let t=0;t<n;t++){const n=e[t];let s,c,l=-1,d=0;for(;d<n.length&&(a.lastIndex=d,c=a.exec(n),null!==c);)d=a.lastIndex,a===ge?"!--"===c[1]?a=ye:void 0!==c[1]?a=me:void 0!==c[2]?(_e.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=we):void 0!==c[3]&&(a=we):a===we?">"===c[0]?(a=r??ge,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,s=c[1],a=void 0===c[3]?we:'"'===c[3]?ve:be):a===ve||a===be?a=we:a===ye||a===me?a=ge:(a=we,r=void 0);const p=a===we&&e[t+1].startsWith("/>")?" ":"";o+=a===ge?n+le:l>=0?(i.push(s),n.slice(0,l)+ae+n.slice(l)+se+p):n+se+(-2===l?t:p)}return[Ee(e,o+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Ce{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const a=e.length-1,s=this.parts,[c,l]=Pe(e,t);if(this.el=Ce.createElement(c,n),ke.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=ke.nextNode())&&s.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(ae)){const t=l[o++],n=i.getAttribute(e).split(se),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:a[2],strings:n,ctor:"."===a[1]?je:"?"===a[1]?De:"@"===a[1]?Ue:Re}),i.removeAttribute(e)}else e.startsWith(se)&&(s.push({type:6,index:r}),i.removeAttribute(e));if(_e.test(i.tagName)){const e=i.textContent.split(se),t=e.length-1;if(t>0){i.textContent=re?re.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],pe()),ke.nextNode(),s.push({type:2,index:++r});i.append(e[t],pe())}}}else if(8===i.nodeType)if(i.data===ce)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(se,e+1));)s.push({type:7,index:r}),e+=se.length-1}r++}}static createElement(e,t){const n=de.createElement("template");return n.innerHTML=e,n}}function Ie(e,t,n=e,i){if(t===xe)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const o=ue(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=Ie(e,r._$AS(e,t.values),r,i)),t}class Te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??de).importNode(t,!0);ke.currentNode=i;let r=ke.nextNode(),o=0,a=0,s=n[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new Oe(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new Me(r,this,e)),this._$AV.push(t),s=n[++a]}o!==s?.index&&(r=ke.nextNode(),o++)}return ke.currentNode=de,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Oe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=Se,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ie(this,e,t),ue(e)?e===Se||null==e||""===e?(this._$AH!==Se&&this._$AR(),this._$AH=Se):e!==this._$AH&&e!==xe&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>he(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Se&&ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(de.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=Ce.createElement(Ee(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Te(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Ae.get(e.strings);return void 0===t&&Ae.set(e.strings,t=new Ce(e)),t}k(e){he(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new Oe(this.O(pe()),this.O(pe()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=Se,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Se}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(void 0===r)e=Ie(this,e,t,0),o=!ue(e)||e!==this._$AH&&e!==xe,o&&(this._$AH=e);else{const i=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=Ie(this,i[n+a],t,a),s===xe&&(s=this._$AH[a]),o||=!ue(s)||s!==this._$AH[a],s===Se?e=Se:e!==Se&&(e+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!i&&this.j(e)}j(e){e===Se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class je extends Re{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Se?void 0:e}}class De extends Re{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Se)}}class Ue extends Re{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=Ie(this,e,t,0)??Se)===xe)return;const n=this._$AH,i=e===Se&&n!==Se||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==Se&&(n===Se||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Me{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ie(this,e)}}const Ne=ie.litHtmlPolyfillSupport;Ne?.(Ce,Oe),(ie.litHtmlVersions??=[]).push("3.3.1");const ze=globalThis;class Le extends ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new Oe(t.insertBefore(pe(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return xe}}Le._$litElement$=!0,Le.finalized=!0,ze.litElementHydrateSupport?.({LitElement:Le});const Be=ze.litElementPolyfillSupport;Be?.({LitElement:Le}),(ze.litElementVersions??=[]).push("4.2.1");const Fe=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},He={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:ee},Ke=(e=He,t,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e)}}throw Error("Unsupported decorator location: "+i)};function qe(e){return(t,n)=>"object"==typeof n?Ke(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function We(e){return qe({...e,state:!0,attribute:!1})}const Ve=e=>t=>class extends t{connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._storeUnsubscribe=e.subscribe(()=>this.stateChanged(e.getState())),this.stateChanged(e.getState())}disconnectedCallback(){this._storeUnsubscribe(),super.disconnectedCallback&&super.disconnectedCallback()}stateChanged(e){}};function Je(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Ge=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),Xe=()=>Math.random().toString(36).substring(7).split("").join("."),Ze={INIT:`@@redux/INIT${Xe()}`,REPLACE:`@@redux/REPLACE${Xe()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Xe()}`};function Ye(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function Qe(e,t,n){if("function"!=typeof e)throw new Error(Je(2));if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(Je(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(Je(1));return n(Qe)(e,t)}let i=e,r=t,o=new Map,a=o,s=0,c=!1;function l(){a===o&&(a=new Map,o.forEach((e,t)=>{a.set(t,e)}))}function d(){if(c)throw new Error(Je(3));return r}function p(e){if("function"!=typeof e)throw new Error(Je(4));if(c)throw new Error(Je(5));let t=!0;l();const n=s++;return a.set(n,e),function(){if(t){if(c)throw new Error(Je(6));t=!1,l(),a.delete(n),o=null}}}function u(e){if(!Ye(e))throw new Error(Je(7));if(void 0===e.type)throw new Error(Je(8));if("string"!=typeof e.type)throw new Error(Je(17));if(c)throw new Error(Je(9));try{c=!0,r=i(r,e)}finally{c=!1}return(o=a).forEach(e=>{e()}),e}u({type:Ze.INIT});return{dispatch:u,subscribe:p,getState:d,replaceReducer:function(e){if("function"!=typeof e)throw new Error(Je(10));i=e,u({type:Ze.REPLACE})},[Ge]:function(){const e=p;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(Je(11));function n(){const e=t;e.next&&e.next(d())}n();return{unsubscribe:e(n)}},[Ge](){return this}}}}}function et(e){const t=Object.keys(e),n={};for(let i=0;i<t.length;i++){const r=t[i];"function"==typeof e[r]&&(n[r]=e[r])}const i=Object.keys(n);let r;try{!function(e){Object.keys(e).forEach(t=>{const n=e[t];if(void 0===n(void 0,{type:Ze.INIT}))throw new Error(Je(12));if(void 0===n(void 0,{type:Ze.PROBE_UNKNOWN_ACTION()}))throw new Error(Je(13))})}(n)}catch(e){r=e}return function(e={},t){if(r)throw r;let o=!1;const a={};for(let r=0;r<i.length;r++){const s=i[r],c=n[s],l=e[s],d=c(l,t);if(void 0===d)throw t&&t.type,new Error(Je(14));a[s]=d,o=o||d!==l}return o=o||i.length!==Object.keys(e).length,o?a:e}}function tt(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}var nt=Symbol.for("immer-nothing"),it=Symbol.for("immer-draftable"),rt=Symbol.for("immer-state");function ot(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var at=Object.getPrototypeOf;function st(e){return!!e&&!!e[rt]}function ct(e){return!!e&&(dt(e)||Array.isArray(e)||!!e[it]||!!e.constructor?.[it]||gt(e)||yt(e))}var lt=Object.prototype.constructor.toString();function dt(e){if(!e||"object"!=typeof e)return!1;const t=at(e);if(null===t)return!0;const n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===lt}function pt(e,t){0===ut(e)?Reflect.ownKeys(e).forEach(n=>{t(n,e[n],e)}):e.forEach((n,i)=>t(i,n,e))}function ut(e){const t=e[rt];return t?t.type_:Array.isArray(e)?1:gt(e)?2:yt(e)?3:0}function ht(e,t){return 2===ut(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function ft(e,t,n){const i=ut(e);2===i?e.set(t,n):3===i?e.add(n):e[t]=n}function gt(e){return e instanceof Map}function yt(e){return e instanceof Set}function mt(e){return e.copy_||e.base_}function wt(e,t){if(gt(e))return new Map(e);if(yt(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const n=dt(e);if(!0===t||"class_only"===t&&!n){const t=Object.getOwnPropertyDescriptors(e);delete t[rt];let n=Reflect.ownKeys(t);for(let i=0;i<n.length;i++){const r=n[i],o=t[r];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(t[r]={configurable:!0,writable:!0,enumerable:o.enumerable,value:e[r]})}return Object.create(at(e),t)}{const t=at(e);if(null!==t&&n)return{...e};const i=Object.create(t);return Object.assign(i,e)}}function bt(e,t=!1){return _t(e)||st(e)||!ct(e)||(ut(e)>1&&(e.set=e.add=e.clear=e.delete=vt),Object.freeze(e),t&&Object.entries(e).forEach(([e,t])=>bt(t,!0))),e}function vt(){ot(2)}function _t(e){return Object.isFrozen(e)}var $t,xt={};function St(e){const t=xt[e];return t||ot(0),t}function At(){return $t}function kt(e,t){t&&(St("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Et(e){Pt(e),e.drafts_.forEach(It),e.drafts_=null}function Pt(e){e===$t&&($t=e.parent_)}function Ct(e){return $t={drafts_:[],parent_:$t,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function It(e){const t=e[rt];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function Tt(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];return void 0!==e&&e!==n?(n[rt].modified_&&(Et(t),ot(4)),ct(e)&&(e=Ot(t,e),t.parent_||jt(t,e)),t.patches_&&St("Patches").generateReplacementPatches_(n[rt].base_,e,t.patches_,t.inversePatches_)):e=Ot(t,n,[]),Et(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==nt?e:void 0}function Ot(e,t,n){if(_t(t))return t;const i=t[rt];if(!i)return pt(t,(r,o)=>Rt(e,i,t,r,o,n)),t;if(i.scope_!==e)return t;if(!i.modified_)return jt(e,i.base_,!0),i.base_;if(!i.finalized_){i.finalized_=!0,i.scope_.unfinalizedDrafts_--;const t=i.copy_;let r=t,o=!1;3===i.type_&&(r=new Set(t),t.clear(),o=!0),pt(r,(r,a)=>Rt(e,i,t,r,a,n,o)),jt(e,t,!1),n&&e.patches_&&St("Patches").generatePatches_(i,n,e.patches_,e.inversePatches_)}return i.copy_}function Rt(e,t,n,i,r,o,a){if(st(r)){const a=Ot(e,r,o&&t&&3!==t.type_&&!ht(t.assigned_,i)?o.concat(i):void 0);if(ft(n,i,a),!st(a))return;e.canAutoFreeze_=!1}else a&&n.add(r);if(ct(r)&&!_t(r)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;Ot(e,r),t&&t.scope_.parent_||"symbol"==typeof i||!Object.prototype.propertyIsEnumerable.call(n,i)||jt(e,r)}}function jt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&bt(t,n)}var Dt={get(e,t){if(t===rt)return e;const n=mt(e);if(!ht(n,t))return function(e,t,n){const i=Nt(t,n);return i?"value"in i?i.value:i.get?.call(e.draft_):void 0}(e,n,t);const i=n[t];return e.finalized_||!ct(i)?i:i===Mt(e.base_,t)?(Lt(e),e.copy_[t]=Bt(i,e)):i},has:(e,t)=>t in mt(e),ownKeys:e=>Reflect.ownKeys(mt(e)),set(e,t,n){const i=Nt(mt(e),t);if(i?.set)return i.set.call(e.draft_,n),!0;if(!e.modified_){const i=Mt(mt(e),t),r=i?.[rt];if(r&&r.base_===n)return e.copy_[t]=n,e.assigned_[t]=!1,!0;if(function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,i)&&(void 0!==n||ht(e.base_,t)))return!0;Lt(e),zt(e)}return e.copy_[t]===n&&(void 0!==n||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==Mt(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,Lt(e),zt(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const n=mt(e),i=Reflect.getOwnPropertyDescriptor(n,t);return i?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:i.enumerable,value:n[t]}:i},defineProperty(){ot(11)},getPrototypeOf:e=>at(e.base_),setPrototypeOf(){ot(12)}},Ut={};function Mt(e,t){const n=e[rt];return(n?mt(n):e)[t]}function Nt(e,t){if(!(t in e))return;let n=at(e);for(;n;){const e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=at(n)}}function zt(e){e.modified_||(e.modified_=!0,e.parent_&&zt(e.parent_))}function Lt(e){e.copy_||(e.copy_=wt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}pt(Dt,(e,t)=>{Ut[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),Ut.deleteProperty=function(e,t){return Ut.set.call(this,e,t,void 0)},Ut.set=function(e,t,n){return Dt.set.call(this,e[0],t,n,e[0])};function Bt(e,t){const n=gt(e)?St("MapSet").proxyMap_(e,t):yt(e)?St("MapSet").proxySet_(e,t):function(e,t){const n=Array.isArray(e),i={type_:n?1:0,scope_:t?t.scope_:At(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let r=i,o=Dt;n&&(r=[i],o=Ut);const{revoke:a,proxy:s}=Proxy.revocable(r,o);return i.draft_=s,i.revoke_=a,s}(e,t);return(t?t.scope_:At()).drafts_.push(n),n}function Ft(e){if(!ct(e)||_t(e))return e;const t=e[rt];let n;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=wt(e,t.scope_.immer_.useStrictShallowCopy_)}else n=wt(e,!0);return pt(n,(e,t)=>{ft(n,e,Ft(t))}),t&&(t.finalized_=!1),n}var Ht=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,n)=>{if("function"==typeof e&&"function"!=typeof t){const n=t;t=e;const i=this;return function(e=n,...r){return i.produce(e,e=>t.call(this,e,...r))}}let i;if("function"!=typeof t&&ot(6),void 0!==n&&"function"!=typeof n&&ot(7),ct(e)){const r=Ct(this),o=Bt(e,void 0);let a=!0;try{i=t(o),a=!1}finally{a?Et(r):Pt(r)}return kt(r,n),Tt(i,r)}if(!e||"object"!=typeof e){if(i=t(e),void 0===i&&(i=e),i===nt&&(i=void 0),this.autoFreeze_&&bt(i,!0),n){const t=[],r=[];St("Patches").generateReplacementPatches_(e,i,t,r),n(t,r)}return i}ot(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,i;const r=this.produce(e,t,(e,t)=>{n=e,i=t});return[r,n,i]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){ct(e)||ot(8),st(e)&&(e=function(e){st(e)||ot(10);return Ft(e)}(e));const t=Ct(this),n=Bt(e,void 0);return n[rt].isManual_=!0,Pt(t),n}finishDraft(e,t){const n=e&&e[rt];n&&n.isManual_||ot(9);const{scope_:i}=n;return kt(i,t),Tt(void 0,i)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const i=t[n];if(0===i.path.length&&"replace"===i.op){e=i.value;break}}n>-1&&(t=t.slice(n+1));const i=St("Patches").applyPatches_;return st(e)?i(e,t):this.produce(e,e=>i(e,t))}},Kt=Ht.produce;function qt(e){return({dispatch:t,getState:n})=>i=>r=>"function"==typeof r?r(t,n,e):i(r)}Ht.produceWithPatches.bind(Ht),Ht.setAutoFreeze.bind(Ht),Ht.setUseStrictShallowCopy.bind(Ht),Ht.applyPatches.bind(Ht),Ht.createDraft.bind(Ht),Ht.finishDraft.bind(Ht);var Wt=qt(),Vt=qt,Jt="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?tt:tt.apply(null,arguments)};function Gt(e,t){function n(...n){if(t){let i=t(...n);if(!i)throw new Error(ln(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>function(e){return Ye(e)&&"type"in e&&"string"==typeof e.type}(t)&&t.type===e,n}var Xt=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Zt(e){return ct(e)?Kt(e,()=>{}):e}function Yt(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}var Qt=e=>t=>{setTimeout(t,e)},en=e=>function(t){const{autoBatch:n=!0}=t??{};let i=new Xt(e);return n&&i.push(((e={type:"raf"})=>t=>(...n)=>{const i=t(...n);let r=!0,o=!1,a=!1;const s=new Set,c="tick"===e.type?queueMicrotask:"raf"===e.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Qt(10):"callback"===e.type?e.queueNotification:Qt(e.timeout),l=()=>{a=!1,o&&(o=!1,s.forEach(e=>e()))};return Object.assign({},i,{subscribe(e){const t=i.subscribe(()=>r&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return r=!e?.meta?.RTK_autoBatch,o=!r,o&&(a||(a=!0,c(l))),i.dispatch(e)}finally{r=!0}}})})("object"==typeof n?n:void 0)),i};function tn(e){const t={},n=[];let i;const r={addCase(e,n){const i="string"==typeof e?e:e.type;if(!i)throw new Error(ln(28));if(i in t)throw new Error(ln(29));return t[i]=n,r},addAsyncThunk:(e,i)=>(i.pending&&(t[e.pending.type]=i.pending),i.rejected&&(t[e.rejected.type]=i.rejected),i.fulfilled&&(t[e.fulfilled.type]=i.fulfilled),i.settled&&n.push({matcher:e.settled,reducer:i.settled}),r),addMatcher:(e,t)=>(n.push({matcher:e,reducer:t}),r),addDefaultCase:e=>(i=e,r)};return e(r),[t,n,i]}var nn=Symbol.for("rtk-slice-createasyncthunk");function rn(e,t){return`${e}/${t}`}function on({creators:e}={}){const t=e?.asyncThunk?.[nn];return function(e){const{name:n,reducerPath:i=n}=e;if(!n)throw new Error(ln(11));const r=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},o=Object.keys(r),a={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){const n="string"==typeof e?e:e.type;if(!n)throw new Error(ln(12));if(n in a.sliceCaseReducersByType)throw new Error(ln(13));return a.sliceCaseReducersByType[n]=t,s},addMatcher:(e,t)=>(a.sliceMatchers.push({matcher:e,reducer:t}),s),exposeAction:(e,t)=>(a.actionCreators[e]=t,s),exposeCaseReducer:(e,t)=>(a.sliceCaseReducersByName[e]=t,s)};function c(){const[t={},n=[],i]="function"==typeof e.extraReducers?tn(e.extraReducers):[e.extraReducers],r={...t,...a.sliceCaseReducersByType};return function(e,t){let n,[i,r,o]=tn(t);if(function(e){return"function"==typeof e}(e))n=()=>Zt(e());else{const t=Zt(e);n=()=>t}function a(e=n(),t){let a=[i[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return 0===a.filter(e=>!!e).length&&(a=[o]),a.reduce((e,n)=>{if(n){if(st(e)){const i=n(e,t);return void 0===i?e:i}if(ct(e))return Kt(e,e=>n(e,t));{const i=n(e,t);if(void 0===i){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return i}}return e},e)}return a.getInitialState=n,a}(e.initialState,e=>{for(let t in r)e.addCase(t,r[t]);for(let t of a.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);i&&e.addDefaultCase(i)})}o.forEach(i=>{const o=r[i],a={reducerName:i,type:rn(n,i),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(o)?function({type:e,reducerName:t,createNotation:n},i,r){let o,a;if("reducer"in i){if(n&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(i))throw new Error(ln(17));o=i.reducer,a=i.prepare}else o=i;r.addCase(e,o).exposeCaseReducer(t,o).exposeAction(t,a?Gt(e,a):Gt(e))}(a,o,s):function({type:e,reducerName:t},n,i,r){if(!r)throw new Error(ln(18));const{payloadCreator:o,fulfilled:a,pending:s,rejected:c,settled:l,options:d}=n,p=r(e,o,d);i.exposeAction(t,p),a&&i.addCase(p.fulfilled,a);s&&i.addCase(p.pending,s);c&&i.addCase(p.rejected,c);l&&i.addMatcher(p.settled,l);i.exposeCaseReducer(t,{fulfilled:a||cn,pending:s||cn,rejected:c||cn,settled:l||cn})}(a,o,s,t)});const l=e=>e,d=new Map,p=new WeakMap;let u;function h(e,t){return u||(u=c()),u(e,t)}function f(){return u||(u=c()),u.getInitialState()}function g(t,n=!1){function i(e){let r=e[t];return void 0===r&&n&&(r=Yt(p,i,f)),r}function r(t=l){const i=Yt(d,n,()=>new WeakMap);return Yt(i,t,()=>{const i={};for(const[r,o]of Object.entries(e.selectors??{}))i[r]=an(o,t,()=>Yt(p,t,f),n);return i})}return{reducerPath:t,getSelectors:r,get selectors(){return r(i)},selectSlice:i}}const y={name:n,reducer:h,actions:a.actionCreators,caseReducers:a.sliceCaseReducersByName,getInitialState:f,...g(i),injectInto(e,{reducerPath:t,...n}={}){const r=t??i;return e.inject({reducerPath:r,reducer:h},n),{...y,...g(r,!0)}}};return y}}function an(e,t,n,i){function r(r,...o){let a=t(r);return void 0===a&&i&&(a=n()),e(a,...o)}return r.unwrapped=e,r}var sn=on();function cn(){}function ln(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}const dn=sn({name:"user",initialState:{settings:"profile",login:!1,drawer:!1,register:!0,userId:"user",customer:"John Doe",profileChoice:"unChosen",name:"Modern Business",photoURL:"",phone:"(...) ... - ....",email:""},reducers:{navigateAuth:(e,t)=>{switch(t.payload){case"profile":case"verification":case"password":case"delete":break;default:t.payload="profile"}e.settings=t.payload},userAuth:(e,t)=>{e.login=t.payload},toggleSign:e=>{!0===e.drawer?e.drawer=!1:e.drawer=!0},closeSign:e=>{e.drawer=!1},signUpAction:e=>{!1===e.register?e.register=!0:e.register=!1},signUpClose:(e,t)=>{e.register=t.payload},iconAuth:(e,t)=>{e.photoURL=t.payload},nameAuth:(e,t)=>{e.name=t.payload}}}),{navigateAuth:pn,iconAuth:un,nameAuth:hn,userAuth:fn,toggleSign:gn,closeSign:yn,signUpAction:mn,signUpClose:wn}=dn.actions,bn=sn({name:"drawers",initialState:{drawer:!1},reducers:{setDrawer:e=>{!1===e.drawer?e.drawer=!0:e.drawer=!1},closeDrawer:e=>{e.drawer=!1}}}),{setDrawer:vn,closeDrawer:_n}=bn.actions,$n=sn({name:"backend",initialState:{verified:!1,anon:!1,userId:"",name:"John Doe",email:"",photoURL:"",phone:"",msgToken:""},reducers:{accVerified:(e,t)=>{e.verified=t.payload},accAnon:(e,t)=>{e.anon=t.payload},accID:(e,t)=>{e.userId=t.payload},accName:(e,t)=>{e.name=t.payload},accPhone:(e,t)=>{e.phone=t.payload},accEmail:(e,t)=>{e.email=t.payload},accImage:(e,t)=>{e.photoURL=t.payload},messageId:(e,t)=>{e.msgToken=t.payload}}}),{accVerified:xn,accID:Sn,accName:An,accPhone:kn,accEmail:En,accImage:Pn,accAnon:Cn,messageId:In}=$n.actions,Tn=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:i=!0,actionCreatorCheck:r=!0}=e??{};let o=new Xt;return t&&(function(e){return"boolean"==typeof e}(t)?o.push(Wt):o.push(Vt(t.extraArgument))),o},{reducer:n,middleware:i,devTools:r=!0,preloadedState:o,enhancers:a}=e||{};let s,c;if("function"==typeof n)s=n;else{if(!Ye(n))throw new Error(ln(1));s=et(n)}c="function"==typeof i?i(t):t();let l=tt;r&&(l=Jt({trace:!1,..."object"==typeof r&&r}));const d=function(...e){return t=>(n,i)=>{const r=t(n,i);let o=()=>{throw new Error(Je(15))};const a={getState:r.getState,dispatch:(e,...t)=>o(e,...t)},s=e.map(e=>e(a));return o=tt(...s)(r.dispatch),{...r,dispatch:o}}}(...c),p=en(d);return Qe(s,o,l(..."function"==typeof a?a(p):p()))}({reducer:{frontend:dn.reducer,drawer:bn.reducer,backend:$n.reducer},devTools:!0});$e`<svg viewBox="0 0 24 24" height="34px" width="34px"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></svg>`,$e`<svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>`;const On=$e`<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`,Rn=L`

  /* Detailed Project Feature Service  */
  .spec[on]     { display:           grid; }
  .spec         { display:           none; }

`,jn=L`

  /* <user-drawer> : parent container */
  :host {
    position:               absolute;
    max-height:             0px;
    transition:             max-height 1.4s ease-out;
    overflow:               hidden;
    height:                 auto;
    display:                grid;
    padding-top:            env(safe-area-inset-top);
  }

  :host([drawer]) {       
    transition-duration:    1.4s;
    max-height:             100%;
    transition:             max-height 1.4s ease-out;
  }

  /* wrapper : child container*/
  .userDrawer {
    position:               fixed;
    top:                    0;
    left:                   0;
    right:                  0;
    transition-duration:    1.4s;
    border:                 var(--pwa_drawer_border, 3px #303030 solid);
    z-index:                var(--pwa_drawer_z-index, 2);
    overflow:               hidden;
    background-color:       var(--pwa_drawer_background_color, #fff);
    color:                  var(--pwa_drawer_text_color, #303030);
    box-sizing:             border-box;
    border-radius:          var(--pwa_drawer_border-radius, 20px);
    height:                 auto;
    transition-property:    visibility, max-height;
  }

  /* wrapper closed */
  .closed {
    max-height:             0px;
    transition: max-height  1.4s ease-out;
    visibility:             hidden;
    transition-property:    visibility, max-height;
  }

  /* wrapper opened */
  .opened {
    max-height:             100%;
    transition: max-height  1.4s ease-out;
    visibility:             visible;
    transition-property:    visibility, max-height;
  }

`,Dn=L`

  .exit {
    display:                grid;
    grid-template-columns:  80px 1fr 80px;
    padding:                16px;
  }

  .exit > h3 {
    font-weight:            800;
    font-size:              .9em;
    margin:                 0px auto;
    opacity:                .8;
    line-height:            36px;
  }

  .exit > .remove {
    cursor:                 pointer;
    background-color:       transparent;
    border:                 0px;
    color:                  red;
    font-weight:            800;
    font-size:              .7em;
    text-transform:         uppercase;
    opacity:                .6;
  }
/*
  .exit > .refresh {
    background-color:       transparent;
    border:                 0px;
    fill:                   blue;
    height:                 36px;
    width:                  36px;
    padding:                0px;
  }
*/
  .close {
    height:                 30px;
    width:                  42px;
    margin:                 auto;
    background-color:       transparent;
    border:                 0px;
    fill:                   red;
    opacity:                .8;
  }

`,Un=L`

  a {
    text-transform:           uppercase;
    font-size:                .6em;
    color:                    rgb(105,105,105);
    font-weight:              800;
    text-decoration:          none;
  }

`,Mn=L`
  
  .setLog > p {
    margin:       12px;
    box-sizing:   border-box;
    text-align:   center;
  }

`,Nn=L`

  ul {
    list-style-type:          none;
    padding:                  0;
    margin:                   0;
  }

  li {
    display:                  grid;
  }

  .divider {
    border-top:     2px dotted black;
    border-bottom:  2px dotted black;
    text-align:     center;
    width:          80%;
    margin:         auto;
  }

`,zn="@firebase/installations",Ln="0.6.19",Bn=1e4,Fn=`w:${Ln}`,Hn="FIS_v2",Kn=36e5,qn=new r("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Wn(e){return e instanceof a&&e.code.includes("request-failed")}function Vn({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Jn(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function Gn(e,t){const n=(await t.json()).error;return qn.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Xn({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Zn(e,{refreshToken:t}){const n=Xn(e);return n.append("Authorization",function(e){return`${Hn} ${e}`}(t)),n}async function Yn(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Qn(e){return new Promise(t=>{setTimeout(t,e)})}const ei=/^[cdef][\w-]{21}$/;function ti(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}(e);return ei.test(t)?t:""}catch{return""}}function ni(e){return`${e.appName}!${e.appId}`}const ii=new Map;function ri(e,t){const n=ni(e);oi(n,t),function(e,t){const n=function(){!ai&&"BroadcastChannel"in self&&(ai=new BroadcastChannel("[Firebase] FID Change"),ai.onmessage=e=>{oi(e.data.key,e.data.fid)});return ai}();n&&n.postMessage({key:e,fid:t});0===ii.size&&ai&&(ai.close(),ai=null)}(n,t)}function oi(e,t){const n=ii.get(e);if(n)for(const e of n)e(t)}let ai=null;const si="firebase-installations-store";let ci=null;function li(){return ci||(ci=o("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(si)}})),ci}async function di(e,t){const n=ni(e),i=(await li()).transaction(si,"readwrite"),r=i.objectStore(si),o=await r.get(n);return await r.put(t,n),await i.done,o&&o.fid===t.fid||ri(e,t.fid),t}async function pi(e){const t=ni(e),n=(await li()).transaction(si,"readwrite");await n.objectStore(si).delete(t),await n.done}async function ui(e,t){const n=ni(e),i=(await li()).transaction(si,"readwrite"),r=i.objectStore(si),o=await r.get(n),a=t(o);return void 0===a?await r.delete(n):await r.put(a,n),await i.done,!a||o&&o.fid===a.fid||ri(e,a.fid),a}async function hi(e){let t;const n=await ui(e.appConfig,n=>{const i=function(e){const t=e||{fid:ti(),registrationStatus:0};return yi(t)}(n),r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(qn.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=Vn(e),r=Xn(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const a={fid:n,authVersion:Hn,appId:e.appId,sdkVersion:Fn},s={method:"POST",headers:r,body:JSON.stringify(a)},c=await Yn(()=>fetch(i,s));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:Jn(e.authToken)}}throw await Gn("Create Installation",c)}(e,t);return di(e.appConfig,n)}catch(n){throw Wn(n)&&409===n.customData.serverCode?await pi(e.appConfig):await di(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:fi(e)}:{installationEntry:t}}(e,i);return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function fi(e){let t=await gi(e.appConfig);for(;1===t.registrationStatus;)await Qn(100),t=await gi(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await hi(e);return n||t}return t}function gi(e){return ui(e,e=>{if(!e)throw qn.create("installation-not-found");return yi(e)})}function yi(e){return 1===(t=e).registrationStatus&&t.registrationTime+Bn<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function mi({appConfig:e,heartbeatServiceProvider:t},n){const i=function(e,{fid:t}){return`${Vn(e)}/${t}/authTokens:generate`}(e,n),r=Zn(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&r.append("x-firebase-client",e)}const a={installation:{sdkVersion:Fn,appId:e.appId}},s={method:"POST",headers:r,body:JSON.stringify(a)},c=await Yn(()=>fetch(i,s));if(c.ok){return Jn(await c.json())}throw await Gn("Generate Auth Token",c)}async function wi(e,t=!1){let n;const i=await ui(e.appConfig,i=>{if(!vi(i))throw qn.create("not-registered");const r=i.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Kn}(e)}(r))return i;if(1===r.requestStatus)return n=async function(e,t){let n=await bi(e.appConfig);for(;1===n.authToken.requestStatus;)await Qn(100),n=await bi(e.appConfig);const i=n.authToken;return 0===i.requestStatus?wi(e,t):i}(e,t),i;{if(!navigator.onLine)throw qn.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(i);return n=async function(e,t){try{const n=await mi(e,t),i={...t,authToken:n};return await di(e.appConfig,i),n}catch(n){if(!Wn(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await di(e.appConfig,n)}else await pi(e.appConfig);throw n}}(e,t),t}});return n?await n:i.authToken}function bi(e){return ui(e,e=>{if(!vi(e))throw qn.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Bn<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n})}function vi(e){return void 0!==e&&2===e.registrationStatus}async function _i(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await hi(e);t&&await t}(n);return(await wi(n,t)).token}function $i(e){return qn.create("missing-app-config-values",{valueName:e})}const xi="installations",Si=e=>{const t=e.getProvider("app").getImmediate(),n=i(t,xi).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:i}=await hi(t);return i?i.catch(console.error):wi(t).catch(console.error),n.fid}(n),getToken:e=>_i(n,e)}};t(new n(xi,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw $i("App Configuration");if(!e.name)throw $i("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw $i(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:i(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),t(new n("installations-internal",Si,"PRIVATE")),e(zn,Ln),e(zn,Ln,"esm2020");const Ai="analytics",ki="https://www.googletagmanager.com/gtag/js",Ei=new s("@firebase/analytics"),Pi=new r("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});function Ci(e){if(!e.startsWith(ki)){const t=Pi.create("invalid-gtag-resource",{gtagURL:e});return Ei.warn(t.message),""}return e}function Ii(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function Ti(e,t){const n=function(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}("firebase-js-sdk-policy",{createScriptURL:Ci}),i=document.createElement("script"),r=`${ki}?l=${e}&id=${t}`;i.src=n?n?.createScriptURL(r):r,i.async=!0,document.head.appendChild(i)}function Oi(e,t,n,i){return async function(r,...o){try{if("event"===r){const[i,r]=o;await async function(e,t,n,i,r){try{let o=[];if(r&&r.send_to){let e=r.send_to;Array.isArray(e)||(e=[e]);const i=await Ii(n);for(const n of e){const e=i.find(e=>e.measurementId===n),r=e&&t[e.appId];if(!r){o=[];break}o.push(r)}}0===o.length&&(o=Object.values(t)),await Promise.all(o),e("event",i,r||{})}catch(e){Ei.error(e)}}(e,t,n,i,r)}else if("config"===r){const[r,a]=o;await async function(e,t,n,i,r,o){const a=i[r];try{if(a)await t[a];else{const e=(await Ii(n)).find(e=>e.measurementId===r);e&&await t[e.appId]}}catch(e){Ei.error(e)}e("config",r,o)}(e,t,n,i,r,a)}else if("consent"===r){const[t,n]=o;e("consent",t,n)}else if("get"===r){const[t,n,i]=o;e("get",t,n,i)}else if("set"===r){const[t]=o;e("set",t)}else e(r,...o)}catch(e){Ei.error(e)}}}const Ri=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function ji(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Di(e,t=Ri,n){const{appId:i,apiKey:r,measurementId:o}=e.options;if(!i)throw Pi.create("no-app-id");if(!r){if(o)return{measurementId:o,appId:i};throw Pi.create("no-api-key")}const a=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new Mi;return setTimeout(async()=>{s.abort()},6e4),Ui({appId:i,apiKey:r,measurementId:o},a,s,t)}async function Ui(e,{throttleEndTimeMillis:t,backoffCount:n},i,r=Ri){const{appId:o,measurementId:s}=e;try{await function(e,t){return new Promise((n,i)=>{const r=Math.max(t-Date.now(),0),o=setTimeout(n,r);e.addEventListener(()=>{clearTimeout(o),i(Pi.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}(i,t)}catch(e){if(s)return Ei.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${e?.message}]`),{appId:o,measurementId:s};throw e}try{const t=await async function(e){const{appId:t,apiKey:n}=e,i={method:"GET",headers:ji(n)},r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",t),o=await fetch(r,i);if(200!==o.status&&304!==o.status){let e="";try{const t=await o.json();t.error?.message&&(e=t.error.message)}catch(e){}throw Pi.create("config-fetch-failed",{httpStatus:o.status,responseMessage:e})}return o.json()}(e);return r.deleteThrottleMetadata(o),t}catch(t){const c=t;if(!function(e){if(!(e instanceof a&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(c)){if(r.deleteThrottleMetadata(o),s)return Ei.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:o,measurementId:s};throw t}const l=503===Number(c?.customData?.httpStatus)?u(n,r.intervalMillis,30):u(n,r.intervalMillis),d={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return r.setThrottleMetadata(o,d),Ei.debug(`Calling attemptFetch again in ${l} millis`),Ui(e,d,i,r)}}class Mi{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Ni(e,t,n,i,r,o,a){const s=Di(e);s.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Ei.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Ei.error(e)),t.push(s);const c=async function(){if(!d())return Ei.warn(Pi.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await p()}catch(e){return Ei.warn(Pi.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}().then(e=>e?i.getId():void 0),[l,u]=await Promise.all([s,c]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(ki)&&n.src.includes(e))return n;return null})(o)||Ti(o,l.measurementId),r("js",new Date);const h=a?.config??{};return h.origin="firebase",h.update=!0,null!=u&&(h.firebase_id=u),r("config",l.measurementId,h),l.measurementId}class zi{constructor(e){this.app=e}_delete(){return delete Li[this.app.options.appId],Promise.resolve()}}let Li={},Bi=[];const Fi={};let Hi,Ki,qi="dataLayer",Wi=!1;function Vi(e,t,n){!function(){const e=[];if(l()&&e.push("This is a browser extension environment."),g()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=Pi.create("invalid-analytics-context",{errorInfo:t});Ei.warn(n.message)}}();const i=e.options.appId;if(!i)throw Pi.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Pi.create("no-api-key");Ei.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=Li[i])throw Pi.create("already-exists",{id:i});if(!Wi){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(qi);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,i,r){let o=function(...e){window[i].push(arguments)};return window[r]&&"function"==typeof window[r]&&(o=window[r]),window[r]=Oi(o,e,t,n),{gtagCore:o,wrappedGtag:window[r]}}(Li,Bi,Fi,qi,"gtag");Ki=e,Hi=t,Wi=!0}Li[i]=Ni(e,Bi,Fi,t,Hi,qi,n);return new zi(e)}function Ji(e=h()){e=c(e);const t=i(e,Ai);return t.isInitialized()?t.getImmediate():function(e,t={}){const n=i(e,Ai);if(n.isInitialized()){const e=n.getImmediate();if(f(t,n.getOptions()))return e;throw Pi.create("already-initialized")}const r=n.initialize({options:t});return r}(e)}function Gi(e,t,n,i){e=c(e),async function(e,t,n,i,r){if(r&&r.global)e("event",n,i);else{const r=await t;e("event",n,{...i,send_to:r})}}(Ki,Li[e.app.options.appId],t,n,i).catch(e=>Ei.error(e))}const Xi="@firebase/analytics",Zi="0.10.18";t(new n(Ai,(e,{options:t})=>Vi(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),t(new n("analytics-internal",function(e){try{const t=e.getProvider(Ai).getImmediate();return{logEvent:(e,n,i)=>Gi(t,e,n,i)}}catch(e){throw Pi.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),e(Xi,Zi),e(Xi,Zi,"esm2020");const Yi="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Qi="google.c.a.c_id",er=1e4;var tr,nr;function ir(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function rr(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(tr||(tr={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(nr||(nr={}));const or="fcm_token_details_db",ar="fcm_token_object_Store";const sr="firebase-messaging-store";let cr=null;function lr(){return cr||(cr=o("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(sr)}})),cr}async function dr(e){const t=ur(e),n=await lr(),i=await n.transaction(sr).objectStore(sr).get(t);if(i)return i;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(or))return null}let t=null;return(await o(or,5,{upgrade:async(n,i,r,o)=>{if(i<2)return;if(!n.objectStoreNames.contains(ar))return;const a=o.objectStore(ar),s=await a.index("fcmSenderId").get(e);if(await a.clear(),s)if(2===i){const e=s;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:ir(e.vapidKey)}}}else if(3===i){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ir(e.auth),p256dh:ir(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ir(e.vapidKey)}}}else if(4===i){const e=s;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:ir(e.auth),p256dh:ir(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:ir(e.vapidKey)}}}}})).close(),await y(or),await y("fcm_vapid_details_db"),await y("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await pr(e,t),t}}async function pr(e,t){const n=ur(e),i=(await lr()).transaction(sr,"readwrite");return await i.objectStore(sr).put(t,n),await i.done,t}function ur({appConfig:e}){return e.appId}const hr=new r("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function fr({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function gr({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function yr({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const r={web:{endpoint:n,auth:t,p256dh:e}};return i!==Yi&&(r.web.applicationPubKey=i),r}async function mr(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:rr(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:ir(t.getKey("auth")),p256dh:ir(t.getKey("p256dh"))},i=await dr(e.firebaseDependencies);if(i){if(function(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,r=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&i&&r&&o}(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await gr(e),i=yr(t.subscriptionOptions),r={method:"PATCH",headers:n,body:JSON.stringify(i)};let o;try{const n=await fetch(`${fr(e.appConfig)}/${t.token}`,r);o=await n.json()}catch(e){throw hr.create("token-update-failed",{errorInfo:e?.toString()})}if(o.error){const e=o.error.message;throw hr.create("token-update-failed",{errorInfo:e})}if(!o.token)throw hr.create("token-update-no-token");return o.token}(e.firebaseDependencies,t),i={...t,token:n,createTime:Date.now()};return await pr(e.firebaseDependencies,i),n}catch(e){throw e}}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await async function(e,t){const n={method:"DELETE",headers:await gr(e)};try{const i=await fetch(`${fr(e.appConfig)}/${t}`,n),r=await i.json();if(r.error){const e=r.error.message;throw hr.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw hr.create("token-unsubscribe-failed",{errorInfo:e?.toString()})}}(e.firebaseDependencies,i.token)}catch(e){}return wr(e.firebaseDependencies,n)}return wr(e.firebaseDependencies,n)}async function wr(e,t){const n=await async function(e,t){const n=await gr(e),i=yr(t),r={method:"POST",headers:n,body:JSON.stringify(i)};let o;try{const t=await fetch(fr(e.appConfig),r);o=await t.json()}catch(e){throw hr.create("token-subscribe-failed",{errorInfo:e?.toString()})}if(o.error){const e=o.error.message;throw hr.create("token-subscribe-failed",{errorInfo:e})}if(!o.token)throw hr.create("token-subscribe-no-token");return o.token}(e,t),i={token:n,createTime:Date.now(),subscriptionOptions:t};return await pr(e,i),i.token}function br(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const r=t.notification.image;r&&(e.notification.image=r);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const i=t.fcmOptions?.analytics_label;i&&(e.fcmOptions.analyticsLabel=i)}(t,e),t}function vr(e){return hr.create("missing-app-config-values",{valueName:e})}class _r{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=function(e){if(!e||!e.options)throw vr("App Configuration Object");if(!e.name)throw vr("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw vr(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function $r(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const i=setTimeout(()=>n(new Error("Service worker not registered after 10000 ms")),er),r=e.installing||e.waiting;e.active?(clearTimeout(i),t()):r?r.onstatechange=e=>{"activated"===e.target?.state&&(r.onstatechange=null,clearTimeout(i),t())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}(e.swRegistration)}catch(e){throw hr.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function xr(e,t){if(!navigator)throw hr.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw hr.create("permission-blocked");return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Yi)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await $r(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw hr.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),mr(e)}async function Sr(e,t,n){const i=function(e){switch(e){case nr.NOTIFICATION_CLICKED:return"notification_open";case nr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Qi],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function Ar(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===nr.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(br(n)):e.onMessageHandler.next(br(n)));const i=n.data;var r;"object"==typeof(r=i)&&r&&Qi in r&&"1"===i["google.c.a.e"]&&await Sr(e,n.messageType,i)}const kr="@firebase/messaging",Er="0.12.23",Pr=e=>{const t=new _r(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>Ar(t,e)),t},Cr=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>xr(t,e)}};let Ir;t(new n("messaging",Pr,"PUBLIC")),t(new n("messaging-internal",Cr,"PRIVATE")),e(kr,Er),e(kr,Er,"esm2020"),m().useDeviceLanguage(),(async()=>{await async function(){try{await p()}catch(e){return!1}return"undefined"!=typeof window&&d()&&g()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}()&&(Ir=Ji(v))})(),navigator,window;let Tr=!1;window.addEventListener("userEmailChanged",()=>{Tr=!0}),w($,e=>{e?(Tn.dispatch(fn(!0)),Tn.dispatch(yn()),Tn.dispatch(Sn(e.uid)),Tn.dispatch(An(e.displayName||"John Doe")),Tn.dispatch(En(e.email||"")),Tn.dispatch(Pn(e.photoURL||"")),Tn.dispatch(hn(e.displayName||"John Doe")),Tn.dispatch(un(e.photoURL||"")),Tr&&!e.emailVerified?_(e).then(()=>{Tr=!1}).catch(e=>{Tr=!1}):e.emailVerified):(Tn.dispatch(fn(!1)),Tn.dispatch(Sn("")),Tn.dispatch(An("John Doe")),Tn.dispatch(En("")),Tn.dispatch(Pn("")),Tn.dispatch(hn("John Doe")),Tn.dispatch(un("")))});const Or=L`

  .action-button:focus { outline:0; }

  .action-button {
    display:              inline-block;
    box-sizing:           border-box;
    white-space:          nowrap;
    margin:               16px 16px 16px auto;
    font-weight:          400;
    text-align:           center;
    vertical-align:       middle;
    touch-action:         manipulation;
    -webkit-appearance:   button;
    cursor:               pointer;
    font-size:            16px;
    height:               38px;
    line-height:          16px;
    padding:              10px 16px;
    border-radius:        6px;
    color:                var(--pwa_action_text_color, #fff);
    background-color:     var(--pwa_action_background_color, #6cc04a);
    border-color:         var(--pwa_action_border_color, #60b23e);
    box-shadow:           1px 1px 1px grey;
  }

  .saving{
    transition: background-color 0.3s; /* Smooth transition for hover effect */
    background-color:   #D6EBD3;
    border:             0.5px solid black;
    border-radius:      4px;
    height:             50px;
    width:              100%;
    margin:             auto;
    box-shadow:         1px 1px 1px grey;
  }

  /*  */
  .submit:hover  { background-color: #45a049; }

  .submit {
    box-sizing:         border-box;
    width:              100%;
    background-color:   #4CAF50;
    color:              white;
    padding:            14px 20px;
    margin:             8px 0;
    border:             none;
    border-radius:      4px;
    cursor:             pointer;
  }

`,Rr=L`

  label         { font-size: .9em; }
  label {
    display:              grid;
    color:                var(--pwa_label_text_color, black);
    box-sizing:           border-box;
    font-size:            smaller;
    margin-bottom:        0;
    font-weight:          bold;
    line-height:          36px;
    padding:              0 16px;
  }

  @media (max-width: 460px) {

    label { font-size: .8em; }

  }

`,jr=L`

  input[type=text],
  input[type=email],
  input[type=password],
  select {
    box-sizing:               border-box;
    -webkit-box-sizing:       border-box;
    height:                   50px;
    text-align:               left;
    margin:                   0 16px 0 16px;
    padding:                  8px 16px;
    background-color:         var(--pwa_input_background, #E1E5EB);
    border:                   0;
    border-radius:            4px;
    -webkit-border-radius:    4px;
    font-size:                smaller;
    box-shadow:               1px 1px 1px grey;
  }

  input.invalid { background-color: #ffdddd; }

`,Dr=L`
  
  /* Switch Login / Sign-up Button */
  .new {
    padding:            12px;
    border-radius:      4px;
    appearance:         none;
    background-color:   transparent;
    border:             0px;
    color:              inherit;
    cursor:             pointer;
    text-decoration:    underline;
    font-size:          small;
    line-height:        42px;
  }

`;var Ur=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Mr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Nr=class extends Le{constructor(){super(),this.email="",this.password="",this.signIn=async(e,t)=>{const n=x.credential(e,t);await S($,n).catch(e=>{})}}static get styles(){return[Nn,Rr,jr,Or,Dr,L`
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

    `]}render(){return $e`

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

    `}change(){Tn.dispatch(mn())}handleEmail(e){const t=e.target;this.email=t.value}handlePassword(e){const t=e.target;this.password=t.value}_handleSubmit(e){e.preventDefault()}login(){this.email.length<4?alert("Please enter an email address."):this.password.length<4?alert("Please enter a password."):this.signIn(this.email,this.password)}};Ur([We(),Mr("design:type",Object)],Nr.prototype,"email",void 0),Ur([We(),Mr("design:type",Object)],Nr.prototype,"password",void 0),Nr=Ur([Fe("user-log-in"),Mr("design:paramtypes",[])],Nr);var zr=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Lr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Br=class extends Le{constructor(){super(),this.email="",this.password="",this.newAccount=async(e,t)=>{await A($,e,t).then(e=>{const t=e.user;_(t).then(()=>{})}).then(()=>{(async()=>{Gi(Ir,"create_account")})()})}}static get styles(){return[Nn,Rr,jr,Or,Dr,L`
    
      .double {
        display: grid;
        grid-template-columns: 1fr auto;
      }

    `]}render(){return $e`
  
      <!-- Sign Up State-->
      <form
        @submit=${this._handleSubmit}
        autocomplete="on">
        
        <ul>

          <li>
            <label for="pwa-signup-email">Email</label>
            <input
              id="pwa-signup-email"
              type="email"
              @change="${this.handleEmail}">
          </li>

              <!-- <label><input   id="verifyEmail"      type="email"      >Verify Email</label> -->

          <li>
            <label for="pwa-signup-pass">Password</label>
            <input
              id="pwa-signup-pass"
              type="password"
              @change="${this.handlePassword}">
          </li>

          <li>
            <button
              class="newUser action-button"
              @click="${this.signUp}">Sign up</button>
          </li>

          <!-- <label><input   id="veriftPassword"   type="password"   >Verify Password</label> -->

          <!-- Change State -->
          <li>
            <p class="divider">Or</p>
            <button
              class="new"
              @click="${this.change}">login with existing email</button>
          </li>

        </ul>

      </form>

    `}change(){Tn.dispatch(mn())}_handleSubmit(e){e.preventDefault()}handleEmail(e){const t=e.target;this.email=t.value}handlePassword(e){const t=e.target;this.password=t.value}signUp(){this.email.length<4?alert("Please enter an email address."):this.password.length<4?alert("Please enter a password."):this.newAccount(this.email,this.password)}};zr([We(),Lr("design:type",Object)],Br.prototype,"email",void 0),zr([We(),Lr("design:type",Object)],Br.prototype,"password",void 0),Br=zr([Fe("user-sign-up"),Lr("design:paramtypes",[])],Br);var Fr=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Hr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Kr=class extends(Ve(Tn)(Le)){constructor(){super(),this.settingsURL="",this.drawer=!1,this.subscribe=!1,this._name="",this._log=!1,this._sign=!1}stateChanged(e){this._name=e.backend.name,this.drawer=e.frontend.drawer,this._log=e.frontend.login,this._sign=e.frontend.register}firstUpdated(){this.shadowRoot.querySelector(".close").addEventListener("click",()=>{Tn.dispatch(gn())}),this.shadowRoot.querySelector(".leave").addEventListener("click",()=>{this._log&&(async()=>{b($)})(),Tn.dispatch(gn())})}static get styles(){return[Rn,jn,Dn,Un,Mn,Nn]}render(){return $e`

    <!-- Drawer Wrapper -->
    <section
      class="userDrawer ${this.drawer?"opened":"closed"}">

      <!-- Exit Button -->
      <header class="exit">
        <div></div>
        <h3>${this._log?this._name:this._sign===this.subscribe?"Subscribe":"Login"} </h3>
        <button class="close">${On}</button>
      </header>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${!1===this._log}">

        <!-- Log-in State -->
        <user-log-in
          class="spec"
          ?on="${!0===this._sign?!this.subscribe:this.subscribe}"></user-log-in>

        <!-- Sign-up State -->
        <user-sign-up
          class="spec"
          ?on="${!1===this._sign?!this.subscribe:this.subscribe}"></user-sign-up>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${!0===this._log}">

          <p><a href="${this.settingsURL}">Settings</a></p>

          <p><a class="leave" aria-label="log out">log out</a></p>
          
      </div>

    </section>

    `}};Fr([qe({type:String,reflect:!0}),Hr("design:type",Object)],Kr.prototype,"settingsURL",void 0),Fr([qe({type:Boolean,attribute:!0,reflect:!0}),Hr("design:type",Object)],Kr.prototype,"drawer",void 0),Fr([qe({type:Boolean,attribute:!0,reflect:!0}),Hr("design:type",Object)],Kr.prototype,"subscribe",void 0),Fr([We(),Hr("design:type",Object)],Kr.prototype,"_name",void 0),Fr([We(),Hr("design:type",Object)],Kr.prototype,"_log",void 0),Fr([We(),Hr("design:type",Object)],Kr.prototype,"_sign",void 0),Kr=Fr([Fe("user-drawer"),Hr("design:paramtypes",[])],Kr);const qr=L`

  nav { overflow: hidden; }

  /* Navigation Menu */
  nav > ul {
    
    list-style-type:  none;
    margin:           0px;
    padding:          0px;
    display:          grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap:         8px;

  }

  /* Navigation Button */
  nav > ul > li > button {

    color:            var(--pwa_nav_button, grey);
    border:           0;
    width:            100%;
    height:           36px;
    margin:           auto;
    padding:          0px;
    font-weight:      800;
    font-size:        .8em;
    border-radius:    5px;
    background-color: transparent;

  }

  /* Navigation Button - Active */
  nav > ul > li > button[on] {

    color: var(--pwa_nav_select, black);

  }

  /* Navigation Button - Hover */
  nav > ul > li > button:hover {

    cursor:           pointer;

  }

  section[on]     { display:           grid; }
  section         { display:           none; }

`;var Wr=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Vr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Jr extends(Ve(Tn)(Le)){constructor(){super(),this.photo="",this.emptyArtwork="",this.user="",this.login=!1,this.progress=0,this.error="",this.status="",this.dispatchPhoto=async e=>{$.currentUser&&(await k($.currentUser,{photoURL:e}).catch(e=>{}),Tn.dispatch(Pn(e)))},this.progress=0,this.error="",this.status=""}stateChanged(e){this.login=e.frontend.login,this.user=e.backend.userId,this.photo=e.backend.photoURL}static get styles(){return[Rr,L`

      :host {
        box-sizing:               border-box;
        -webkit-box-sizing:       border-box;
        display:                  grid;
        grid-template-columns:    1fr;
        grid-gap:                 4px;
        width:                    100%;
      }

      input[type=file] {
        border-radius:            50%;
        overflow:                 hidden;
        margin:                   auto;
        border:                   2px solid #303030;
        box-shadow:               1px 1px 2px black, 0 0 25px grey, 0 0 5px #fff;
      }

    `]}render(){return $e`
<label
    for="pwa-uploader"
    style="
      grid-template-columns: auto 1fr;
      grid-gap:16px;
      padding: 0 16px;
    ">Upload:
    <progress
      id      ="pwa-uploader"
      class   ="uploader"
      value   ="0"
      max     ="100"
      style="
        height:       24px;
        width:        100%;
        margin:       auto;
      "></label>

  

    <!-- Input - Upload Image -->
    <input
      id      ="photoURL"
      type    ="file"
      name    ="photoURL"
      class   ="contractorPhoto"
      accept  ="image/*"
      @change ="${this.saveImage}"
      ?disabled="${!1===this.login}"
      style   ="
        display:        none;
        cursor:         pointer;
        position:       absolute;
        z-index:        -1;
      "/></progress>

    <label
      style="
        border: 2px dashed;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 16px;
        padding: 0 16px 16px 16px;
      "
      for ="photoURL">Photo:
    
      <!-- Output - Retrieved Image -->
      <canvas
        style="
          margin:                 auto;
          height:                 200px;
          width:                  100%;
          background-image:       url(${this.photo?this.photo:this.emptyArtwork});
          background-size:        contain;
          background-repeat:      no-repeat;
          background-position:    center;
          cursor:                 pointer;
          overflow:               hidden;
          box-sizing:             border-box;
        ">
        </canvas>

    </label>

       <p style="text-align:center;">${this.status}${this.error}</p>
      `}async saveImage(){const e=this.shadowRoot.querySelector(".uploader");if($.currentUser){this.error="",this.status="Uploading...";const t=this.shadowRoot.querySelector("#photoURL");if(!t)return;const n=E(P,"/pwa-auth/"+this.user+"/"+t.files[0].name),i={cacheControl:"public,max-age=300",contentType:t.files[0].type},r=C(n,t.files[0],i);r.on("state_changed",t=>{switch(this.progress=t.bytesTransferred/t.totalBytes*100,this.status=`Upload is ${Math.round(this.progress)}% done`,t.state){case"paused":this.status="Upload is paused";break;case"running":this.status=`Upload is running (${Math.round(this.progress)}%)`}let n=0;t.totalBytes>0&&(n=t.bytesTransferred/t.totalBytes*100),isFinite(n)?(e.value=n,e.textContent=`${Math.round(n)}%`):(e.value=0,e.textContent="0%")},t=>{this.error=`Upload failed: ${t.message}`,this.status="",e.value=0,e.textContent="Error"},async()=>{await I(r.snapshot.ref).then(t=>{T(n,i).then(()=>{}).catch(e=>{}),O&&(k(O,{photoURL:t}).then(()=>{e.value=100,e.textContent="Complete"}),this.status="User profile updated successfully!",this.dispatchPhoto(t))}).catch(()=>{})})}}}Wr([qe(),Vr("design:type",Object)],Jr.prototype,"photo",void 0),Wr([qe({type:String,reflect:!0}),Vr("design:type",Object)],Jr.prototype,"emptyArtwork",void 0),Wr([We(),Vr("design:type",Object)],Jr.prototype,"user",void 0),Wr([We(),Vr("design:type",Boolean)],Jr.prototype,"login",void 0),Wr([We(),Vr("design:type",Number)],Jr.prototype,"progress",void 0),Wr([We(),Vr("design:type",String)],Jr.prototype,"error",void 0),Wr([We(),Vr("design:type",String)],Jr.prototype,"status",void 0),customElements.define("contact-photo",Jr);var Gr=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Xr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Zr extends(Ve(Tn)(Le)){constructor(){super(),this.value="",this.login=!1,this.default=e=>{e.preventDefault()},this.alertProfile=async()=>{$.currentUser?await k($.currentUser,{displayName:this.value}).then(()=>{Tn.dispatch(An(this.value))}).then(()=>{alert("updated name:"+this.value)}):alert("Please Login")}}stateChanged(e){this.login=e.frontend.login,this.value=e.backend.name}static get styles(){return[Rr,jr,Or,L`

      :host, form { display: grid; }

    `]}render(){return $e`

      <form
        @submit="${this.default}">
  
        <label
          for="pwa-name"><span>Name:</span></label>

          <input
            id            = "pwa-name"
            name          = "username"
            type          = "text"
            data-label    = "Contact Name"
            @input        = "${this.handleInput}"
            .value        = "${this.value}" />
    
        <!-- Save to Database -->
        <button
          class="action-button save"
          @click="${this.alertProfile}"
          ?disabled="${!1===this.login}">Update</button>

      </form>

    `}handleInput(e){const t=e.target;this.value=t.value}}Gr([qe({type:String,reflect:!0}),Xr("design:type",Object)],Zr.prototype,"value",void 0),Gr([We(),Xr("design:type",Boolean)],Zr.prototype,"login",void 0),customElements.define("input-name",Zr);var Yr=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},Qr=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class eo extends(Ve(Tn)(Le)){constructor(){super(),this.email="",this.login=!1,this.mail="",this.default=e=>{e.preventDefault()},this.saveEmail=async()=>{if($.currentUser){let e=this.shadowRoot?.querySelector("#pwa-email");await R($.currentUser,e.value).catch(e=>{});const t=new CustomEvent("userEmailChanged",{detail:{email:e.value}});window.dispatchEvent(t),alert("Email Updated")}}}stateChanged(e){this.login=e.frontend.login,this.mail=e.backend.email}handleEmail(e){const t=e.target;this.mail=t.value}static get styles(){return[Rr,jr,Or,L`
    
      :host {
        display:      grid;
      }

      form { display: grid; }

    `]}render(){return $e`

    <form
      autocomplete="off"
      @submit="${this.default}">

      <label for="pwa-email" >E-mail:</label>

      <input
        id            = "pwa-email"
        name          = "email"
        type          = "email"
        class         = "email"
        data-label    = "Account Email"
        @input        = "${this.handleEmail}"
        .value        = "${this.mail}"/>

      <button
        class         = "action-button" 
        @click        = "${this.saveEmail}"
        ?disabled     = "${!1===this.login}">Update</button>

    </form>

    `}}Yr([qe({type:String,reflect:!0}),Qr("design:type",Object)],eo.prototype,"email",void 0),Yr([We(),Qr("design:type",Boolean)],eo.prototype,"login",void 0),Yr([We(),Qr("design:type",String)],eo.prototype,"mail",void 0),customElements.define("contact-email",eo);var to=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},no=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class io extends(Ve(Tn)(Le)){constructor(){super(),this.message="",this.password="",this.login=!1,this.default=e=>{e.preventDefault()},this.updatePass=async e=>{$.currentUser?await j($.currentUser,e).then(()=>{}).catch(e=>{}):alert("Please Login")}}firstUpdated(){this.shadowRoot.querySelector(".pass").addEventListener("click",()=>{this.alertPassword()})}stateChanged(e){this.login=e.frontend.login}handleInputChange(e){const t=e.target;this.password=t.value}static get styles(){return[Rr,jr,Or,L`

      :host{
        display:        grid;
      }

      form { display: grid; }

      p.error { color: red; }
    
    `]}render(){return $e`

      <form
        autocomplete="off"
        @submit="${this.default}">

        <!-- Input - 1 -->
        <label for="pwa-new-password">New Password</label>

        <input
          id      = "pwa-new-password"
          name    = "new_password"
          type    = "password"
          .value  = "${this.password}"
          @input  = "${this.handleInputChange}"
          aria-describedby = "password-help">

        <!-- Input - 2 -->
        <label for="pwa-verify-password">Verify Password</label>

        <input
          id      = "pwa-verify-password"
          name    = "verify_password"
          type    = "password">

        <!-- Submit -->
        <button
          class="action-button pass"
          ?disabled="${!1===this.login}">Update</button>

        ${this.message?$e`

            <p
              class=${this.message.includes("Password entered")?"":"error"}
              aria-live="polite">

              ${this.message}

            </p>

          `:""}

      </form>

    `}alertPassword(){this.password?this.password.length<8?this.message="Password must be at least 8 characters long":(this.message="Password entered:",/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)?$.currentUser?this.updatePass(this.password):alert("Please Login"):this.message="Password must include letters, numbers, and be 8+ characters"):this.message="Please enter a password"}}to([We(),no("design:type",String)],io.prototype,"message",void 0),to([We(),no("design:type",String)],io.prototype,"password",void 0),to([We(),no("design:type",Boolean)],io.prototype,"login",void 0),customElements.define("input-password",io);var ro=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},oo=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ao extends(Ve(Tn)(Le)){constructor(){super(),this.login=!1,this.email="",this.officialDelete=async()=>{if($.currentUser)return $.currentUser.delete().then(()=>{}).catch(()=>{});alert("Please Sign-in")}}firstUpdated(){this.shadowRoot.querySelector(".deleteUser").addEventListener("click",()=>{this.alertDelete()})}stateChanged(e){this.login=e.frontend.login,this.email=e.backend.email}static get styles(){return[Or,L`

    :host {
      display:                  grid;
      grid-template-rows:       auto auto;
    }
    
    p {
      padding:              0 16px;
    }

    `]}render(){return $e`

      <p>Permanently delete the user account and data related to: ${this.email}</p>

      <button
        class="action-button deleteUser"
        ?disabled="${!1===this.login}">Delete</button>

    `}alertDelete(){$.currentUser?this.deleteUser():alert("Please Login")}deleteUser(){1==confirm("Delete Account?")&&this.officialDelete()}}ro([We(),oo("design:type",Boolean)],ao.prototype,"login",void 0),ro([We(),oo("design:type",String)],ao.prototype,"email",void 0),customElements.define("delete-user",ao);var so=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},co=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let lo=class extends(Ve(Tn)(Le)){constructor(){super(),this.emptyArtwork="",this.profileTopic="",this.name=""}firstUpdated(){this.querySelectorAll("form").forEach(e=>{e.preventDefault()}),this.shadowRoot.querySelector("button[value=profile]").addEventListener("click",()=>{Tn.dispatch(pn("profile"))}),this.shadowRoot.querySelector("button[value=verification]").addEventListener("click",()=>{Tn.dispatch(pn("verification"))}),this.shadowRoot.querySelector("button[value=password]").addEventListener("click",()=>{Tn.dispatch(pn("password"))}),this.shadowRoot.querySelector("button[value=delete]").addEventListener("click",()=>{Tn.dispatch(pn("delete"))})}stateChanged(e){this.profileTopic=e.frontend.settings,this.name=e.backend.name}static get styles(){return[qr,Nn,L`

      /* Button Padding for Border Outline */
      :host {
        display:          grid;
        background-color: var(--pwa_settings_background, white);
      }

      /* Page Form */
      form {
        box-sizing:       border-box;
        display:          grid;
        border:           0;
      }

      /* Page Title  */
      .pageTitle { margin: 0; }

      h2 {
        color:            var(--pwa_section_header, black);
        text-align:       center;
        text-shadow:      1px 1px 2px black, 0 0 15px grey, 0 0 5px #fff;
        
        border-top:       2px solid var(--pwa_divider, black);
        border-bottom:    2px solid var(--pwa_divider, black);

        margin:           0;
        padding:          8px 0;
      }

      /* up to 576 pixels */
      @media only screen and (max-width: 576px) {
        h2 {
          font-size: medium;
        }
      }

    `]}render(){return $e`
    
      <!-- Page Menu -->
      <nav>

        <ul>

          <li>
            <button
              value="profile"
              ?on="${"profile"===this.profileTopic}">Icon
            </button>
          </li>

          <li>
            <button
              value="verification"
              ?on="${"verification"===this.profileTopic}">Profile
            </button>
          </li>

          <li>
            <button 
              value="password"
              ?on="${"password"===this.profileTopic}">Password
            </button>
          </li>

          <li>
            <button
              value="delete"
              ?on="${"delete"===this.profileTopic}">Delete
            </button>
          </li>

        </ul>

      </nav>

      <!-- Page 1: Profile -->
      <section ?on="${"profile"===this.profileTopic}">

        <!-- Display Username -->
        <h2>${this.name}</h2>

        <!-- Custom Image Element - Display / Upload -->
        <contact-photo emptyArtwork="${this.emptyArtwork}"></contact-photo>

      </section>
      
      <!-- Page 2: Verification -->
      <section ?on="${"verification"===this.profileTopic}">

        <!-- Page Title -->
        <h2>Contact Information</h2>

        <!-- Custom - Username -->
        <input-name></input-name>

        <!-- Custom - Email -->
        <contact-email></contact-email>
        
        <!-- Indicator - Verified -->
        <div class="verified"></div>

      </section>

      <!-- Page 3: Password -->
      <section ?on="${"password"===this.profileTopic}">

        <!-- Page Title -->
        <h2>Password</h2>

        <!-- Custom - Password -->
        <input-password></input-password>

      </section>

      <!-- Page 4: Delete -->
      <section ?on="${"delete"===this.profileTopic}">

        <!-- Page Title -->
        <h2>Delete Account</h2>

        <!-- Custom - Delete -->
        <delete-user></delete-user>

      </section>

    `}};so([qe({type:String,reflect:!0}),co("design:type",Object)],lo.prototype,"emptyArtwork",void 0),so([We(),co("design:type",Object)],lo.prototype,"profileTopic",void 0),so([We(),co("design:type",Object)],lo.prototype,"name",void 0),lo=so([Fe("user-settings"),co("design:paramtypes",[])],lo);const po=L`

  :host {
    margin:                   auto;
    display:                  grid;
  }

  /* Shared Styles */
  .icon, .login {
    cursor:                   pointer;
    margin:                   auto;
    overflow:                 hidden;
    border:                   var(--pwa_icon_border, 2px solid black);
    background-color:         var(--pwa_icon_background, #6cc04a);
    color:                    white;
    font-size:                15px;
    text-decoration:          none;
    transition-duration:      2s; 
  }

  /* Hover Styles */
  .icon:hover,
  .login:hover {
    background-color:         var(--pwa_icon_hover, lightgrey);
  }

  /* Logged-in State: The Icon Button */
  .icon {
    height:                   var(--pwa_icon_diameter, 32px);
    width:                    var(--pwa_icon_diameter, 32px);
    border-radius:            50%;
    padding:                  0;
  }

  /* The Login Button */
  .login {
    width:                    auto;
    border-radius:            var(--pwa_icon_radius, 6px);
    height:                   var(--pwa_icon_height, 32px);
    padding:                  var(--pwa_icon_padding, 0px 16px);
    font-family:              var(--pwa_icon_font, 'Arial', sans-serif);
    font-weight:              500;
    text-align:               center;
  }

  /* Icon Artwork */
  .userImage {
    object-fit:               cover; 
    transition-property:      all;
    transition-duration:      2s;
    clip-path:                circle(50%);
    overflow:                 hidden;
    width:                    calc(var(--pwa_icon_diameter, 32px) - 2px);
    height:                   calc(var(--pwa_icon_diameter, 32px) - 2px);
    margin:                   auto;
  }  
  
`;var uo=function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},ho=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let fo=class extends(Ve(Tn)(Le)){constructor(){super(),this.subscribe=!1,this.emptyArtwork="",this._user=!1,this._photoURL=""}firstUpdated(){this.shadowRoot.querySelector(".toggles").addEventListener("click",()=>{Tn.dispatch(gn())})}stateChanged(e){this._user=e.frontend.login,this._photoURL=e.backend.photoURL}static get styles(){return[po]}render(){return $e`

      <!-- two classes: icon / login -->
      <button
        class="${this._user?"icon":"login"} toggles"
        aria-label="login">
        
        ${this._user?$e`
       <!--   <div
            class   = "iconArea"> -->
            <input
              type    = "image"
              class   = "userImage"
              alt     = "Login"
              height  = "38px"
              width   = "38px"
              src     = "${this._photoURL?this._photoURL:this.emptyArtwork}">
       <!--   </div> -->
          `:this.subscribe?"Subscribe":"Login"}

      </button>

    `}};uo([qe({type:Boolean,reflect:!0}),ho("design:type",Object)],fo.prototype,"subscribe",void 0),uo([qe({type:String,reflect:!0}),ho("design:type",Object)],fo.prototype,"emptyArtwork",void 0),uo([We(),ho("design:type",Object)],fo.prototype,"_user",void 0),uo([We(),ho("design:type",Object)],fo.prototype,"_photoURL",void 0),fo=uo([Fe("user-icon"),ho("design:paramtypes",[])],fo);export{Kr as UserDrawer,fo as UserIcon,lo as UserSettings};
//# sourceMappingURL=pwa-auth.js.map
