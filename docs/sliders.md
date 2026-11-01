# Slides

The slide is one module: `typescript/webcomponents/css/animation.ts`, plus the shared roll in `typescript/webcomponents/css/roll.ts`. `user-drawer`, `user-login`, and `user-settings` import them. One custom property, `--pwa_slide` (`2s`), times every motion. The full roll write-up is [The roll](drawer-slide.md#the-roll).

Two motions, one duration.

- The drawer rolls. `:host` `max-height` eases `0px` ↔ the measured content height. `section.userDrawer` translates `translate3d(0, -100%, 0)` ↔ `translate3d(0, 0, 0)` on that same clock, so the sheet's bottom stays on the clip's bottom.
- Closed forms and settings panels share the grid area. Class `closed` is `position: absolute` and translates `translate3d(0, -100%, 0)`. `visibility` waits out `--pwa_slide`, then hides.

## How it works

`:host` is the clip (`overflow: hidden`). `.userDrawer` is the sheet: header, `.spec`, `.wrapper`, `.inner`, and the forms. `.wrapper` starts under the header, so the roller is the section, not `.wrapper`.

JS measures the height in px and writes `max-height`. The stylesheet eases that and the sheet transform with `--pwa_slide` and `ease-in-out`. The range is the real height, so the ease is not crushed into the start of a huge range. At progress `p` the clip is `p` times the height and the sheet is shifted `(p - 1)` times its height.

After the open `transitionend`, `max-height` becomes `none`. Closing measures again, locks that px, and eases both `max-height` to `0` and the transform back to `-100%`. A form swap while open, a page-login switch, and a settings tab all call `playRoll` so the new sheet's bottom stays on the clip. The full write-up is [The roll](drawer-slide.md#the-roll).

`sliding` turns on as the open starts. It turns off on the host's `max-height` `transitionend` once the box is at 0. That same moment drops `visibility`, `pointer-events`, and `inert`. On the way in, those are on immediately.

The drawer and the page login still swap login and sign-up inside `.inner`. That pair shares one grid cell: the open form is `position: relative` and sets the height, the closed form is absolute and translated up. `.inner` clips it. Settings tabs do not use that pair. Their panel area is a roll.

`@keyframes slide-out` only changes `max-height`. It is not the form swap. Playing it on `.closed`, or leaving `.closed` in flow with `position: relative`, moves the row while the transform runs and the forms snap instead of sliding past each other.

If either shell motion loses its timing, the drawer open and close fall out of step.

## Elements

On the drawer, inside `.userDrawer`:

`spec` → `wrapper` → `inner` → `content`

`wrapper` does not transition. `inner` clips the slide.

| Piece | Element | What moves |
|---|---|---|
| Clip | `:host` `max-height` | `0px` ↔ measured px, `--pwa_slide` |
| Sheet | `section.userDrawer` | `translate3d(0, -100%, 0)` ↔ `0`, same clock |
| Drawer and page forms | `.content` with `opened` / `closed` | `transform` `--pwa_slide`, then `visibility` |
| Settings panels | `.inner.roll` / `.roll-sheet` | same roll as the drawer, `--pwa_slide` |
| Page login card | `user-login` host / `section.service` | same roll, on `registerTwo` |

Page login uses `spec` / `wrapper` / `inner` / `content` for the form swap, and rolls `section.service` inside the host when that swap changes the card height. The four settings panels (`profile`, `verification`, `password`, `delete`) sit in `.roll-sheet`. The inactive ones are `hidden`. The nav is outside the roll.

## Triggers

- Attribute `drawer` on `user-drawer` rolls the sheet open or closed (`:host([drawer]) .userDrawer` is `translate3d(0, 0, 0)`). Attribute `sliding` holds `visibility`, `pointer-events`, and `inert` until the `max-height` `transitionend`.
- Classes `opened` and `closed` on `.content`. Drawer and page forms follow sign-in versus sign-up. Settings panels follow the tab by rolling `.inner`, not by those classes.
- Attribute `on` on `.spec` is `display`. It is not a slide.

## Timings

`--pwa_slide` is `2s`. It is set on `:host` in `animation.ts`. Every transform duration and every close delay reads it. Do not add a second number.

| Piece | Duration | Easing |
|---|---|---|
| `:host` `max-height` and `.userDrawer` transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| Form-swap height glide | `--pwa_slide` (`2s`) | `ease-in-out` |
| `sliding` drop (`visibility`, `pointer-events`, `inert`) | `--pwa_slide`, on `transitionend` | n/a |
| `.content` transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| `.content` visibility delay when closing | `--pwa_slide` (`2s`) | `linear` |

Open and close are the same duration. The sheet and the forms both use `translate3d(0, -100%, 0)` ↔ `translate3d(0, 0, 0)`, on different elements.

## Reduced motion

`prefers-reduced-motion: reduce` sets `--pwa_slide` to `0s` on `:host`. Durations and delays that use the variable become `0s`. The close drops `sliding` immediately. Only inside that media query.
