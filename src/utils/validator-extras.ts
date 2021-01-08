import _ from 'lodash';
import Validator from 'validator';
import moment from 'moment';

type ValidatorFn = (arg0: string) => boolean;
type RegExpValidatorFn = (str: string, pattern: RegExp, modifiers: string) => boolean;
type currencyOpts = {
  symbol?: string, 
  require_symbol?: boolean, 
  allow_space_after_symbol?: boolean, 
  symbol_after_digits?: boolean, 
  allow_negatives?: boolean, 
  parens_for_negatives?: boolean, 
  negative_sign_before_digits?: boolean, 
  negative_sign_after_digits?: boolean, 
  allow_negative_sign_placeholder?: boolean, 
  thousands_separator?: string, 
  decimal_separator?: string, 
  allow_decimal?: boolean, 
  require_decimal?: boolean, 
  digits_after_decimal?: number[], 
  allow_space_after_digits?: boolean
};
type fqdnOpts = {
  require_tld: boolean, 
  allow_underscores: boolean, 
  allow_trailing_dot: boolean, 
  allow_numeric_tld: boolean
};
type strongPasswordOpts = { 
  minLength: number, 
  minLowercase: number, 
  minUppercase: number, 
  minNumbers: number, 
  minSymbols: number, 
  returnScore: boolean, 
  pointsPerUnique: number, 
  pointsPerRepeat: number, 
  pointsForContainingLower: number, 
  pointsForContainingUpper: number, 
  pointsForContainingNumber: number, 
  pointsForContainingSymbol: number 
}


interface ValidatorCustom extends ValidatorJS.ValidatorStatic {
  extend: <T extends Function>(name: string, fn: T) => void;
  contains: (str: string, elem: string) => boolean;
  is: RegExpValidatorFn;
  isDate: ValidatorFn;
  isDecimal: ValidatorFn;
  isIPv4: ValidatorFn;
  isIPv6: ValidatorFn;
  isImmutable: (...args: any[]) => boolean;
  isNull: ValidatorFn;
  isUrl: ValidatorFn;
  len: (str: string, min: number, max: number) => boolean;
  max: (str: string, val: number) => boolean;
  min: (str: string, val: number) => boolean;
  not: RegExpValidatorFn;
  notContains: (str: string, elem: string) => boolean;
  notEmpty: ValidatorFn;
  notIn: (str: string, values: string[]) => boolean;
  notNull: ValidatorFn;
  notRegex: RegExpValidatorFn;
  regex: RegExpValidatorFn;
  // Added 2021-01
  // Direct Validations (No Options)
  isAscii: ValidatorFn;
  isBase32: ValidatorFn;
  isBase58: ValidatorFn;
  isBIC: ValidatorFn;
  isBoolean: ValidatorFn;
  isBtcAddress: ValidatorFn;
  isDataURI: ValidatorFn;
  isEAN: ValidatorFn;
  isEthereumAddress: ValidatorFn;
  isFullWidth: ValidatorFn;
  isHalfWidth: ValidatorFn;
  isHexadecimal: ValidatorFn;
  isHexColor: ValidatorFn;
  isHSL: ValidatorFn;
  isIBAN: ValidatorFn;
  isIPRange: ValidatorFn;
  isISIN: ValidatorFn;
  isISO31661Alpha2: ValidatorFn;
  isISO31661Alpha3: ValidatorFn;
  isISO8601: ValidatorFn;
  isISRC: ValidatorFn;
  isJWT: ValidatorFn;
  isLocale: ValidatorFn;
  isMACAddress: ValidatorFn;
  isMagnetURI: ValidatorFn;
  isMD5: ValidatorFn;
  isMimeType: ValidatorFn;
  isMongoId: ValidatorFn;
  isMultibyte: ValidatorFn;
  isOctal: ValidatorFn;
  isPort: ValidatorFn;
  isRFC3339: ValidatorFn;
  isSemVer: ValidatorFn;
  isSurrogatePair: ValidatorFn;
  isVariableWidth: ValidatorFn;
  // Validations with Parameters
  isBase64: (str: string, options?: { urlSafe?: boolean }) => boolean;
  isByteLength: (str: string, options?: {min?: number, max?: number}) => boolean;
  isCurrency: (str: string, options?: currencyOpts) => boolean;
  isDivisibleBy: (str: string, divider: number) => boolean;
  isEmpty: (str: string, options?: { ignore_whitespace?: boolean }) => boolean;
  isFQDN: (str: string, options?: fqdnOpts) => boolean;
  isHash: (str: string, algorithm: string) => boolean;
  isIdentityCard: (str: string, locale?: string) => boolean;
  isIMEI: (str: string, options?: { allow_hypens?: boolean }) => boolean;
  isISBN: (str: string, version?: number) => boolean;
  isISSN: (str: string, options?: { case_sensitive?: boolean, require_hyphen?: boolean }) => boolean;
  isJSON: (str: string, options?: { allow_primitives?: boolean }) => boolean;
  isLatLong: (str: string, options?: { checkDMS?: boolean }) => boolean;
  isLength: (str: string, options?: { min?: number, max?: number }) => boolean;
  isLicensePlate: (str: string, locale?: string) => boolean;
  isMobilePhone: (str: string, locale?: string[] | string, options?: { strictMode?: boolean }) => boolean;
  isPassportNumber: (str: string, locale: string) => boolean;
  isPostalCode: (str: string, locale: string) => boolean;
  isRgbColor: (str: string, includePercentValues?: boolean) => boolean;
//  isSlug: ValidatorFn;
  isStrongPassword: (str: string, options?: strongPasswordOpts) => boolean;
  isTaxID: (str: string, locale: string) => boolean;
  isVAT: (str: string, countryCode: string) => boolean;
  isWhitelisted: (str: string, chars: string) => boolean;
//  matches: RegExpValidatorFn;
}

