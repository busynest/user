let draft = '';
const listeners = new Set();
export function rememberEmail(value) {
    const next = value.trim();
    if (next === draft)
        return;
    draft = next;
    if (!next)
        return;
    listeners.forEach((hear) => hear());
}
export function draftedEmail() {
    return draft;
}
export function onDraftEmail(hear) {
    listeners.add(hear);
    return () => { listeners.delete(hear); };
}
export function clearDraftEmail() {
    draft = '';
}
//# sourceMappingURL=draft.js.map