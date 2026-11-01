# Drawer login and sign-up slide

The form swap and the drawer open/close are both transforms. They share one duration, `--pwa_slide` (`2s`, `ease-in-out`), set on `:host` in `typescript/webcomponents/css/animation.ts`. `max-height` only parks the host. It does not ease.

## How the form swap works

`form-login` and `form-signup` share one grid cell. `.inner` is a grid with `grid-template-areas: 'pages'`. Both forms have `grid-area: pages`, so they occupy the same cell. `.inner` is `overflow: hidden`, which clips anything that leaves that cell.

The open form (class `opened`) is `position: relative` and `transform: translate3d(0, 0, 0)`. It is the only one in flow, so it sets the panel height.

The closed form (class `closed`) is `position: absolute` at `top: 0; left: 0`, with `width: 100%` and `height: auto`. Absolute removes it from the row, so it does not stretch the panel. It is translated `translate3d(0, -100%, 0)`. A percentage in `translate` is a percentage of the element itself, so `-100%` moves it up by its own height, just outside the clip.

The transform runs for `var(--pwa_slide, 2s)` with `ease-in-out` in both directions. The arriving form moves from `-100%` to `0`. The leaving form moves from `0` to `-100%`. Both travel upward through the same cell. `opened` is `z-index: 3` and `closed` is `z-index: 2`, so the arriving form paints on top.

The leaving form is hidden when that transform ends. `.content` sets `transition: transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear var(--pwa_slide, 2s)`. Visibility duration is `0s` and its delay is the slide, so visibility snaps to `hidden` at the same moment the transform finishes. `.opened` overrides that with `visibility 0s linear 0s`, so the arriving form is shown immediately. `pointer-events: none` and the `inert` attribute are separate from the paint. `inert` keeps the off-screen form out of the tab order.

`prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on `:host`. The swap is instant, and the visibility wait does not linger.

### What toggles it

The buttons are `part="switch"`.

- `form-login` label: `create a new account`. File: `typescript/webcomponents/form/login.ts`.
- `form-signup` label: `login with existing email`. File: `typescript/webcomponents/form/signup.ts`.

Each `change()` dispatches `universalToggle(this.source)`. Inside the drawer, `source` is `"drawer"`. `universalToggle` in `typescript/redux/frontend.ts` flips `frontend.registerOne`.

`UserDrawer.stateChanged` copies `registerOne` onto `this.signup`. The render in `typescript/webcomponents/drawer/drawer.ts` then sets the classes:

- `form-login` is `opened` when `this.signup === this.subscribe`, otherwise `closed`.
- `form-signup` is `opened` when `!this.signup === this.subscribe`, otherwise `closed`.

`subscribe` is the boolean attribute on `user-drawer`. It flips which form is open for a given `registerOne`. The closed form also gets `inert`.

These do not run the form swap:

- Attribute `drawer`, class `out` / `in` on `.userDrawer`, and attribute `sliding` open and close the shell. See below.
- Classes `spec-in` and `spec-out` follow the open flag. They do not transform.
- Attribute `on` on `.spec` is `display`. It shows the logged-out block. It is not a slide.

## How the drawer opens and closes

`:host` is the clip (`overflow: hidden`). `.userDrawer` is the sheet, header included, so the whole drawer moves together.

- Parked: class `in`, `transform: translate3d(0, -100%, 0)`. The host is `max-height: 0`, `visibility: hidden`, `pointer-events: none`, and the section is `inert`.
- Open: class `out`, `transform: translate3d(0, 0, 0)`, over `--pwa_slide` `ease-in-out`.
- Close: class `in` again, the same transform back up, same duration, same ease.

`max-height` does not transition. While attribute `sliding` is set it is `none`, so the clip is as tall as the sheet and the rising or falling panel stays visible. When `sliding` drops it is `0px`, which only removes the parked box. A snap between `0px` and `none` is not interpolable, and it is not given a duration, so it cannot skew the ease.

`sliding` turns on in the same turn the drawer opens. `visibility`, `pointer-events`, and `inert` come on with it (delay `0`). The class `out` is applied on the next frame, after the parked transform has been painted inside the open clip, so the browser has a from-value and the 2s run can start.

`sliding` turns off when `.userDrawer` fires `transitionend` for `transform` and the drawer is closed. That is `--pwa_slide` after the close starts, not a second timer. `visibility`, `pointer-events`, and `inert` drop together. Descendant form transitions bubble, and those are ignored (`event.target` must be the panel).

`spec-in` and `spec-out` used to translate on their own, at `1.5s` and `2.2s`, while the shell eased `max-height` for `1.4s`. Three clocks, and the `max-height` range was not the sheet's height, so the ease looked wrong. They no longer move.

The same `opened` / `closed` rules slide the page login (`typescript/webcomponents/login/page.ts`, state `registerTwo`) and the four settings panels. A change to `.closed` changes all three.

### Files

- `typescript/webcomponents/css/animation.ts` — `.content`, `.opened`, `.closed`, and the `2s` transition. Also `drawerShell` for the open and close.
- `typescript/webcomponents/drawer/drawer.ts` — markup, classes, `inert`.
- `typescript/webcomponents/form/login.ts` and `signup.ts` — the switch buttons.
- `typescript/redux/frontend.ts` — `universalToggle` and `registerOne`.
- Built copies: `base/webcomponents/css/animation.js`, `source/pwa-auth.js`, `website/javascript/pwa-auth.js`.

`@keyframes slide-out` is still in the file. It is not applied. Do not put it on `.closed`.

## History

- `97c7256` introduced the slide. `.closed` became `position: absolute` in the same cell, `translate3d(0, -100%, 0)`, with a `0.8s` transform. Before that, `.closed` was `height: 0`, `width: 0`, and `transform: none`, so the swap was instant.
- `8868da7` timed the swap from one variable: `1.4s * 1.429`, about `2s` `ease-in-out`. Visibility on the way out waits for that transform. Visibility on the way in is immediate.
- `15b3ed6` is the last commit where that mechanism was intact in the shared rule (`height: auto` and `align-self: start` on `.closed`, so a stretched row does not pull controls to the top).
- `f607737` broke the drawer. It added a more specific `.userDrawer .content.closed`: `position: relative`, `visibility: visible`, and `animation: slide-out 2s`. The shell timings were being put back on Jack's elements. The form override went with them.
- `19dfd75` copied that override into the shared `.closed` rule. The drawer, the page login, and the settings tabs all snapped.

`slide-out` only animates `max-height` from `100%` to `100dvh`. With `.closed` back in flow, the row changes size while the transform runs. The panels no longer pass through one clipped cell.

## How max-height behaves

A transition or animation of `max-height` interpolates `max-height` only. The used height is the content height capped by that value. The border box grows or shrinks, and overflow clips the content. The element does not move sideways or upward. A second form in the same cell does not travel in from outside the clip.

That is why a `max-height` animation cannot produce this slide. The effect needs both forms in one cell, one of them out of flow, each translated by its own height. Changing the cap on the box does not do that. `slide-out` is a poor cap even on its own terms: `100%` is relative to the containing block's height. When that height depends on the content, a percentage `max-height` does not resolve to a length, so there is nothing to interpolate. `100dvh` is a viewport, not the form.

### `none` and `auto` do not animate

A transition needs two computed values it can blend. `max-height: none` is not a length. `height: auto` is not a length. There is no midpoint between `none` and `400px`, or between `auto` and `0`. The property snaps. This codebase does not use `interpolate-size` or `calc-size()`. Do not switch the form swap over to `height: auto` and expect it to ease.

Two lengths do interpolate. `0px` to `240px` animates. `0px` to `100%` animates only when the percentage resolves against a definite containing-block height. If it does not, the open snaps.

### A large max-height skews the ease

People sometimes animate `max-height` from `0` to a huge length (`9999px`, `100dvh`) to fake `height: auto`. The timing function is applied across the whole range, not across the content. A 400px form inside a 10000px range reaches its real height about 4% of the way through the duration. The rest of the time `max-height` is above the content and nothing visible happens.

On the way open, the panel appears to finish early, and the named ease is not the ease you see. On the way closed, most of the duration is spent shrinking empty space above the content, then the content collapses in a rush at the end. `ease-in-out` over that range does not look like `ease-in-out` over the form. That is another reason `slide-out` (`100%` to `100dvh`, 2s) cannot stand in for the 2s transform.

### What the drawer open and close uses

The shell is `drawerShell` in the same file, imported only by `user-drawer`. The motion is the `.userDrawer` transform described above. `max-height` is the parked layout (`0px` / `none`) and it does not transition. The old `1.4s` / `1.5s` / `2.2s` split is gone. The timings table in [Slides](sliders.md) lists the one duration.

## Pitfalls

- `position: relative` on `.closed` puts the form back in the row. The clip no longer shows one panel replacing the other.
- `animation: slide-out` on `.closed` does not slide the form. Starting an animation on that element can also drop the transform transition, so the swap snaps.
- Do not transition `height` or `max-height` to `auto` or `none`. It will snap.
- Do not fake the form swap with a large `max-height`. The visible motion will be shorter than the duration, and the ease will look wrong.
- The visibility delay on `.content` must be `var(--pwa_slide)`, not a different literal. Shorter, and the leaving form vanishes mid-slide. Longer, and it stays painted after it is off screen. The visibility duration stays `0s`. It snaps. It does not fade.
- `.opened` must set its own transition with a `0s` visibility delay. If it inherits the close delay, the arriving form is invisible for the whole slide.
- Do not give `.spec` its own transform duration. That second clock is what fought the shell.
- Do not transition `:host` `max-height`. A long range finishes visually early and the ease looks wrong. `none` does not interpolate anyway.
- `sliding` has to stay up until the panel `transitionend`. Clearing it when `drawer` flips clips the close, because the host `max-height` becomes `0` while the sheet is still moving.
- Reduced motion has to set `--pwa_slide: 0s`. Zeroing only `transition-duration` leaves a delay that still uses the variable.
- A more specific `.userDrawer .content.closed` rule is how `f607737` broke the drawer while the shared rule still looked right.
- `-100%` is the element's own height. `height: 0` on `.closed` makes that distance zero, so nothing moves.
- `.inner` clips the forms. `:host` clips the drawer. Removing either shows the parked piece.
- Do not bring back `--pwa_slide_time` or `calc()` on the transform. `6959a29` removed that. `--pwa_slide` is a single time, not a formula.

## Changing the duration

Change one value: `--pwa_slide` on `:host` in `animation.ts`. The drawer transform, the form transform, and the form visibility delay all read it. `sliding` ends on `transitionend`, so it follows whatever that time is. Leave the visibility duration at `0s`, and leave `.opened` at `visibility 0s linear 0s`.

Update the `2s` figures in `docs/sliders.md` and in this file. Rebuild so `base/webcomponents/css/animation.js`, `source/pwa-auth.js`, and `website/javascript/pwa-auth.js` match.

Then open the drawer and close it. Each direction should take the new time, header and forms together, and the host should collapse only at the end. Click `login with existing email` and `create a new account`. Each direction should show both forms during the motion, and the leaving form should disappear only at the end.
