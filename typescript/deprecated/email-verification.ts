/* Optional - retired. contact-email used to send the verification mail itself, and a comment wrote users/{uid}. Neither is called. Required - sendVerification() sends the mail. The host owns users/{uid}. */

/** @deprecated Optional - the old contact-email sender. Required - use sendVerification(). */
export const retiredEmailVerification = `
private emailVerification() {
  sendEmailVerification(auth.currentUser)
    .then(() => { console.log('success'); })
    .catch(e => console.log(e));
}
`;