const clonedValidator = _.cloneDeep(Validator);

export const extensions = {
  extend<T extends Function>(name: string, fn: T): void {
    // eslint-disable-next-line
    // @ts-ignore
    this[name] = fn;
  },
  notEmpty(str: string): boolean {
    return !str.match(/^[\s\t\r\n]*$/);
  },
  len(str: string, min: number, max: number): boolean {
    return clonedValidator.isLength(str, min, max);
  },
  isUrl(str: string): boolean {
    return clonedValidator.isURL(str);
  },
  isIPv6(str: string): boolean {
    return clonedValidator.isIP(str, 6);
  },
  isIPv4(str: string): boolean {
    return clonedValidator.isIP(str, 4);
  },
  notIn(str: string, values: string[]): boolean {
    return !clonedValidator.isIn(str, values);
  },
  regex(str: string, pattern: RegExp, modifiers: string): boolean {
    str += '';
    if (Object.prototype.toString.call(pattern).slice(8, -1) !== 'RegExp') {
      pattern = new RegExp(pattern, modifiers);
    }
    const result = str.match(pattern);
    return result ? result.length > 0 : false;
  },
  notRegex(str: string, pattern: RegExp, modifiers: string): boolean {
    return !this.regex(str, pattern, modifiers);
  },
  isDecimal(str: string): boolean {
    return str !== '' && !!str.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][+-]?(?:[0-9]+))?$/);
  },
  min(str: string, val: number): boolean {
    const number = parseFloat(str);
    return isNaN(number) || number >= val;
  },
  max(str: string, val: number): boolean {
    const number = parseFloat(str);
    return isNaN(number) || number <= val;
  },
  not(str: string, pattern: RegExp, modifiers: string): boolean {
    return this.notRegex(str, pattern, modifiers);
  },
  contains(str: string, elem: string): boolean {
    return !!elem && str.includes(elem);
  },
  notContains(str: string, elem: string): boolean {
    return !this.contains(str, elem);
  },
  is(str: string, pattern: RegExp, modifiers: string): boolean {
    return this.regex(str, pattern, modifiers);
  },
  // Added 2021-01
  // Direct Validations (No Options)
  isAscii(str: string): boolean {
    return clonedValidator.isAscii(str);
  },
  isBase32(str: string): boolean {
    return clonedValidator.isBase32(str);
  },
  isBase58(str: string): boolean {
    return clonedValidator.isBase58(str);
  },
  isBIC(str: string): boolean {
    return clonedValidator.isBIC(str);
  },
  isBoolean(str: string): boolean {
    return clonedValidator.isBoolean(str);
  },
  isBtcAddress(str: string): boolean {
    return clonedValidator.isBtcAddress(str);
  },
  isDataURI(str: string): boolean {
    return clonedValidator.isDataURI(str);
  },
  isEAN(str: string): boolean {
    return clonedValidator.isEAN(str);
  },
  isEthereumAddress(str: string): boolean {
    return clonedValidator.isEthereumAddress(str);
  },
  isFullWidth(str: string): boolean {
    return clonedValidator.isFullWidth(str);
  },
  isHalfWidth(str: string): boolean {
    return clonedValidator.isHalfWidth(str);
  },
  isHexadecimal(str: string): boolean {
    return clonedValidator.isHexadecimal(str);
  },
  isHexColor(str: string): boolean {
    return clonedValidator.isHexColor(str);
  },
  isHSL(str: string): boolean {
    return clonedValidator.isHSL(str);
  },
  isIBAN(str: string): boolean {
    return clonedValidator.isIBAN(str);
  },
  isIPRange(str: string): boolean {
    return clonedValidator.isIPRange(str);
  },
  isISIN(str: string): boolean {
    return clonedValidator.isISIN(str);
  },
  isISO31661Alpha2(str: string): boolean {
    return clonedValidator.isISO31661Alpha2(str);
  },
  isISO31661Alpha3(str: string): boolean {
    return clonedValidator.isISO31661Alpha3(str);
  },
  isISO8601(str: string): boolean {
    return clonedValidator.isISO8601(str);
  },
  isISRC(str: string): boolean {
    return clonedValidator.isISRC(str);
  },
  isJWT(str: string): boolean {
    return clonedValidator.isJWT(str);
  },
  isLocale(str: string): boolean {
    return clonedValidator.isLocale(str);
  },
  isMACAddress(str: string): boolean {
    return clonedValidator.isMACAddress(str);
  },
  isMagnetURI(str: string): boolean {
    return clonedValidator.isMagnetURI(str);
  },
  isMD5(str: string): boolean {
    return clonedValidator.isMD5(str);
  },
  isMimeType(str: string): boolean {
    return clonedValidator.isMimeType(str);
  },
  isMongoId(str: string): boolean {
    return clonedValidator.isMongoId(str);
  },
  isMultibyte(str: string): boolean {
    return clonedValidator.isMultibyte(str);
  },
  isOctal(str: string): boolean {
    return clonedValidator.isOctal(str);
  },
  isPort(str: string): boolean {
    return clonedValidator.isPort(str);
  },
  isRFC3339(str: string): boolean {
    return clonedValidator.isRFC3339(str);
  },
  isSemVer(str: string): boolean {
    return clonedValidator.isSemVer(str);
  },
  isSurrogatePair(str: string): boolean {
    return clonedValidator.isSurrogatePair(str);
  },
  isVariableWidth(str: string): boolean {
    return clonedValidator.isVariableWidth(str);
  },
  // Validations with Parameters
  isBase64(str: string, options?: { urlSafe?: boolean }): boolean {
    return clonedValidator.isBase64(str, options);
  },
  isByteLength(str: string, options?: {min?: number, max?: number}): boolean {
    return clonedValidator.isByteLength(str, options);
  },
  isCurrency(str: string, options?: currencyOpts): boolean {
    return clonedValidator.isCurrency(str, options);
  },
  isDivisibleBy(str: string, divider: number): boolean {
    return clonedValidator.isDivisibleBy(str, divider);
  },
  isEmpty(str: string, options?: { ignore_whitespace?: boolean }): boolean {
    return clonedValidator.isEmpty(str, options);
  },
  isFQDN(str: string, options?: fqdnOpts): boolean {
    return clonedValidator.isFQDN(str, options);
  },
  isHash(str: string, algorithm: string): boolean {
    return clonedValidator.isHash(str, algorithm);
  },
  isIdentityCard(str: string, locale?: string): boolean {
    return clonedValidator.isIdentityCard(str, locale);
  },
  isIMEI(str: string, options?: { allow_hypens?: boolean }): boolean {
    return clonedValidator.isIMEI(str, options);
  },
  isISBN(str: string, version?: number): boolean {
    if (![10,13,undefined]includes(version)) { throw new Error('Valid version types are "10" or "13".'); }
    return clonedValidator.isISBN(str, version);
  },
  isISSN(str: string, options?: { case_sensitive?: boolean, require_hyphen?: boolean }): boolean {
    return clonedValidator.isISSN(str, options);
  },
  isJSON(str: string, options?: { allow_primitives?: boolean }): boolean {
    return clonedValidator.isJSON(str, options);
  },
  isLatLong(str: string, options?: { checkDMS?: boolean }): boolean {
    return clonedValidator.isLatLong(str, options);
  },
  isLength(str: string, options?: { min?: number, max?: number }): boolean {
    return clonedValidator.isLength(str, options);
  },
  isLicensePlate(str: string, locale?: string): boolean {
    if (!['de-DE', 'de-LI', 'pt-PT', 'sq-AL', 'any', undefined].includes(locale)) { throw new Error("Must be one of: 'de-DE', 'de-LI', 'pt-PT', 'sq-AL', 'any'"); }
    return clonedValidator.isLicensePlate(str, locale);
  },
  isMobilePhone(str: string, locale?: string[] | string, options?: { strictMode?: boolean }): boolean {
    const validOptions = [...clonedValidator.isMobilePhoneLocales, undefined];
    if (!Array.isArray(locale)) { locale = [locale]; }
    for (const item of locale) {
      if (!validOptions.includes(item)) { throw new Error(`Must be one of: ${validOptions.join(', ')}`); }
    } 
    return clonedValidator.isMobilePhone(str, locale, options);
  },
  isPassportNumber(str: string, locale: string): boolean {
      const validOptions = [
        'AM', 'AR', 'AT', 'AU', 'BE', 'BG', 'BY', 'CA', 'CH', 
        'CN', 'CY', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 
        'FR', 'GB', 'GR', 'HR', 'HU', 'IE' 'IN', 'IS', 'IT', 
        'JP', 'KR', 'LT', 'LU', 'LV', 'MT', 'NL', 'PO', 'PT', 
        'RO', 'RU', 'SE', 'SL', 'SK', 'TR', 'UA', 'US', undefined];
    if (!validOptions.includes(locale)) { throw new Error(`Must be one of: ${validOptions.join(', ')}`); }
    return clonedValidator.isPassportNumber(str, locale);
  },
  isPostalCode(str: string, locale: string): boolean {
    const validOptions = [...clonedValidator.isPostalCodeLocales];
    if (!validOptions.includes(locale)) { throw new Error(`Must be one of: ${validOptions.join(', ')}`); }
    return clonedValidator.isPostalCode(str, locale);
  },
  isRgbColor(str: string, includePercentValues?: boolean): boolean {
    return clonedValidator.isRgbColor(str, includePercentValues);
  },
