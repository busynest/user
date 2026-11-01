/** Required - two initials from the name, else the first letter of the email. */
export function lettersFor(name: string, email: string): string {

  const trimmed = name.trim();

  if (trimmed) {
    const parts = trimmed.split(/\s+/).slice(0, 2);
    return parts.map((part) => part.charAt(0)).join('').toUpperCase();
  }

  const mail = email.trim();
  if (!mail) return '';
  return mail.charAt(0).toUpperCase();

}

/** Required - header text. Never a stand-in person. */
export function accountTitle(name: string, email: string): string {

  const trimmed = name.trim();
  if (trimmed) return trimmed;

  const mail = email.trim();
  if (mail) return mail;

  return 'Account';

}
