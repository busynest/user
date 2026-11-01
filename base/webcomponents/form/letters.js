export function lettersFor(name, email) {
    const trimmed = name.trim();
    if (trimmed) {
        const parts = trimmed.split(/\s+/).slice(0, 2);
        return parts.map((part) => part.charAt(0)).join('').toUpperCase();
    }
    const mail = email.trim();
    if (!mail)
        return '';
    return mail.charAt(0).toUpperCase();
}
export function accountTitle(name, email) {
    const trimmed = name.trim();
    if (trimmed)
        return trimmed;
    const mail = email.trim();
    if (mail)
        return mail;
    return 'Account';
}
//# sourceMappingURL=letters.js.map