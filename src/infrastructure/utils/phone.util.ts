export function isValidPhoneNumber(phoneNumber: string) {
  const lib = require('libphonenumber-js');
  if (lib) {
    try {
      const pn = lib.parsePhoneNumber(phoneNumber);
      return pn.isValid();
    } catch (e) {
      return false;
    }
  } else {
    // return CommonConstant.PHONE_NUMBER_REGEX.test(phoneNumber);
  }
}