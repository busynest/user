/** Required - walk open shadow roots. closest() stops at the boundary. */
export function isHidden(el) {
    let current = el;
    while (current) {
        if (current instanceof HTMLElement) {
            if (current.classList.contains('closed'))
                return true;
            if (current.classList.contains('spec') && !current.hasAttribute('on'))
                return true;
        }
        // Required - a slotted link lives in light DOM. Cross at the slot into the shadow tree.
        if (current instanceof Element && current.assignedSlot && current.assignedSlot !== current) {
            current = current.assignedSlot;
            continue;
        }
        if (current.parentElement) {
            current = current.parentElement;
            continue;
        }
        const root = current.getRootNode();
        if (root instanceof ShadowRoot) {
            current = root.host;
            continue;
        }
        break;
    }
    return false;
}
/** Required - buttons, links, and fields the drawer can tab through. */
export function focusable(host) {
    const found = [];
    const selector = 'button, a[href], input, select, textarea';
    const walk = (root) => {
        root.querySelectorAll(selector).forEach((el) => {
            if (el.hasAttribute('disabled'))
                return;
            if (el.tabIndex < 0)
                return;
            if (isHidden(el))
                return;
            found.push(el);
        });
        root.querySelectorAll('*').forEach((el) => {
            if (el.shadowRoot)
                walk(el.shadowRoot);
        });
    };
    if (host.shadowRoot)
        walk(host.shadowRoot);
    walk(host);
    return found.filter((el, index) => found.indexOf(el) === index);
}
/** Required - the real control, not the custom-element host. */
export function deepActive() {
    let node = document.activeElement;
    while (node?.shadowRoot?.activeElement instanceof HTMLElement) {
        node = node.shadowRoot.activeElement;
    }
    return node;
}
//# sourceMappingURL=keys.js.map