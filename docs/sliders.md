# Slides

The slide is one module: `typescript/webcomponents/css/animation.ts`. `user-drawer`, `user-login`, and `user-settings` import it. One custom property, `--pwa_slide` (`2s`), times every motion. The login and sign-up swap, the drawer open and close, and why `max-height` must not ease are written up in [Drawer login and sign-up slide](drawer-slide.md).

Two motions, both transforms.

- The drawer panel (`.userDrawer`) translates `translate3d(0, -100%, 0)` to `translate3d(0, 0, 0)`. `:host` clips it.
- Closed forms and settings panels share the grid area. Class `closed` is `position: absolute` and translates `translate3d(0, -100%, 0)`. `visibility` waits out `--pwa_slide`, then hides.

## How it works

The drawer opens and closes as one sheet. Class `out` is the resting open transform. Class `in` parks it above the clip. Both use `ease-in-out` and `--pwa_slide`. `max-height` on `:host` is `0px` when parked and `none` while attribute `sliding` is set. It snaps. It does not transition, so it cannot skew the ease.

`sliding` turns on as the open starts. It turns off on the panel's `transform` `transitionend`, which is `--pwa_slide` later. That same moment drops `visibility`, `pointer-events`, and `inert`. On the way in, those are on immediately.

Login, sign-up, and the settings panels are a separate slide in the same grid cell, on the same duration. The open panel is `position: relative` and sets the height. The closed panel is `position: absolute` at the same origin, so it does not stretch the row, and it translates up by its own height. The leaving panel stays visible until that transform ends. `.inner` clips it.

`@keyframes slide-out` only changes `max-height`. It is not the form swap. Playing it on `.closed`, or leaving `.closed` in flow with `position: relative`, moves the row while the transform runs and the forms snap instead of sliding past each other.

If either shell motion loses its timing, the drawer open and close fall out of step.

## Elements

On the drawer, inside `.userDrawer`:

`spec` → `wrapper` → `inner` → `content`

`wrapper` does not transition. `inner` clips the slide.

| Piece | Element | What moves |
|---|---|---|
| Shell | `.userDrawer` with `in` / `out` | `transform` `--pwa_slide` |
| Clip | `:host` while `sliding` | layout only (`max-height` snaps) |
| Forms and settings panels | `.content` with `opened` / `closed` | `transform` `--pwa_slide`, then `visibility` |

Page login uses `spec` / `wrapper` / `inner` / `content` for the form swap. It has no collapsing shell. The four settings panels (`profile`, `verification`, `password`, `delete`) are `.content` inside `wrapper` / `inner`. They have no `.spec`.

`user-login` does not slide. Nothing sets its `animation` attribute, and that host does not ease `max-height`.

## Triggers

- Attribute `drawer` on `user-drawer` asks the shell to open or close. Class `out` or `in` on `.userDrawer` is the transform. Attribute `sliding` holds the clip, `visibility`, `pointer-events`, and `inert` until the transform `transitionend`.
- Classes `spec-in` and `spec-out` on `.spec` follow the open flag. They do not transform.
- Classes `opened` and `closed` on `.content`. Drawer and page forms follow sign-in versus sign-up. Settings panels follow the tab.
- Attribute `on` on `.spec` is `display`. It is not a slide.

## Timings

`--pwa_slide` is `2s`. It is set on `:host` in `animation.ts`. Every transform duration and every close delay reads it. Do not add a second number.

| Piece | Duration | Easing |
|---|---|---|
| `.userDrawer` `in` / `out` transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| `sliding` drop (`visibility`, `pointer-events`, `inert`) | `--pwa_slide`, on `transitionend` | n/a |
| `.content` transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| `.content` visibility delay when closing | `--pwa_slide` (`2s`) | `linear` |
| `:host` `max-height` | none (snaps) | n/a |

The panel and the forms move from `translate3d(0, -100%, 0)` to `translate3d(0, 0, 0)`. Open and close are the same duration.

## Reduced motion

`prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on `:host`. Durations and delays that use the variable become `0s`. The drawer also skips the open frame wait and drops `sliding` immediately on close. Only inside that media query.
