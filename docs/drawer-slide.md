# Drawer login and sign-up slide

The drawer unrolls downward from wherever the tag sits, and its buttons ride the bottom edge. A closed drawer takes no space. Nothing animates when the page first loads. Login and sign-up then trade places in the same space.

The controls sit on the host edge. `--pwa_inset` defaults to `0`. `--pwa_max_width` defaults to `400px`: the form column fills a narrow host, then centers at that cap. Signed-in drawer links use that same column. The drawer header stays full width. The host is `display: block`, `width: 100%`, `min-width: 0`, so it follows a flex or grid track. A page sets either variable on `user-drawer`, `user-login`, `user-settings`, and `email-reset`. Do not set `--pwa_max_width` on `:host` inside the component; that would beat the page.

The form swap is a transform inside `.inner`. The drawer rolls on one mover: `.drawer-clip` is set, with no transition, to the taller of the two window heights plus 60px for the shadow, and only `section.userDrawer` eases `transform` on `--pwa_slide` (`2s`, `ease-in-out`). The page login and the settings tabs still ease their own clip height and sheet transform, each inside its own file. There is no shared roll module.

## How the form swap works

`form-login` and `form-signup` share one grid cell. `.inner` is a grid with `grid-template-areas: 'pages'`. Both forms have `grid-area: pages`, so they occupy the same cell. `.inner` is `overflow: hidden`, which clips anything that leaves that cell.

The open form (class `opened`) is `position: relative` and `transform: translate3d(0, 0, 0)`. It is the only one in flow, so it sets the panel height.

The closed form (class `closed`) is `position: absolute` at `top: 0; left: 0`, with `width: 100%` and `height: auto`. Absolute removes it from the row, so it does not stretch the panel. It is translated `translate3d(0, -100%, 0)`. A percentage in `translate` is a percentage of the element itself, so `-100%` moves it up by its own height, just outside the clip.

The transform runs for `var(--pwa_slide, 2s)` with `ease-in-out` in both directions. The arriving form moves from `-100%` to `0`. The leaving form moves from `0` to `-100%`. Both travel upward through the same cell. `opened` is `z-index: 3` and `closed` is `z-index: 2`, so the arriving form paints on top.

The leaving form is hidden when that transform ends. `.content` sets `transition: transform var(--pwa_slide, 2s) ease-in-out, visibility 0s linear var(--pwa_slide, 2s)`. Visibility duration is `0s` and its delay is the slide, so visibility snaps to `hidden` at the same moment the transform finishes. `.opened` overrides that with `visibility 0s linear 0s`, so the arriving form is shown immediately. `pointer-events: none` and the `inert` attribute are separate from the paint. `inert` keeps the off-screen form out of the tab order.

`prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on that component's `:host`. The swap is instant, and the visibility wait does not linger.

The form transition is off until `.inner` also has class `motion`. The first render binds `opened` and `closed` with `classMap`, and `.content` has `transition: none`. After that paint, `motion` is added on that component's `.inner` only. A later change of those classes is what runs the swap. The closed form does not slide into place at load.

### What toggles it

The buttons are `part="switch"`.

- `form-login` label: `create a new account`. File: `typescript/webcomponents/form/login.ts`.
- `form-signup` label: `login with existing email`. File: `typescript/webcomponents/form/signup.ts`.

Each `change()` dispatches `universalToggle(this.source)`. Inside the drawer, `source` is `"drawer"`. `universalToggle` in `typescript/redux/session.ts` flips `session.registerOne`.

`UserDrawer.stateChanged` copies `registerOne` onto `this.signup`. The render in `typescript/webcomponents/drawer/drawer.ts` then sets the classes:

- `form-login` is `opened` when `this.signup === this.subscribe`, otherwise `closed`.
- `form-signup` is `opened` when `!this.signup === this.subscribe`, otherwise `closed`.

`subscribe` is the boolean attribute on `user-drawer`. It flips which form is open for a given `registerOne`. The closed form also gets `inert`.

These do not run the form swap:

- Attribute `drawer`, class `out` / `in` on `.userDrawer`, and attribute `sliding` open and close the shell. See below.
- Classes `spec-in` and `spec-out` follow the open flag. They do not transform.
- Attribute `on` on `.spec` is `display`. It shows the logged-out block. It is not a slide.

## The roll

What you see: the drawer's bottom edge moves down on open and up on close. The last control stays on that edge, like the roller of a scroll. The title and the top of the form come into view from above the clip, and leave the same way. The page heading does not move.

The drawer has one clock. The clip is a window. The sheet is what moves.

```
clip  .drawer-clip         overflow hidden, height set with no transition
sheet section.userDrawer   translateY eases, holds header, forms, shadow, and radius
```

Easing `height` on the main thread and `transform` on the compositor with the same duration still drifts. On a slow CPU the gap under `.inner`'s border moves. The clip no longer transitions `height` or `max-height`. `rollBetween` writes the clip height immediately: `max(from, to) + 60px`. That 60px is room for `box-shadow: 0 18px 40px rgba(28, 36, 48, 0.16)`. The clip is `pointer-events: none`, and the sheet is `pointer-events: auto`, so the spare area does not catch clicks under the drawer. The shadow and the `18px` bottom radius sit on `section.userDrawer`, so the edge you see is the sheet. The sheet's height is the measured float. It is not rounded up.

`.wrapper` starts under the header. Rolling only `.inner` would leave the title stuck while the form rode the edge. The sheet is the whole `section.userDrawer`.

The same picture, with different elements, lives in the other two components. Nothing is shared.

| Component | Clip | Sheet | Clock |
|---|---|---|---|
| `user-drawer` | `.drawer-clip` | `section.userDrawer` | `:host` `--pwa_slide` from `animation.ts` |
| `user-login` | `.login-clip` | `section.service` | that host's own `--pwa_slide` |
| `user-settings` | `.settings-clip` | `.settings-sheet` | that host's own `--pwa_slide` in `settings.ts` |

`--pwa_slide` (`2s`, `ease-in-out`) is a custom property on that component's `:host`. It inherits into that shadow tree and stops there. A sibling `user-login` does not see the drawer's variable, classes, or events. The clip is `display: block`. A grid clip would stretch the sheet to the clip's height and the bottom would no longer be the content's bottom.

### No shared roll

`typescript/webcomponents/css/roll.ts` is gone. Each component keeps its own `rollBetween`, its own clip and sheet class names, and its own `transitionend` listener. On the drawer the listener is on `section.userDrawer` and it waits for `transform`. It ignores any event whose target is not that sheet, so a form transform inside it cannot finish the roll early. Login and settings still listen on their own clips.

A shared `.roll` class, a shared `:host { transition: height, max-height }`, or one helper that wrote those inline styles was enough to ease a component that had not been asked to move. The drawer shell no longer transitions `height`, `max-height`, or `transform`. `drawerShell` only holds the closed backstop: `max-height: 0`, `visibility: hidden`, `pointer-events: none`, with no transition. `sliding` lifts that backstop. The motion itself is the style binding below.

### Lit bindings, and no animation at boot

The clip and the sheet read their box from the template. `styleMap` writes `height`, `max-height`, `transform`, and `transition` from component state. `classMap` writes `opened` and `closed` on the forms.

The first render binds the resting state and `transition: none`:

- Drawer shut: clip `0px`, sheet `translate3d(0, -100%, 0)`. `.inner` has no `motion` class, so the forms do not transition either.
- Page login: clip `auto`, sheet `none`. The open form is `opened`. The other is `closed` and already at `-100%`.
- Settings: the signed-out line, or the active tab at `auto`, with the sheet at `none`. Inactive panels are `hidden`. They are not `closed`.

That paint is static. `motion` is reflected only after it, and the roll's `transition` string is written only inside `rollBetween`, which runs from a later update (the drawer attribute, `registerOne` / `registerTwo`, or a settings tab). Load does not play an open-to-closed ease.

`rollBetween` then eases. It locks the start px with `transition: none`, reads `offsetHeight` so the next change has a from-value, and writes the end px with `transition` set to `var(--pwa_slide, 2s) ease-in-out`. `height` and `max-height` are the same px, because `max-height` only caps and cannot hold a shorter sheet open.

### One mover at progress p

`p` runs 0 → 1 with `ease-in-out`. `H` is the sheet's exact height in px. The clip does not take `p`. For an open from 0 it is set to `H + 60` before the first animated frame. The sheet then eases:

- sheet `translateY` = `(p - 1) * H`  (start `-H`, which is `-100%`, end `0`)
- the visible bottom is the sheet's bottom, shadow included
- `.inner`'s border stays 12px above that edge, because both live on the sheet

Close swaps the ends: the clip stays at `H + 60` while translateY runs `0` → `-H`. When that transform ends, the clip drops to `0` and the padding drops to `0`, so the shut drawer takes no clicks and shows nothing.

A height change that does not start at 0 (a taller or shorter form) uses the sheet's real height `S` and window ends `A` → `B`:

- clip height = `max(A, B) + 60`, set at the start, no transition
- translateY = window − S
- start `A - S`, end `B - S`

When the new sheet is the thing on screen, `S = B`, so it finishes at `translateY: 0` and starts at `A - B`. Open from 0 is the `-100%` case of the same formula. The resting closed sheet stays at `-100%` so boot does not have to measure. After the transform ends, an open drawer returns to `height: auto` and `padding-bottom: 60px` so a later reflow is not stuck and the shadow still has room.

A login ↔ sign-up switch while the drawer is already open does not use that bottom-anchored roll. `resizeBetween` holds the sheet's `min-height` at `max(old, new)` and translates the sheet from `old - max` to `new - max`, so the rounded shadowed edge travels and the sheet's top stays above the clip. `.drawer-face`, the one wrapper around the header and the forms, translates by the exact opposite (`max - old` to `max - new`) on the same `--pwa_slide` and the same frame. The two offsets cancel, so the header stays pinned under the page header and only the bottom edge moves. The clip is `max + 60px` for the shadow. When that sheet `transform` ends, both translates and the min-height clear. That resting state matches the end of the ease, so it does not jump. A switch during an open or close still uses `rollBetween`. A column reflow uses the same choice. `prefers-reduced-motion` snaps. The drawer's `.inner` has no bottom border; the paper edge is the border. The login card keeps its line.

Login and settings still ease clip height and the sheet together. Their `p` still moves both. The drawer does not.

### Why the px value has to be measured

`max-height` only eases between two lengths, and it only caps. It cannot hold a box open taller than its content, so a shrink would drop the bottom immediately. Login and settings still set `height` and `max-height` to the same px value. The drawer does not ease either one. `none` and `auto` have no midpoint, so they snap. A cap of `100dvh` or `9999px` does ease, but the timing function is spread across that whole range. A 480px drawer inside a 1000px range is fully open at 48% of the time, and the named ease is not what you see. The open path reads the sheet once with the clip cap released (no paint) and keeps that exact float. Rounding it up leaves a seam under the sheet. After the sheet's `transform` `transitionend`, the drawer binding goes back to `height: auto` and `max-height: none`, with padding for the shadow. The next close, or the next height change, measures again.

### Visibility, inert, reduced motion

`sliding` turns on in the same turn as the open. `visibility` and `pointer-events` come on with it, and `inert` comes off. It turns off only when `section.userDrawer` fires `transform` `transitionend` and the sheet is parked (`height + translateY` is under 2px). A bubbled transform from a form does not qualify (`event.target` must be the sheet). That is the close, not a second timer. `prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on that host, and `rollBetween` snaps to the end state with `transition: none` and does not wait for `transitionend`.

