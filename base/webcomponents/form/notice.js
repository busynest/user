/** Required - sign-up told this address to check its inbox. */
let sentEmail = '';
const listeners = new Set();
export function markVerificationNotice(email) {
    sentEmail = email;
    listeners.forEach((fn) => fn());
}
export function verificationNotice() {
    return sentEmail;
}
export function onVerificationNotice(fn) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
}
//# sourceMappingURL=notice.js.map