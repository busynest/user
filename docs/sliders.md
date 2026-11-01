# Slides

The slide is one module: `typescript/webcomponents/css/animation.ts`. `user-drawer`, `user-login`, and `user-settings` import it.

Three parts.

- The container carries `max-height`.
- The moving child carries `transform`.
- Closed content runs both. Class `closed` translates `translate3d(0, -102%, 0)` and plays `slide-out`, which animates `max-height`.

## Elements

On the drawer, inside `.userDrawer`:

`spec` → `wrapper` → `inner` → `content`

`wrapper` does not transition. `inner` clips the slide.

| Piece | Element | What moves |
|---|---|---|
| Shell | `:host`, and `.userDrawer` with `in` / `out` | `max-height` |
| Sheet | `.spec` with `spec-in` / `spec-out` | `transform` |
| Forms and settings panels | `.content` with `opened` / `closed` | `transform`, and `slide-out` on `closed` |

Page login uses `spec` / `wrapper` / `inner` / `content` for the form swap. It has no collapsing shell. The four settings panels (`profile`, `verification`, `password`, `delete`) are `.content` inside `wrapper` / `inner`. They have no `.spec`.

`user-login` host uses the same max-height timing as the drawer shell. Nothing sets the `animation` attribute, so that host does not collapse.

## Triggers

- Attribute `drawer` on `user-drawer`. Classes `in` and `out` on `.userDrawer`. That opens and closes the shell.
- Classes `spec-in` and `spec-out` on `.spec`. Same flag. The sheet moves.
- Classes `opened` and `closed` on `.content`. Drawer and page forms follow sign-in versus sign-up. Settings panels follow the tab.
- Attribute `on` on `.spec` is `display`. It is not a slide.
- Attribute `animation` on `user-login` would open the host `max-height`. It is not set.

## Timings

The beat is `1.4s`. Leave it there.

| Piece | Duration | Easing |
|---|---|---|
| Host and `.in` / `.out` `max-height` | `var(--pwa_slide_time, 1.4s)` | `ease-in-out` |
| `.in` visibility delay | the same variable | `linear` |
| `.spec-in` transform | `1.5s` | `ease` |
| `.spec-out` transform | `2.2s` | `ease` |
| `.content` transform | `2s` | `ease-in-out` |
| `slide-out` on `.closed` | `2s` | `ease-out` |

Transform durations are literals. They do not use `calc()`.

## Custom properties

`--pwa_slide_time` sets the max-height beat and the close visibility delay. Default `1.4s`. It does not change the `1.5s`, `2.2s`, or `2s` transforms.

`--pwa_slide_ease` is not read. Max-height easing is the literal `ease-in-out`.

## Reduced motion

`prefers-reduced-motion: reduce` sets `--pwa_slide_time` to `0s` on `:host`. It also sets transition and animation durations to `0s` on `.content`, `.opened`, `.closed`, `.spec-in`, and `.spec-out`. Only inside that media query.