Signing in while the drawer is open swaps in the account menu and closes in the same turn. The close waits one frame so that menu, including its child elements, has a height, then rolls that height. If the menu grows again before the roll finishes, the roll aims at the new height. A resize `min-height` is cleared first, and the shut clip is `0`, so an earlier pin cannot leave the log-out button on screen. Signing out while the drawer is open does not swap in the login form until that clip has reached 0. The close measures the account menu, so `translateY` starts at 0 and the menu rolls up. The login form is what the next open shows. The same end step runs when reduced motion snaps the clip shut. Returning focus uses `preventScroll`, so the page does not jump. `placeAnchor()` runs again before the close. The host is `position: relative` and the clip is `absolute` at the top of the host. A page grid should give `user-drawer` the row between the header and the content, so that anchor does not have to pull the tag up with a large `top`.

### Where it is used

| Place | Clip | Sheet | When it rolls |
|---|---|---|---|
| `user-drawer` | `.drawer-clip` | `section.userDrawer` | open, close, and a form swap that changes height |
| `user-login` | `.login-clip` | `section.service` | `registerTwo` (login ↔ sign-up) and sign-in ↔ signed-in |
| `user-settings` | `.settings-clip` | `.settings-sheet` | tab change, after the panels are already on screen. The nav stays put |

