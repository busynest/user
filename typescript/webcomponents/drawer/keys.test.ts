import { describe, expect, it } from 'vitest';
import { focusable, isHidden } from './keys';

function drawerWithSlot(open: boolean) {
  const host = document.createElement('div');
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <div class="spec" ${open ? 'on' : ''}>
      <slot name="before"></slot>
    </div>
  `;
  const link = document.createElement('a');
  link.href = './settings';
  link.setAttribute('slot', 'before');
  link.textContent = 'settings';
  host.append(link);
  document.body.append(host);
  const slot = root.querySelector('slot');
  // Required - some test DOMs list assigned nodes but omit the back-pointer
  if (slot && !link.assignedSlot) {
    Object.defineProperty(link, 'assignedSlot', { configurable: true, value: slot });
  }
  return { host, link };
}

describe('slotted drawer links', () => {

  it('skips a slotted link when its slot sits in a hidden spec', () => {
    const { host, link } = drawerWithSlot(false);
    expect(link.assignedSlot).toBeTruthy();
    expect(isHidden(link)).toBe(true);
    expect(focusable(host)).not.toContain(link);
    host.remove();
  });

  it('keeps a slotted link when that spec is open', () => {
    const { host, link } = drawerWithSlot(true);
    expect(isHidden(link)).toBe(false);
    expect(focusable(host)).toContain(link);
    host.remove();
  });

});
