# Slides

The slide is one module: `typescript/webcomponents/css/animation.ts`. `user-drawer`, `user-login`, and `user-settings` import it.

Three parts.

- The container carries `max-height`.
- The moving child carries `transform`.
- Closed content runs both. Class `closed` translates `translate3d(0, -102%, 0)` and plays `slide-out`, which animates `max-height`.

## How it works

The slide is two motions that run together. The container's `max-height` grows or shrinks the space. The child's `transform` slides the panel into that space. `inner` clips, so it looks like it comes from behind an edge.

On close, visibility is held for `1.4s`, so the panel does not vanish before the motion ends.

Closed content translates to `-102%` and runs `slide-out`, so height and position change together.

If either motion loses its timing, they fall out of step and the slide snaps.

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

Durations are literals. The shell beat is `1.4s`. Leave it there.

| Piece | Duration | Easing |
|---|---|---|
| Host and `.in` / `.out` `max-height` | `1.4s` | `ease-in-out` |
| `.in` visibility delay | `1.4s` | `linear` |
| `.spec-out` transform, open | `2.2s` | `ease` |
| `.spec-in` transform, close | `1.5s` | `ease` |
| `.content` transform | `2s` | `ease-in-out` |
| `slide-out` on `.closed` | `2s` | `ease-out` |

The sheet moves from `translate3d(0, -100%, 0)` to `translate3d(0, 0, 0)`. Opening was measured at `2.2s` (`.spec-out`). Closing uses `.spec-in` at `1.5s`.

No slide timing is a custom property. Hosts do not set one.

## Reduced motion

`prefers-reduced-motion: reduce` sets `transition-duration` and `animation-duration` to `0s` on the shell, the sheet, and `.content`. Only inside that media query. It does not go through a custom property.