The drawer's login/sign-up pair still slides inside `.inner` with `.opened` / `.closed`. That is a different motion (two forms, one cell). The page login keeps that inner swap and also rolls the card. Settings tabs do not use `.opened` / `.closed`; the roll is the only motion, and settings does not import `animation.ts`. `.in`, `.out`, `.spec-in`, and `.spec-out` are gone.

### Apply it to a new component

Copy the roll into that component. Do not import a shared helper, and do not reuse `.drawer-clip`, `.login-clip`, `.settings-clip`, or `.settings-sheet`.

1. Put `--pwa_slide: 2s` on that component's `:host`, and `0s` inside `prefers-reduced-motion`. Give the clip a class that exists only in this file. `display: block`, `overflow: hidden`.
2. Bind the clip and the sheet with `styleMap`. The first render is the resting state and `transition: none`.
3. On a user change after that first update, remember the window, render the new sheet, measure its height, and run this component's own from/to ease. `translateY` is window minus sheet height. The drawer sets the clip height up front and eases only the transform. Login and settings still ease `height` and `max-height` to that same px.
4. On the drawer's sheet `transform` `transitionend`, and only when `event.target` is the sheet, set the open binding back to `auto` with shadow padding, or collapse a closed clip to `0`. Login and settings still do this from their clip's `max-height` `transitionend`.
5. Do not put a height transition on `:host` in a stylesheet other components import. Do not translate a sheet that leaves out an element that should ride the edge.

### Files

- `typescript/webcomponents/drawer/drawer.ts` — drawer roll, open, close, form-swap height.
- `typescript/webcomponents/login/page.ts` — page-login roll and `registerTwo`.
- `typescript/webcomponents/settings/settings.ts` — settings roll and tab panels.
- `typescript/webcomponents/css/animation.ts` — `--pwa_slide` and the form-swap `.opened` / `.closed` rules. Class `motion` on `.inner` arms the form transition. The drawer shell has no height transition.
- `typescript/webcomponents/form/login.ts` and `signup.ts` — the switch buttons.
- `typescript/redux/session.ts` — `universalToggle`, `registerOne`, `registerTwo`, `navigateAuth`.
- Built copies: `base/webcomponents/css/animation.js`, `source/pwa-auth.js`, `website/javascript/pwa-auth.js`. There is no `roll.js`.

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

