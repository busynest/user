import { css, CSSResult } from 'lit';

/* The roll. Clip height and sheet translate share --pwa_slide.
   At progress p, clip = from + (to - from) * p, translate = clip - sheetHeight.
   The sheet's bottom stays on the clip's bottom. Open from 0 is translate -100% → 0. */

export const rollStyle: CSSResult = css`

  :host {
    transition:             height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out;
    -webkit-transition:     height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out;
  }

  .roll {
    display:                block; /* Required - a grid stretch makes the sheet as tall as the clip */
    overflow:               hidden;
    min-height:             0;
    /* Required - height forces the box when the new sheet is shorter than the old one. max-height alone cannot. */
    transition:             height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out;
    -webkit-transition:     height var(--pwa_slide, 2s) ease-in-out, max-height var(--pwa_slide, 2s) ease-in-out;
  }

  .roll-sheet {
    display:                block;
    height:                 auto;
    align-self:             start;
    transition:             transform var(--pwa_slide, 2s) ease-in-out;
    -webkit-transition:     transform var(--pwa_slide, 2s) ease-in-out;
  }

`;

export function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Sheet height in px with the clip cap released. Does not paint. */
export function measureSheet(clip: HTMLElement, sheet: HTMLElement): number {
  const transition = clip.style.transition;
  const maxHeight = clip.style.maxHeight;
  const heightStyle = clip.style.height;
  clip.style.transition = 'none';
  clip.style.maxHeight = 'none';
  clip.style.height = 'auto';
  const height = Math.ceil(sheet.getBoundingClientRect().height);
  clip.style.maxHeight = maxHeight;
  clip.style.height = heightStyle;
  clip.style.transition = transition;
  return height;
}

/**
 * Ease the clip from `from` px to `to` px and move the sheet so its bottom
 * stays on the clip's bottom. `sheetHeight` is the sheet's laid-out height
 * (the open target, or the current height when rolling shut to 0).
 */
export function playRoll(
  clip: HTMLElement,
  sheet: HTMLElement,
  from: number,
  to: number,
  sheetHeight: number
): void {
  const start = from - sheetHeight;
  const end = to - sheetHeight;
  const lock = (px: number) => {
    const value = `${Math.max(0, px)}px`;
    clip.style.height = value;
    clip.style.maxHeight = value;
  };
  if (reducedMotion()) {
    clip.style.transition = 'none';
    sheet.style.transition = 'none';
    if (to === 0) lock(0);
    else {
      clip.style.height = 'auto';
      clip.style.maxHeight = 'none';
    }
    sheet.style.transform = end === 0 ? '' : `translate3d(0, ${end}px, 0)`;
    clip.style.transition = '';
    sheet.style.transition = '';
    return;
  }
  clip.style.transition = 'none';
  sheet.style.transition = 'none';
  lock(from);
  sheet.style.transform = `translate3d(0, ${start}px, 0)`;
  void clip.offsetHeight;
  clip.style.transition = '';
  sheet.style.transition = '';
  lock(to);
  sheet.style.transform = `translate3d(0, ${end}px, 0)`;
}

/** Open finished. Let the box size with its content. */
export function releaseRoll(clip: HTMLElement, sheet: HTMLElement): void {
  clip.style.height = 'auto';
  clip.style.maxHeight = 'none';
  sheet.style.transform = '';
}