//  isSlug(str: string): boolean {          // Removed due to missing parameter explainations
//    return clonedValidator.isSlug(str);
//  },
  isStrongPassword(str: string, options?: strongPasswordOpts): boolean {
    return clonedValidator.isStrongPassword(str, options);
  },
  isTaxID(str: string, locale: string): boolean {
    const validOptions = [ 
      'bg-BG', 'cs-CZ', 'de-AT', 'de-DE', 'dk-DK', 'el-CY', 
      'el-GR', 'en-GB', 'en-IE', 'en-US', 'es-ES', 'et-EE', 
      'fi-FI', 'fr-BE', 'fr-FR', 'fr-LU', 'hr-HR', 'hu-HU', 
      'it-IT', 'lb-LU', 'lt-LT', 'lv-LV' 'mt-MT', 'nl-BE', 
      'nl-NL', 'pl-PL', 'pt-PT', 'ro-RO', 'sk-SK', 'sl-SI', 'sv-SE' ];
    if (!validOptions.includes(locale)) { throw new Error(`Must be one of: ${validOptions.join(', ')}`); }
    return clonedValidator.isTaxID(str, locale);
  },
  isVAT(str: string, countryCode: string): boolean {
    const validOptions = [ 'GB', 'IT' ];
    if (!validOptions.includes(countryCode)) { throw new Error(`Must be one of: ${validOptions.join(', ')}`); }
    return clonedValidator.isVAT(str, countryCode);
  },
  isWhitelisted(str: string, chars: string): boolean {
    return clonedValidator.isWhitelisted(str, chars);
  },
};

