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
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { close } from '../css/svg.js';
import { show } from '../css/toggle.js';
import { listStyle } from '../form/css/list.js';
import { drawerStyle } from './css/drawer.js';
import { exitStyle } from './css/exit.js';
import { linkStyle } from './css/link.js';
import { lineStyle } from './css/paragraph.js';
import { closeSign } from '../../redux/session.js';
import { logOut } from '../../firebase/interface.js';
import { refreshEmailVerified } from '../../api/verify.js';
import { applyFirebaseConfig } from '../../firebase/attribute.js';
import { pwaDrawerToggleName, pwaSettings } from '../../events/names.js';
import { emitElement } from '../../events/emit.js';
import { deepActive, focusable } from './keys.js';
import { accountTitle } from '../form/letters.js';
import { noticeStyle } from '../form/css/notice.js';
import { onVerificationNotice, verificationNotice } from '../form/notice.js';
import { verifiedMark, verifiedStyle } from '../form/verified.js';
import '../settings/input/verify.js';
import '../form/login.js';
import '../form/signup.js';
import { animation, drawerShell } from '../css/animation.js';
import { tapStyle } from '../css/tap.js';
/** Room under the sheet so its shadow is not clipped. The clip does not ease. */
const shadowRoom = 60;
let UserDrawer = class UserDrawer extends connect(store)(LitElement) {
    constructor() {
        super();
        /** @attr url */
        this.url = '';
        /** @attr drawer */
        this.drawer = false; // Drawer State
        /** @attr subscribe */
        this.subscribe = false; // Drawer State
        /** @attr hide-google */
        this.hideGoogle = false;
        this.name = ""; // String Username
        this.email = "";
        this.verified = false;
        this.notice = "";
        this.user = false; // True user is logged-in, false, user is logged-out, state
        /** What the sheet paints. Stays on the account menu until a logout close reaches 0. */
        this.sheetSigned = false;
        this.holdSheet = false;
        this.openSheetPx = 0;
        this.liveName = '';
        this.liveEmail = '';
        this.liveVerified = false;
        this.signup = false; // True sign-up, false log-in, State
        /** True while the panel is open or still rolling shut. Drops on transitionend. */
        this.sliding = false;
        /** Arms the form-swap transition. False on the first paint. */
        this.motion = false;
        /** Clip height. 0px is shut. auto is the resting open size. It does not ease. */
        this.clipHeight = '0px';
        /** Spare padding under an open sheet at rest, for the shadow. 0 while shut or rolling. */
        this.clipPad = '0px';
        /** Sheet translate. -100% parks the sheet above the clip. */
        this.sheetShift = 'translate3d(0, -100%, 0)';
        /** True only while this drawer's clip and sheet are easing open or shut. */
        this.rollMotion = false;
        /** True while an open sheet's bottom edge eases to a new height. The header stays put. */
        this.resizeMotion = false;
        /** Face translate. The opposite of the sheet translate during a resize, so the header stays pinned. */
        this.faceShift = 'none';
        /** A form switch that started while open/close was already rolling. */
        this.switchMidRoll = false;
        /** Height the in-flight close was aimed at. A later layout can retarget it. */
        this.closeFor = 0;
        /** Drops a close measurement that was queued for a drawer that opened again. */
        this.closeToken = 0;
        this.closingNow = false;
        this.closeObserver = null;
        this.booted = false;
        this.wasOpen = false;
        this.sawOpen = false;
        this.returnFocus = null;
        this.stopNotice = null;
        this.heldHeight = null;
        this.columnWidth = 0;
        this.columnObserver = null;
        // Required - visibility drops when the sheet's transform finishes at 0.
        // A form transition inside the sheet does not count.
        this.onClipEnd = (event) => {
            if (!(event instanceof TransitionEvent))
                return;
            if (event.target !== event.currentTarget)
                return;
            if (event.propertyName !== 'transform')
                return;
            const sheet = event.currentTarget;
            if (!(sheet instanceof HTMLElement))
                return;
            if (this.drawer) {
                this.restOpen();
                return;
            }
            if (this.shownPx(sheet) > 1) {
                const h = this.contentPx(sheet);
                if (Math.abs(h - this.closeFor) > 1) {
                    this.finishRollUp();
                    return;
                }
            }
            this.sliding = false;
            this.restShut();
            this.releaseSheet();
        };
        // Required - Escape closes. Tab stays inside the open drawer.
        this.onKey = (event) => {
            if (!this.drawer)
                return;
            if (event.key === 'Escape') {
                event.preventDefault();
                store.dispatch(closeSign());
                return;
            }
            if (event.key !== 'Tab')
                return;
            const items = focusable(this);
            if (!items.length)
                return;
            const first = items[0];
            const last = items[items.length - 1];
            const active = deepActive();
            const inside = active ? items.includes(active) : false;
            if (event.shiftKey) {
                if (!inside || active === first) {
                    event.preventDefault();
                    last.focus({ preventScroll: true });
                }
                return;
            }
            if (!inside || active === last) {
                event.preventDefault();
                first.focus({ preventScroll: true });
            }
        };
        // Required - a host link or button in a slot closes the drawer. preventDefault keeps it open.
        this.onLightClick = (event) => {
            if (event.defaultPrevented)
                return;
            const target = event.target;
            if (!(target instanceof Element))
                return;
            const control = target.closest('a, button');
            if (!(control instanceof HTMLElement))
                return;
            if (!this.contains(control))
                return;
            if (this.shadowRoot?.contains(control))
                return;
            store.dispatch(closeSign());
        };
        this.onSettings = (event) => {
            const url = this.destination();
            const proceed = this.dispatchEvent(new CustomEvent(pwaSettings, {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { url }
            }));
            if (!proceed) {
                event.preventDefault();
                return;
            }
            store.dispatch(closeSign());
            if (url)
                return;
            event.preventDefault();
            const settings = document.querySelector('user-settings');
            if (settings instanceof HTMLElement)
                settings.scrollIntoView({ block: 'nearest' });
        };
    }
    connectedCallback() {
        applyFirebaseConfig(this);
        if (!this.id)
            this.id = 'pwa-user-drawer';
        super.connectedCallback();
        this.addEventListener('keydown', this.onKey);
        this.addEventListener('click', this.onLightClick);
        this.notice = verificationNotice();
        this.stopNotice = onVerificationNotice(() => { this.notice = verificationNotice(); });
    }
    disconnectedCallback() {
        this.removeEventListener('keydown', this.onKey);
        this.removeEventListener('click', this.onLightClick);
        this.stopNotice?.();
        this.stopNotice = null;
        this.columnObserver?.disconnect();
        this.columnObserver = null;
        super.disconnectedCallback();
    }
    stateChanged(state) {
        const open = state.session.drawer; // Drawer State
        const wasOpen = this.drawer;
        const wasSigned = this.user === true;
        this.liveName = state.session.name;
        this.liveEmail = state.session.email;
        this.liveVerified = Boolean(state.session.verified);
        if (open)
            this.sliding = true;
        else if (this.reduced())
            this.sliding = false;
        this.drawer = open;
        this.user = state.session.login; // Logged in-out State
        this.signup = state.session.registerOne; // Sign-up State
        this.paintAccount(wasSigned, wasOpen);
        // Required - UI event from this element. Skip the closed state on first read.
        const changed = this.sawOpen ? open !== this.wasOpen : open;
        if (changed) {
            emitElement(this, pwaDrawerToggleName, { open });
        }
        this.wasOpen = open;
        this.sawOpen = true;
    }
    // Required - a logout close keeps the account menu until the clip is shut, so the roll measures that sheet.
    paintAccount(wasSigned, wasOpen) {
        if (this.user === true) {
            this.holdSheet = false;
            this.name = this.liveName;
            this.email = this.liveEmail;
            this.verified = this.liveVerified;
            this.sheetSigned = true;
            return;
        }
        if (wasSigned && wasOpen) {
            const sheet = this.sheet();
            const measured = sheet ? sheet.getBoundingClientRect().height : 0;
            if (measured > 1)
                this.openSheetPx = measured;
            this.holdSheet = true;
            this.sheetSigned = true;
            return;
        }
        if (this.holdSheet)
            return;
        this.name = this.liveName;
        this.email = this.liveEmail;
        this.verified = this.liveVerified;
        this.sheetSigned = false;
    }
    releaseSheet() {
        if (!this.holdSheet)
            return;
        this.holdSheet = false;
        this.name = this.liveName;
        this.email = this.liveEmail;
        this.verified = this.liveVerified;
        this.sheetSigned = this.user === true;
    }
    willUpdate(changed) {
        if (!this.booted) {
            if (this.drawer)
                this.restOpen();
            return;
        }
        if (changed.has('signup'))
            this.motion = true;
        if (changed.has('drawer') || !changed.has('signup') || !this.drawer)
            return;
        const sheet = this.sheet();
        if (!sheet)
            return;
        this.switchMidRoll = this.rollMotion;
        this.heldHeight = this.shownPx(sheet);
        if (!this.switchMidRoll)
            return;
        this.rollMotion = false;
        this.clipPad = '0px';
        this.clipHeight = `${this.heldHeight + shadowRoom}px`;
        this.sheetShift = 'translate3d(0, 0, 0)';
    }
    updated(changed) {
        const boot = !this.booted;
        this.booted = true;
        if (!boot && changed.has('drawer')) {
            this.heldHeight = null;
            if (this.drawer)
                this.unroll();
            else
                this.rollUp();
        }
        else if (!boot && this.heldHeight != null && this.drawer) {
            const from = this.heldHeight;
            const midRoll = this.switchMidRoll;
            this.heldHeight = null;
            this.switchMidRoll = false;
            const clip = this.clip();
            const sheet = this.sheet();
            if (clip && sheet) {
                const to = this.contentPx(sheet);
                if (Math.abs(to - from) <= 1)
                    this.restOpen();
                else if (midRoll)
                    this.rollBetween(clip, sheet, from, to, to);
                else
                    this.resizeBetween(clip, sheet, from, to);
            }
        }
        if (boot)
            requestAnimationFrame(() => { this.motion = true; });
        if (!changed.has('drawer'))
            return;
        if (this.drawer) {
            const active = deepActive();
            this.returnFocus = active && !this.contains(active) ? active : this.returnFocus;
            this.shadowRoot?.querySelector('.close')?.focus({ preventScroll: true });
            void refreshEmailVerified(false);
            return;
        }
        const back = this.returnFocus ?? this.toggleButton();
        back?.focus({ preventScroll: true });
        this.returnFocus = null;
    }
    clip() {
        return this.shadowRoot?.querySelector('.drawer-clip') ?? null;
    }
    sheet() {
        return this.shadowRoot?.querySelector('.userDrawer') ?? null;
    }
    face() {
        return this.shadowRoot?.querySelector('.drawer-face') ?? null;
    }
    // Required - the account button, when nothing else had focus at open.
    toggleButton() {
        const icon = document.querySelector('user-icon');
        const button = icon?.shadowRoot?.querySelector('button');
        return button instanceof HTMLElement ? button : null;
    }
    reduced() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    // Required - closed, no transition. The clip collapses so nothing below can be hit.
    restShut() {
        this.rollMotion = false;
        this.resizeMotion = false;
        this.closeFor = 0;
        this.closeObserver?.disconnect();
        this.closeObserver = null;
        this.clipHeight = '0px';
        this.clipPad = '0px';
        this.sheetShift = 'translate3d(0, -100%, 0)';
        this.faceShift = 'none';
        const sheet = this.sheet();
        if (sheet)
            sheet.style.minHeight = '';
        const face = this.face();
        if (face)
            face.style.transform = '';
    }
    // Required - open at content size. Padding keeps the shadow. No transition.
    restOpen() {
        this.rollMotion = false;
        this.resizeMotion = false;
        this.clipHeight = 'auto';
        this.clipPad = `${shadowRoom}px`;
        this.sheetShift = 'none';
        this.faceShift = 'none';
        const sheet = this.sheet();
        if (sheet)
            sheet.style.minHeight = '';
        const face = this.face();
        if (face)
            face.style.transform = '';
    }
    // The clip jumps. It never eases height or max-height. Only the sheet transforms.
    clipStyle() {
        const height = this.clipHeight;
        return {
            height,
            maxHeight: height === 'auto' ? 'none' : height,
            paddingBottom: this.clipPad,
            transition: 'none',
        };
    }
    sheetStyle() {
        const travel = (this.rollMotion || this.resizeMotion) && !this.reduced();
        return {
            transform: this.sheetShift,
            transition: travel ? 'transform var(--pwa_slide, 2s) ease-in-out' : 'none',
        };
    }
    faceStyle() {
        const travel = this.resizeMotion && !this.reduced();
        return {
            transform: this.faceShift,
            transition: travel ? 'transform var(--pwa_slide, 2s) ease-in-out' : 'none',
        };
    }
    // How far the sheet is shifted right now. none is 0. A percent is of the sheet's own height.
    liveShift(sheet) {
        const raw = getComputedStyle(sheet).transform;
        if (!raw || raw === 'none')
            return 0;
        const percent = raw.match(/translate3d\(\s*[^,]+,\s*(-?[\d.]+)%/);
        if (percent)
            return sheet.getBoundingClientRect().height * (parseFloat(percent[1]) / 100);
        const px = raw.match(/translate3d\(\s*[^,]+,\s*(-?[\d.]+)px/);
        if (px)
            return parseFloat(px[1]);
        if (!raw.includes('%')) {
            try {
                if (typeof DOMMatrixReadOnly === 'function')
                    return new DOMMatrixReadOnly(raw).m42;
            }
            catch { /* happy-dom rejects some transform strings */ }
        }
        const match = raw.match(/matrix(?:3d)?\(([^)]+)\)/);
        if (!match)
            return 0;
        const parts = match[1].split(',').map((part) => parseFloat(part));
        return raw.startsWith('matrix3d') ? parts[13] : parts[5];
    }
    // Visible window: sheet height plus its translate. Exact px, not rounded.
    shownPx(sheet) {
        return Math.max(0, sheet.getBoundingClientRect().height + this.liveShift(sheet));
    }
    // Required - the sheet is the only mover. Open from 0 is translate -H → 0.
    unroll() {
        const clip = this.clip();
        const sheet = this.sheet();
        if (!clip || !sheet)
            return;
        this.scrollTop = 0;
        this.placeAnchor();
        const target = this.sheetPx(clip, sheet);
        const from = this.shownPx(sheet);
        this.rollBetween(clip, sheet, from, target, target);
    }
    // Drop a resize pin so a close measures the menu that is actually on screen.
    releasePinForClose() {
        this.resizeMotion = false;
        this.faceShift = 'none';
        const face = this.face();
        if (face) {
            face.style.transition = 'none';
            face.style.transform = 'none';
        }
        if (this.holdSheet && this.openSheetPx > 1)
            return;
        const sheet = this.sheet();
        if (sheet)
            sheet.style.minHeight = '';
    }
    rollUp() {
        this.releasePinForClose();
        const token = ++this.closeToken;
        // The signed-in menu's children lay out after this update. Measure then.
        requestAnimationFrame(() => {
            if (token !== this.closeToken || this.drawer)
                return;
            this.finishRollUp();
        });
    }
    finishRollUp() {
        if (this.closingNow || this.drawer)
            return;
        const clip = this.clip();
        const sheet = this.sheet();
        if (!clip || !sheet)
            return;
        this.closingNow = true;
        this.placeAnchor();
        let current = this.contentPx(sheet);
        let from = this.shownPx(sheet);
        if (this.holdSheet && this.openSheetPx > 1) {
            from = this.openSheetPx;
            current = this.openSheetPx;
            sheet.style.minHeight = `${this.openSheetPx}px`;
        }
        if (!(Math.abs(current - this.closeFor) <= 1 && this.rollMotion && this.shownPx(sheet) <= 1)) {
            this.closeFor = current;
            this.rollBetween(clip, sheet, from, 0, current);
            if (this.rollMotion)
                this.watchCloseSize(sheet);
        }
        this.closingNow = false;
        if (this.reduced())
            this.sliding = false;
    }
    // If the menu grows after the close has started, aim the roll at the new height.
    watchCloseSize(sheet) {
        if (typeof ResizeObserver === 'undefined')
            return;
        this.closeObserver?.disconnect();
        this.closeObserver = new ResizeObserver(() => {
            if (this.drawer || !this.rollMotion)
                return;
            const h = this.contentPx(sheet);
            if (Math.abs(h - this.closeFor) > 1)
                this.finishRollUp();
        });
        this.closeObserver.observe(sheet);
    }
    // Content height. A resize min-height would report the taller box, so it is lifted for the read.
    contentPx(sheet) {
        const minHeight = sheet.style.minHeight;
        sheet.style.minHeight = '';
        const px = sheet.getBoundingClientRect().height;
        sheet.style.minHeight = minHeight;
        return px;
    }
    // Sheet height in px. The clip cap is released for the read and put back. No paint.
    sheetPx(clip, sheet) {
        const transition = clip.style.transition;
        const maxHeight = clip.style.maxHeight;
        const height = clip.style.height;
        const pad = clip.style.paddingBottom;
        clip.style.transition = 'none';
        clip.style.maxHeight = 'none';
        clip.style.height = 'auto';
        clip.style.paddingBottom = '0px';
        const px = this.contentPx(sheet);
        clip.style.height = height;
        clip.style.maxHeight = maxHeight;
        clip.style.paddingBottom = pad;
        clip.style.transition = transition;
        return px;
    }
    // Set the clip to the taller end, plus shadow room, with no transition.
    // Ease only the sheet. translateY = window − sheetHeight, so the bottom stays glued.
    rollBetween(clip, sheet, from, to, sheetHeight) {
        const start = from - sheetHeight;
        const end = to - sheetHeight;
        const shift = (px) => `translate3d(0, ${px}px, 0)`;
        if (this.reduced() || Math.abs(to - from) <= 1) {
            if (to === 0) {
                this.restShut();
                this.releaseSheet();
            }
            else
                this.restOpen();
            return;
        }
        const room = Math.max(from, to) + shadowRoom;
        const move = 'transform var(--pwa_slide, 2s) ease-in-out';
        clip.style.transition = 'none';
        sheet.style.transition = 'none';
        clip.style.height = `${room}px`;
        clip.style.maxHeight = `${room}px`;
        clip.style.paddingBottom = '0px';
        sheet.style.transform = shift(start);
        void sheet.offsetHeight;
        sheet.style.transition = move;
        sheet.style.transform = shift(end);
        this.rollMotion = true;
        this.resizeMotion = false;
        this.clipHeight = `${room}px`;
        this.clipPad = '0px';
        this.sheetShift = shift(end);
        this.faceShift = 'none';
        const face = this.face();
        if (face) {
            face.style.transition = 'none';
            face.style.transform = 'none';
        }
    }
    // Top stays pinned. The sheet's bottom edge travels old → new. The face moves
    // the other way by the same amount, on the same clock, so the header does not jump.
    resizeBetween(clip, sheet, from, to) {
        const face = this.face();
        if (!face) {
            this.rollBetween(clip, sheet, from, to, to);
            return;
        }
        const top = Math.max(from, to);
        const shift = (px) => `translate3d(0, ${px}px, 0)`;
        if (this.reduced() || Math.abs(to - from) <= 1) {
            this.restOpen();
            return;
        }
        const room = top + shadowRoom;
        const move = 'transform var(--pwa_slide, 2s) ease-in-out';
        clip.style.transition = 'none';
        sheet.style.transition = 'none';
        face.style.transition = 'none';
        clip.style.height = `${room}px`;
        clip.style.maxHeight = `${room}px`;
        clip.style.paddingBottom = '0px';
        sheet.style.minHeight = `${top}px`;
        sheet.style.transform = shift(from - top);
        face.style.transform = shift(top - from);
        void sheet.offsetHeight;
        sheet.style.transition = move;
        face.style.transition = move;
        sheet.style.transform = shift(to - top);
        face.style.transform = shift(top - to);
        this.rollMotion = false;
        this.resizeMotion = true;
        this.clipHeight = `${room}px`;
        this.clipPad = '0px';
        this.sheetShift = shift(to - top);
        this.faceShift = shift(top - to);
    }
    firstUpdated() {
        this.shadowRoot.querySelector('.close').addEventListener('click', () => {
            store.dispatch(closeSign());
        });
        this.shadowRoot.querySelector('.leave').addEventListener('click', async () => {
            if (this.user) {
                try {
                    await logOut();
                }
                catch {
                    return;
                }
            }
            store.dispatch(closeSign());
        });
        const link = this.shadowRoot.querySelectorAll('a');
        link.forEach(item => {
            item.addEventListener('click', () => {
                store.dispatch(closeSign());
            });
        });
        this.watchColumn();
    }
    // Required - a parent grid can park this tag after named areas. Shift it back under the previous element.
    // A row of its own between the header and the page leaves top empty.
    placeAnchor() {
        const pos = getComputedStyle(this).position;
        if (pos === 'fixed' || pos === 'absolute') {
            if (this.style.top)
                this.style.top = '';
            return;
        }
        const parent = this.parentElement;
        if (!parent)
            return;
        const prev = this.previousElementSibling;
        const want = prev
            ? prev.getBoundingClientRect().bottom
            : parent.getBoundingClientRect().top + (parseFloat(getComputedStyle(parent).paddingTop) || 0);
        const applied = parseFloat(this.style.top) || 0;
        const delta = want - (this.getBoundingClientRect().top - applied);
        if (Math.abs(delta - applied) <= 0.5)
            return;
        this.style.top = Math.abs(delta) <= 0.5 ? '' : `${delta}px`;
    }
    // Required - a resize while the sheet is rolling retargets the measured height.
    watchColumn() {
        if (typeof ResizeObserver === 'undefined')
            return;
        this.columnObserver = new ResizeObserver(() => {
            this.placeAnchor();
            const width = Math.round(this.getBoundingClientRect().width);
            if (!width || width === this.columnWidth)
                return;
            this.columnWidth = width;
            this.onColumnResize();
        });
        this.columnObserver.observe(this);
        const prev = this.previousElementSibling;
        if (prev)
            this.columnObserver.observe(prev);
        this.placeAnchor();
    }
    // Required - a reflow while open eases the bottom edge. A reflow mid open/close keeps that roll.
    onColumnResize() {
        const clip = this.clip();
        const sheet = this.sheet();
        if (!clip || !sheet)
            return;
        if (!this.drawer && !this.rollMotion)
            return;
        const from = this.shownPx(sheet);
        const sheetH = this.sheetPx(clip, sheet);
        const to = this.drawer ? sheetH : 0;
        if (this.rollMotion || !this.drawer)
            this.rollBetween(clip, sheet, from, to, sheetH);
        else if (Math.abs(to - from) > 1)
            this.resizeBetween(clip, sheet, from, to);
    }
    static get styles() {
        return [
            show,
            animation,
            drawerShell,
            drawerStyle,
            exitStyle,
            linkStyle,
            lineStyle,
            listStyle,
            tapStyle,
            noticeStyle,
            verifiedStyle,
            css `
    /* Required - this drawer's roll only. The clip hangs from the tag and grows down. */
    .drawer-clip {
      display:                block;
      position:               absolute;
      top:                    0;
      left:                   0;
      right:                  0;
      overflow:               hidden;
      min-height:             0;
      box-sizing:             border-box;
      z-index:                var(--pwa_drawer_z-index, 5);
      pointer-events:         none; /* Required - the shadow room must not catch clicks */
    }

    .drawer-clip > .userDrawer {
      height:                 auto;
      align-self:             start;
      pointer-events:         auto;
      border-radius:          var(--pwa_drawer_border-radius, 0 0 18px 18px);
      box-shadow:             0 18px 40px rgba(28, 36, 48, 0.16);
    }

    .drawer-face {
      display:                block;
      width:                  100%;
      min-width:              0;
      max-width:              100%;
    }

    .exit > h2 {
      display:                flex;
      align-items:            center;
      justify-content:        center;
      gap:                    8px;
      flex-wrap:              wrap;
    }

    .close:focus-visible,
    .leave:focus-visible,
    .settings:focus-visible,
    a:focus-visible,
    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline:                2px solid var(--pwa_focus, #1c2430);
      outline-offset:         2px;
    }

    .leave {
      min-height:             var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a),
    ::slotted(button),
    slot > a,
    slot > button {
      font:                     inherit;
      font-size:                0.95rem;
      font-weight:              600;
      color:                    var(--pwa_label_text_color, #1c2430);
      background:               transparent;
      text-decoration:          none;
      appearance:               none;
      padding:                  12px 16px;
      /* Required - same centered column as the form controls. */
      margin:                   12px auto;
      border:                   1px solid var(--pwa_line_color, #e3daca);
      border-radius:            10px;
      box-sizing:               border-box;
      text-align:               center;
      cursor:                   pointer;
      display:                  block;
      width:                    max(0px, calc(min(100%, var(--pwa_max_width, 400px)) - 2 * var(--pwa_inset, 0px)));
      max-width:                100%;
      min-width:                0;
      min-height:               var(--pwa_tap, 44px); /* Required - minimum tap target */
    }

    ::slotted(a[aria-current]),
    ::slotted(button[aria-current]) {
      color:                    var(--pwa_nav_highlight_color, #1c2430);
      background:               var(--pwa_nav_on_background, #f2f2f2);
    }
    `
        ];
    }
    ;
    render() {
        // Required - reflected attribute. The shell keeps the clip visible while it rolls.
        this.toggleAttribute('sliding', this.sliding);
        return html `

    <!-- Clip. The first render binds shut, with no transition. -->
    <div
      class="drawer-clip"
      style=${styleMap(this.clipStyle())}>

    <!-- Drawer Wrapper. Its translate is the only roll. -->
    <section
      part="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-drawer-title"
      aria-hidden="${this.drawer ? 'false' : 'true'}"
      ?inert="${!this.drawer}"
      class="userDrawer"
      style=${styleMap(this.sheetStyle())}
      @transitionend=${this.onClipEnd}>

      <div class="drawer-face" style=${styleMap(this.faceStyle())}>

      <!-- Exit Button -->
      <div class="exit" part="header">
        <div></div>
        <h2 id="pwa-drawer-title" part="title">
          <span class="who">${this.sheetSigned === false ? this.signup === this.subscribe ? `Login` : `Subscribe` : accountTitle(this.name, this.email)}</span>
          ${this.sheetSigned ? this.verified ? verifiedMark : html `<span class="unverified" part="unverified">Not verified</span>` : ''}
        </h2>
        <button class="close" part="close" type="button" aria-label="Close">${close}</button>
      </div>

      <!-- Logged-out State -->
      <div
        class="spec"
        ?on="${this.sheetSigned === false}">

        <div class=     "wrapper">
          <div class=${classMap({ inner: true, motion: this.motion })}>

            <!-- Log-in State -->
            <form-login
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: login-email, password: login-password, submit: login-submit, switch: login-switch, forgot: login-forgot, status: login-status, reveal: login-reveal, google: login-google"
              ?inert="${this.signup !== this.subscribe}"
              aria-hidden="${this.signup !== this.subscribe ? 'true' : 'false'}"
              class=${classMap({
            content: true,
            opened: this.signup === this.subscribe,
            closed: this.signup !== this.subscribe,
        })}>
            </form-login>

            <!-- Sign-up State -->
            <form-signup
              source="drawer"
              ?hide-google="${this.hideGoogle}"
              exportparts="email: signup-email, password: signup-password, submit: signup-submit, switch: signup-switch, status: signup-status, reveal: signup-reveal, notice: signup-notice, google: signup-google"
              ?inert="${this.signup === this.subscribe}"
              aria-hidden="${this.signup === this.subscribe ? 'true' : 'false'}"
              class=${classMap({
            content: true,
            opened: !this.signup === this.subscribe,
            closed: !this.signup !== this.subscribe,
        })}>
            </form-signup>

          </div>
        </div>

      </div>

      <!-- Logged-in State -->
      <div
        class="spec setLog"
        ?on="${this.sheetSigned === true}">

          <!-- Required - Jack's markers. A host link replaces the fallback. -->
          <slot name="before"><a href="/settings">slotted - before</a></slot>

          ${this.settingsControl()}

          <slot><a href="/settings">slotted - default</a></slot>

          ${this.sheetSigned && this.notice && !this.verified ? html `
            <p class="notice" part="notice" role="status" aria-live="polite">Check your inbox for the verification email. You can still sign in.</p>
          ` : ''}

          ${this.sheetSigned ? html `<email-verify exportparts="notice: verify-notice, status: verify-status, submit: verify-submit, verified: email-verified, unverified"></email-verify>` : ''}

          <button class="leave" part="logout" type="button" aria-label="Log out">Log out</button>
          
      </div>

      </div>

    </section>
    </div>

    `;
    }
    // Required - url is the href. Empty url stays on this page and tells the host.
    destination() {
        return (this.url || '').trim();
    }
    settingsControl() {
        const url = this.destination();
        if (url) {
            return html `<a href="${url}" part="settings" @click="${this.onSettings}">Settings</a>`;
        }
        return html `<button type="button" class="settings" part="settings" @click="${this.onSettings}">Settings</button>`;
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "url", void 0);
__decorate([
    property({ type: Boolean, attribute: true, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "drawer", void 0);
__decorate([
    property({ type: Boolean, attribute: true, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "subscribe", void 0);
__decorate([
    property({ type: Boolean, attribute: 'hide-google', reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "hideGoogle", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "name", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "email", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "verified", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "notice", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "user", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "sheetSigned", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "signup", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], UserDrawer.prototype, "sliding", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "motion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "clipHeight", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "clipPad", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "sheetShift", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "rollMotion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "resizeMotion", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], UserDrawer.prototype, "faceShift", void 0);
UserDrawer = __decorate([
    customElement('user-drawer'),
    __metadata("design:paramtypes", [])
], UserDrawer);
export { UserDrawer };
/*

\?on="\${ true === this._sign \? !this.subscribe \: this.subscribe }"
\?on="${ false === this._sign \? !this.subscribe \: this.subscribe }"


     <h3>\${
          this._log       \?     /* If logged-in state is true
          this._name      \:     /* Show username
          true            \===    /* else logged-out, Show if true equals
          /* this._sign      \===    /*true sign-up state equals
          this.subscribe  \?     /* If subscribe state is true
          'Login'         \:     /* Show login txt, else
          'Subscribe'           /* Show subscribe txt
          }</h3>

*/ 
//# sourceMappingURL=drawer.js.map