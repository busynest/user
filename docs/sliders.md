# Slides

The drawer, the page login, and settings each slide on their own. Opening one does not move the others. Nothing moves on the first paint.

Three components slide, and each one owns its roll. `user-drawer` (`typescript/webcomponents/drawer/drawer.ts`), `user-login` (`typescript/webcomponents/login/page.ts`), and `user-settings` (`typescript/webcomponents/settings/settings.ts`) do not import a shared roll helper. There is no `css/roll.ts`.

`animation.ts` is the form swap only: `--pwa_slide`, `.opened` / `.closed`, and the drawer shell's closed backstop. Settings does not import it. The full roll write-up is [The roll](drawer-slide.md#the-roll).

The fields are flush with the element. Spacing belongs to the page: `--pwa_inset` defaults to `0`. The form column fills a narrow host and, once the host is wider than `--pwa_max_width` (`400px`), stays that wide and centers. The page login column centers under the full-width heading. Signed-in drawer links use that same column. Set either variable on `user-drawer`, `user-login`, `user-settings`, or `email-reset`. The drawer header and the settings tabs stay full width. Each host is `display: block` with `width: 100%` and `min-width: 0` (`user-icon` is `width: fit-content`, `max-width: 100%`). A resize while a roll is in motion remeasures that component and eases from the current clip height with the sheet bottom still on the clip.

Two motions, one duration, per component.

- The drawer rolls. `.drawer-clip` eases `height` and `max-height` from `0px` to the measured content height and back. `section.userDrawer` translates on that same clock, so the sheet's bottom stays on the clip's bottom.
- Closed forms share one grid cell. Class `closed` is `position: absolute` and translates `translate3d(0, -100%, 0)`. Once `.inner` has class `motion`, `visibility` waits out `--pwa_slide`, then hides. Settings panels do not use these classes.

## How it works

The clip is an element in that component's template (`overflow: hidden`, `display: block`). The sheet is the block that should ride the bottom edge. `styleMap` binds `height`, `max-height`, `transform`, and `transition` from that component's state. `classMap` binds `opened` and `closed`.

The first render is the resting state and `transition: none`. The drawer binds shut (`0px`, sheet `-100%`). The page login binds the card at `height: auto` with the signup form already `closed`. Settings binds the active tab at `auto`, or the signed-out line when nobody is logged in. Nothing eases on that paint. Class `motion` is added on that component's `.inner` afterwards, and it only arms the form swap. The roll's transition is written later, inside that component's own ease, when the user actually changes something.

JS measures the height in px and the binding eases from the current px to the next px. The range is the real height, so the ease is not crushed into the start of a huge range. At progress `p`, open from 0, the clip is `p` times the height and the sheet is shifted `(p - 1)` times its height. A height change that is not from 0 uses clip `A + (B - A) * p` and `translateY = clip − sheetHeight`.

After the clip's own `max-height` `transitionend`, the binding becomes `height: auto` and `max-height: none`. The listener requires `event.target` to be that clip. Closing measures again, locks that px, and eases both heights to `0` and the transform back to `-100%`. A drawer form swap, a page-login switch, and a settings tab each run only their own ease.

`sliding` on the drawer turns on as the open starts. It turns off when the drawer's clip reaches 0. That same moment drops `visibility`, `pointer-events`, and `inert`. The host's `max-height: 0` backstop has no transition, so it cannot play an open-to-closed ease at load.

The drawer and the page login still swap login and sign-up inside `.inner`. That pair shares one grid cell: the open form is `position: relative` and sets the height, the closed form is absolute and translated up. `.inner` clips it. Settings tabs do not use that pair. Their panel area is their own roll. The nav stays outside it.

`@keyframes slide-out` only changes `max-height`. It is not the form swap. Playing it on `.closed`, or leaving `.closed` in flow with `position: relative`, moves the row while the transform runs and the forms snap instead of sliding past each other.

## Elements

On the drawer, inside `.userDrawer`:

`spec` → `wrapper` → `inner` → `content`

`wrapper` does not transition. `inner` clips the form swap. `.drawer-clip` clips the roll.

| Piece | Element | What moves |
|---|---|---|
| Drawer clip | `.drawer-clip` | `0px` ↔ measured px, this host's `--pwa_slide` |
| Drawer sheet | `section.userDrawer` | lockstep `translateY`, same clock |
| Drawer and page forms | `.content` with `opened` / `closed` | `transform` `--pwa_slide` after `motion`, then `visibility` |
| Settings panels | `.settings-clip` / `.settings-sheet` | that component's own roll |
| Page login card | `.login-clip` / `section.service` | that component's own roll, on `registerTwo` |

Page login uses `spec` / `wrapper` / `inner` / `content` for the form swap, and rolls `section.service` when that swap changes the card height. The four settings panels (`profile`, `verification`, `password`, `delete`) sit in `.settings-sheet`. The inactive ones are `hidden`. The nav is outside the roll.

## Triggers

- Attribute `drawer` on `user-drawer`, after the first update, rolls `.drawer-clip`. Attribute `sliding` holds `visibility`, `pointer-events`, and `inert` until that clip's `max-height` `transitionend`. The `[drawer]` attribute does not set a transform.
- Class `motion` on `.inner` arms `.content` transitions. It is absent on the first paint. The drawer and the page login each set their own.
- Classes `opened` and `closed` on `.content`, bound with `classMap`. Drawer forms follow `registerOne`. Page forms follow `registerTwo`. Settings panels follow the tab by rolling `.settings-clip`, not by those classes.
- Attribute `on` on `.spec` is `display`. It is not a slide.

## Timings

`--pwa_slide` is `2s` on each component's `:host`. The drawer and the page login set it in `animation.ts`. Settings sets it in `settings.ts`. Every transform duration and every close delay in that component reads its own variable. Do not add a second number, and do not put the variable on `:root`.

| Piece | Duration | Easing |
|---|---|---|
| Clip `height` / `max-height` and sheet transform | `--pwa_slide` (`2s`) | `ease-in-out` |
| Form-swap height glide | `--pwa_slide` (`2s`) | `ease-in-out` |
| `sliding` drop (`visibility`, `pointer-events`, `inert`) | on the clip's `transitionend` | n/a |
| `.content` transform, after `motion` | `--pwa_slide` (`2s`) | `ease-in-out` |
| `.content` visibility delay when closing | `--pwa_slide` (`2s`) | `linear` |

Open and close are the same duration. The first paint uses neither.

## Reduced motion

`prefers-reduced-motion: reduce` sets that host's `--pwa_slide` to `0s`. The roll also skips the ease and writes the resting binding with `transition: none`. Only inside that media query, and only on that host.