const extraValidator = {
  // instance based validators
  isImmutable(
    value: unknown,
    validatorArgs: unknown[],
    field: string,
    modelInstance: {
      isNewRecord: boolean;
      getDataValue: (args0: string) => unknown;
      previous: (args0: string) => unknown;
    }
  ) {
    return modelInstance.isNewRecord || modelInstance.getDataValue(field) === modelInstance.previous(field);
  },

  // extra validators
  notNull(val: string) {
    return val !== null && val !== undefined;
  },

  // map isNull to isEmpty
  // https://github.com/chriso/validator.js/commit/e33d38a26ee2f9666b319adb67c7fc0d3dea7125
  isNull: clonedValidator.isEmpty,
  
  // Map matches to "is"
  matches: 

  // isDate removed in 7.0.0
  // https://github.com/chriso/validator.js/commit/095509fc707a4dc0e99f85131df1176ad6389fc9
  isDate(dateString: string) {
    // avoid http://momentjs.com/guides/#/warnings/js-date/
    // by doing a preliminary check on `dateString`
    const parsed = Date.parse(dateString);
    if (isNaN(parsed)) {
      // fail if we can't parse it
      return false;
    }
    // otherwise convert to ISO 8601 as moment prefers
    // http://momentjs.com/docs/#/parsing/string/
    const date = new Date(parsed);
    return moment(date.toISOString()).isValid();
  }
};

export const validator: ValidatorCustom = { ...clonedValidator, ...extensions, ...extraValidator };
