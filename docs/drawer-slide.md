# Drawer login and sign-up slide

The form swap is a transform inside `.inner`. The drawer rolls open and closed: `:host` `max-height` eases between `0px` and the measured content height, and `section.userDrawer` translates from `-100%` to `0` on that same clock so the sheet's bottom stays on the clip's bottom. Both use `--pwa_slide` (`2s`, `ease-in-out`), set on `:host` in `typescript/webcomponents/css/animation.ts`.

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

`:host` is the clip. `section.userDrawer` is the sheet (header, both `.spec` blocks, `.wrapper`, `.inner`, forms). `.wrapper` does not include the header, so it is not the roller.

1. The clip's `max-height` eases from `0px` to the measured content height, and back to `0px`. `overflow: hidden` hides whatever is above the clip.
2. The sheet translates `translate3d(0, -100%, 0)` → `translate3d(0, 0, 0)` on open, and the reverse on close. `:host([drawer])` selects the open transform. The attribute flips in the same turn as the `max-height` write.

Same duration and `ease-in-out` (`--pwa_slide`) on both. A percentage translate is the sheet's own height. At progress `p` the clip is `p` times that height and the sheet is shifted `(p - 1)` times its height, so the sheet's bottom stays on the clip's bottom. The bottom controls ride that edge. The top of the sheet is what the clip hides and reveals.

`0` to `100dvh` would finish the visible motion early. JS measures pixels. `none` is not a length, so it is applied only after the open `transitionend`, and the close measures again before easing back to `0px`.

`sliding` turns on with the open (`visibility`, `pointer-events`, not `inert`). It turns off when the host's `max-height` `transitionend` finds the box at 0. Those three drop together.

A form swap does not re-roll the sheet (`transform` stays `0` while `drawer` is set). If the open form changes the height, `max-height` glides between the two measured px values on `--pwa_slide`, then returns to `none`. The form transform inside `.inner` is unchanged.

`.in`, `.out`, `.spec-in`, and `.spec-out` are removed. Nothing styled them.

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

That is why a `max-height` animation cannot produce the form swap. The forms need one shared cell and a transform. It does produce the unroll, because the unroll is the border box growing. `slide-out` is still a poor cap: `100%` often does not resolve, and `100dvh` is a viewport, not the drawer.

### `none` and `auto` do not animate

A transition needs two computed values it can blend. `max-height: none` is not a length. `height: auto` is not a length. There is no midpoint between `none` and `400px`, or between `auto` and `0`. The property snaps. This codebase does not use `interpolate-size` or `calc-size()`. Do not switch the form swap over to `height: auto` and expect it to ease.

Two lengths do interpolate. `0px` to `240px` animates. `0px` to `100%` animates only when the percentage resolves against a definite containing-block height. If it does not, the open snaps.

### A large max-height skews the ease

People sometimes animate `max-height` from `0` to a huge length (`9999px`, `100dvh`) to fake `height: auto`. The timing function is applied across the whole range, not across the content. A 400px form inside a 10000px range reaches its real height about 4% of the way through the duration. The rest of the time `max-height` is above the content and nothing visible happens.

On the way open, the panel appears to finish early, and the named ease is not the ease you see. On the way closed, most of the duration is spent shrinking empty space above the content, then the content collapses in a rush at the end. `ease-in-out` over that range does not look like `ease-in-out` over the form. That is another reason `slide-out` (`100%` to `100dvh`, 2s) cannot stand in for the 2s transform.

### What the drawer open and close uses

`drawerShell` eases `:host` `max-height` and `.userDrawer` `transform` with `var(--pwa_slide, 2s) ease-in-out`. The sheet transform is `translate3d(0, -100%, 0)` unless `:host([drawer])`. `drawer.ts` writes the measured pixel `max-height`. After the open (and after a form-swap glide) that inline value becomes `none`, which does not animate. The timings table in [Slides](sliders.md) lists the one duration.

## Pitfalls

- `position: relative` on `.closed` puts the form back in the row. The clip no longer shows one panel replacing the other.
- `animation: slide-out` on `.closed` does not slide the form. Starting an animation on that element can also drop the transform transition, so the swap snaps.
- Do not transition `height` or `max-height` to `auto` or `none`. It will snap.
- Do not fake the form swap with a large `max-height`. The visible motion will be shorter than the duration, and the ease will look wrong.
- The visibility delay on `.content` must be `var(--pwa_slide)`, not a different literal. Shorter, and the leaving form vanishes mid-slide. Longer, and it stays painted after it is off screen. The visibility duration stays `0s`. It snaps. It does not fade.
- `.opened` must set its own transition with a `0s` visibility delay. If it inherits the close delay, the arriving form is invisible for the whole slide.
- Do not give `.spec`, `.inner`, or `.wrapper` their own height or transform duration. The clip is `:host`. The roller is `.userDrawer`. A second clock drifts. The header is outside `.wrapper`, so rolling only `.inner` leaves the header behind.
- Do not animate `max-height` to `none`, `auto`, or a viewport-sized cap. Measure px, ease between those two lengths, then set `none` only after `transitionend`.
- `sliding` has to stay up until the close `max-height` reaches 0. Clearing it when `drawer` flips hides the roll-up.
- Focusing a control inside the unrolling box scrolls it. `.focus({ preventScroll: true })` keeps the header at the top edge. Reset `scrollTop` when the open starts.
- Reduced motion has to set `--pwa_slide: 0s`. Zeroing only `transition-duration` leaves a delay that still uses the variable.
- A more specific `.userDrawer .content.closed` rule is how `f607737` broke the drawer while the shared rule still looked right.
- `-100%` is the element's own height. `height: 0` on `.closed` makes that distance zero, so nothing moves.
- `.inner` clips the forms. `:host` clips the drawer. Removing either shows the parked piece.
- Do not bring back `--pwa_slide_time` or `calc()` on the transform. `6959a29` removed that. `--pwa_slide` is a single time, not a formula.

## Changing the duration

Change one value: `--pwa_slide` on `:host` in `animation.ts`. The unroll, the form-swap height glide, the form transform, and the form visibility delay all read it. `sliding` ends on `transitionend`, so it follows whatever that time is. Leave the visibility duration at `0s`, and leave `.opened` at `visibility 0s linear 0s`. Do not hardcode a second duration in `glide`.

Update the `2s` figures in `docs/sliders.md` and in this file. Rebuild so `base/webcomponents/css/animation.js`, `source/pwa-auth.js`, and `website/javascript/pwa-auth.js` match.

Then open the drawer and close it. The top edge should stay put, the bottom edge should take the new time, and the host should collapse only at the end. Click `login with existing email` and `create a new account`. The forms should slide, and if the open form is taller the bottom edge should ease to the new height instead of jumping.
