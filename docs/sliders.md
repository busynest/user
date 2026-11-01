# Slides

The slide is one module: `typescript/webcomponents/css/animation.ts`. `user-drawer`, `user-login`, and `user-settings` import it. One custom property, `--pwa_slide` (`2s`), times every motion. The login and sign-up swap, the drawer open and close, and why `max-height` must not ease are written up in [Drawer login and sign-up slide](drawer-slide.md).

Two motions, one duration.

- The drawer unrolls. `:host` `max-height` eases from `0px` to the measured content height, and back to `0px`. The top edge stays put. Content does not translate. `overflow: hidden` reveals it.
- Closed forms and settings panels share the grid area. Class `closed` is `position: absolute` and translates `translate3d(0, -100%, 0)`. `visibility` waits out `--pwa_slide`, then hides.

## How it works

The drawer does not slide as a sheet. JS measures the host's height in px, writes that `max-height`, and the stylesheet eases it with `--pwa_slide` and `ease-in-out`. The animated range is the real height, so the ease is not crushed into the start of a huge range. Wrapper, header, `.spec`, `.inner`, and the forms are inside that one box. They have no second height animation.

After the open `transitionend`, `max-height` becomes `none` so a later resize is not stuck. Closing measures the current height again, locks that px without a transition, then eases to `0px`. A form swap while open does the same glide between the old measured height and the new one, on `--pwa_slide`.

`sliding` turns on as the open starts. It turns off on the host's `max-height` `transitionend` once the box is at 0. That same moment drops `visibility`, `pointer-events`, and `inert`. On the way in, those are on immediately.

Login, sign-up, and the settings panels still slide inside the cell, on the same duration. The open panel is `position: relative` and sets the height. The closed panel is `position: absolute` at the same origin, so it does not stretch the row, and it translates up by its own height. The leaving panel stays visible until that transform ends. `.inner` clips it.

`@keyframes slide-out` only changes `max-height`. It is not the form swap. Playing it on `.closed`, or leaving `.closed` in flow with `position: relative`, moves the row while the transform runs and the forms snap instead of sliding past each other.

If either shell motion loses its timing, the drawer open and close fall out of step.

## Elements

On the drawer, inside `.userDrawer`:

`spec` → `wrapper` → `inner` → `content`

`wrapper` does not transition. `inner` clips the slide.

| Piece | Element | What moves |
|---|---|---|
| Shell | `:host` `max-height` | `0px` ↔ measured px, `--pwa_slide` |
| Forms and settings panels | `.content` with `opened` / `closed` | `transform` `--pwa_slide`, then `visibility` |

Page login uses `spec` / `wrapper` / `inner` / `content` for the form swap. It has no collapsing shell. The four settings panels (`profile`, `verification`, `password`, `delete`) are `.content` inside `wrapper` / `inner`. They have no `.spec`.

`user-login` does not slide. Nothing sets its `animation` attribute, and that host does not ease `max-height`.

## Triggers

- Attribute `drawer` on `user-drawer` asks the shell to unroll or roll up. Attribute `sliding` holds `visibility`, `pointer-events`, and `inert` until the `max-height` `transitionend`.
- Classes `spec-in` and `spec-out` on `.spec` follow the open flag. They do not transform.
- Classes `opened` and `closed` on `.content`. Drawer and page forms follow sign-in versus sign-up. Settings panels follow the tab.
- Attribute `on` on `.spec` is `display`. It is not a slide.

## Timings

`--pwa_slide` is `2s`. It is set on `:host` in `animation.ts`. Every transform duration and every close delay reads it. Do not add a second number.

| Piece | Duration | Easing |
|---|---|---|
| `:host` `max-height` unroll and roll-up | `--pwa_slide` (`2s`) | `ease-in-out` |
| Form-swap height glide | `--pwa_slide` (`2s`) | `ease-in-out` |
| `sliding` drop (`visibility`, `pointer-events`, `inert`) | `--pwa_slide`, on `transitionend` | n/a |
| `.content` transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| `.content` visibility delay when closing | `--pwa_slide` (`2s`) | `linear` |

The drawer box grows and shrinks. It does not translate. Open and close are the same duration. The forms still move from `translate3d(0, -100%, 0)` to `translate3d(0, 0, 0)`.

## Reduced motion

`prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on `:host`. Durations and delays that use the variable become `0s`. The drawer also skips the open frame wait and drops `sliding` immediately on close. Only inside that media query.