The drawer's clip binding always sets `transition: none`. It never eases `height` or `max-height`. The sheet's `transform` eases with `var(--pwa_slide, 2s) ease-in-out` only while that roll is running. At rest the sheet transition is `none`. `drawerShell` does not ease `:host`. After the open (and after a form-swap glide) the clip binding becomes `height: auto`, `max-height: none`, and `padding-bottom: 60px`. A closed rest is `height: 0` and `padding-bottom: 0`. The timings table in [Slides](sliders.md) lists the one duration. Login and settings still ease their clip height on that same duration.

## Pitfalls

- `position: relative` on `.closed` puts the form back in the row. The clip no longer shows one panel replacing the other.
- `animation: slide-out` on `.closed` does not slide the form. Starting an animation on that element can also drop the transform transition, so the swap snaps.
- Do not transition `height` or `max-height` to `auto` or `none`. It will snap.
- Do not fake the form swap with a large `max-height`. The visible motion will be shorter than the duration, and the ease will look wrong.
- The visibility delay on `.content` must be `var(--pwa_slide)`, not a different literal. Shorter, and the leaving form vanishes mid-slide. Longer, and it stays painted after it is off screen. The visibility duration stays `0s`. It snaps. It does not fade.
- `.opened` must set its own transition with a `0s` visibility delay. If it inherits the close delay, the arriving form is invisible for the whole slide.
- Do not give `.spec`, `.inner`, or `.wrapper` their own height or transform duration. The drawer's clip is `.drawer-clip`. The roller is `.userDrawer`. A second clock drifts. The header is outside `.wrapper`, so rolling only `.inner` leaves the header behind. Do not ease the clip's `height` next to the sheet's `transform`. That pair is the drift.
- Do not animate the drawer's `max-height`. Measure the sheet in exact px, set the clip to the taller window plus the shadow room, and ease only the transform. Set `auto` only after the sheet's own `transform` `transitionend`.
- Do not share the roll. A `:host` height transition, or a class name used by more than one component, eases something that should have stayed still. One component's `transitionend` must not call another component's release.
- The first render binds the resting state with `transition: none`. Turning the transition on in that same first paint, or writing the closed px after an open first frame, is the open-then-shut flicker.
- `sliding` has to stay up until the close transform parks the sheet. Clearing it when `drawer` flips hides the roll-up. The host backstop is `max-height: 0` with no transition, so it cannot play that flicker by itself. The clip itself must still be set back to `0` at the end.
- Focusing a control inside the unrolling box scrolls it. `.focus({ preventScroll: true })` keeps the header at the top edge. Reset `scrollTop` when the open starts.
- Reduced motion has to set `--pwa_slide: 0s`. Zeroing only `transition-duration` leaves a delay that still uses the variable.
- A more specific `.userDrawer .content.closed` rule is how `f607737` broke the drawer while the shared rule still looked right.
- `-100%` is the element's own height. `height: 0` on `.closed` makes that distance zero, so nothing moves.
- `.inner` clips the forms. `:host` clips the drawer. Removing either shows the parked piece.
- Do not bring back `--pwa_slide_time` or `calc()` on the transform. `6959a29` removed that. `--pwa_slide` is a single time, not a formula.

## Changing the duration

Change `--pwa_slide` on the component you are timing. The drawer's and the page login's variable is on `:host` in `animation.ts`. Settings sets its own on `:host` in `settings.ts`. That component's roll, its form-swap height glide, its form transform, and its form visibility delay read that variable. On the drawer, `sliding` ends on the sheet's `transform` `transitionend`, so it follows whatever that time is. Leave the visibility duration at `0s`, and leave `.motion .opened` at `visibility 0s linear 0s`. Do not hardcode a second duration in `rollBetween`.

Update the `2s` figures in `docs/sliders.md` and in this file. Rebuild so `base/webcomponents/` matches `typescript/`, then `source/pwa-auth.js` and `website/javascript/pwa-auth.js`.

Then open the drawer and close it. The top edge should stay put, the bottom edge should take the new time, and the host should collapse only at the end. Click `login with existing email` and `create a new account`. The forms should slide, and if the open form is taller the bottom edge should ease to the new height instead of jumping.
