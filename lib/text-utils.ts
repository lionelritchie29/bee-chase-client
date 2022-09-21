export const TextUtils = {
  validateContainsAlphaNumeric(text: string) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/i;
    return regex.test(text);
  },
};
