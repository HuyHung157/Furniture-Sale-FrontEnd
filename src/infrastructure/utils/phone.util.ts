import { CommonConstant } from "src/app/shared/constants/common.constant";
declare var require: any;

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
    return CommonConstant.PHONE_NUMBER_REGEX.test(phoneNumber);
  }
}

export function splitPhoneNumber(phone: string): { phoneNumberPrefix, phoneNumber } {
  let phoneNumberPrefix = '';
  let phoneNumber = '';
  const lib = require('libphonenumber-js');
  if (lib) {
    try {
      const pn = lib.parsePhoneNumber(phone);
      phoneNumberPrefix = '+' + pn.countryCallingCode;
      phoneNumber = pn.nationalNumber;
    } catch (e) {
      throw e;
    }
  } else {
    const importCountries = require('../json/country_dial_info.json');
    const phonePrefixes = importCountries.map((country) => country.dial_code);
    phone = phone ? ('' + phone).trim() : '';
    if (phone) {
      phoneNumberPrefix = phonePrefixes.find(p => phone.startsWith(p));
    }
    if (!phoneNumberPrefix) {
      throw new Error('Phone number does not match any dial code');
    }
    phoneNumber = phone.substring(phoneNumberPrefix.length);
  }
  return { phoneNumberPrefix, phoneNumber };
}