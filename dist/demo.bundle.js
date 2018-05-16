/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/cookies.js":
/*!***************************!*\
  !*** ./client/cookies.js ***!
  \***************************/
/*! exports provided: readCookie, writeCookie, readCookieSync, writeCookieSync, checkCookiesEnabled, checkCookiesEnabledPromise, checkIabCookie, setIabCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readCookie\", function() { return readCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeCookie\", function() { return writeCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readCookieSync\", function() { return readCookieSync; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"writeCookieSync\", function() { return writeCookieSync; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkCookiesEnabled\", function() { return checkCookiesEnabled; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkCookiesEnabledPromise\", function() { return checkCookiesEnabledPromise; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkIabCookie\", function() { return checkIabCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setIabCookie\", function() { return setIabCookie; });\nvar host = window && window.location && window.location.hostname || '';\nvar parts = host.split('.');\nvar COOKIE_DOMAIN = parts.length > 1 ? \";domain=.\".concat(parts.slice(-2).join('.')) : '';\nvar COOKIE_MAX_AGE = 33696000;\nvar COOKIE_NAME = 'euconsent';\nvar PATH = '/';\n\nfunction checkCookiesEnabled() {\n  var cookieEnabled = navigator.cookieEnabled ? true : false;\n\n  if (typeof navigator.cookieEnabled == \"undefined\" && !cookieEnabled) {\n    document.cookie = \"testcookie\";\n    cookieEnabled = document.cookie.indexOf(\"testcookie\") != -1 ? true : false;\n  }\n\n  return cookieEnabled;\n}\n\nfunction checkCookiesEnabledPromise() {\n  return new Promise(function (resolve, reject) {\n    var cookieEnabled = navigator.cookieEnabled ? true : false;\n\n    if (typeof navigator.cookieEnabled == \"undefined\" && !cookieEnabled) {\n      document.cookie = \"testcookie\";\n      cookieEnabled = document.cookie.indexOf(\"testcookie\") != -1 ? true : false;\n    }\n\n    if (cookieEnabled == true || false) {\n      console.log(\"CMP => set cookie status : \".concat(cookieEnabled));\n      resolve(cookieEnabled);\n    } else {\n      reject('Error checking if CMP can set cookies');\n    }\n  });\n}\n\nfunction checkIabCookie(result) {\n  if (result == false) console.error('CMP => Cookies are blocked!');\n  return new Promise(function (resolve, reject) {\n    readCookie('euconsent').then(function (result) {\n      if (result) {\n        console.log(\"CMP => IAB cookie loaded: \".concat(result));\n        resolve(result);\n      } else {\n        console.log(\"CMP => No IAB cookie present\");\n        resolve(false);\n      }\n    });\n  });\n}\n\nfunction setIabCookie(result) {\n  return new Promise(function (resolve, reject) {\n    if (result == 'fullConsent') {\n      onFullConsent();\n      writeCookie();\n    }\n  });\n}\n\nfunction writeCookieSync(value) {\n  document.cookie = \"\".concat(COOKIE_NAME, \"=\").concat(value).concat(COOKIE_DOMAIN, \";path=\").concat(PATH, \";max-age=\").concat(COOKIE_MAX_AGE);\n  return;\n}\n\nfunction readCookieSync() {\n  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'euconsent';\n  var value = '; ' + document.cookie;\n  var parts = value.split('; ' + name + '=');\n\n  if (parts.length === 2) {\n    return parts.pop().split(';').shift();\n  }\n\n  return;\n} // below functions use Promises\n\n\nfunction writeCookie(value) {\n  document.cookie = \"\".concat(COOKIE_NAME, \"=\").concat(value).concat(COOKIE_DOMAIN, \";path=\").concat(PATH, \";max-age=\").concat(COOKIE_MAX_AGE);\n  return Promise.resolve(true);\n}\n\nfunction readCookie() {\n  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'euconsent';\n  var value = '; ' + document.cookie;\n  var parts = value.split('; ' + name + '=');\n\n  if (parts.length === 2) {\n    return Promise.resolve(parts.pop().split(';').shift());\n  }\n\n  return Promise.resolve();\n}\n\n\n\n//# sourceURL=webpack:///./client/cookies.js?");

/***/ }),

/***/ "./cookie/cookieutils.js":
/*!*******************************!*\
  !*** ./cookie/cookieutils.js ***!
  \*******************************/
/*! exports provided: padRight, padLeft, encodeCookieValue, encodeField, encodeDataToBits, encodeIntToBits, encodeBoolToBits, encodeDateToBits, encode6BitCharacters, decodeBitsToInt, decodeBitsToDate, decodeBitsToBool, decodeCookieValue, decodeCookieBitValue, encodeVendorCookieValue, decodeVendorCookieValue, encodePublisherCookieValue, decodePublisherCookieValue, decode6BitCharacters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"padRight\", function() { return padRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"padLeft\", function() { return padLeft; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeCookieValue\", function() { return encodeCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeField\", function() { return encodeField; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeDataToBits\", function() { return encodeDataToBits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeIntToBits\", function() { return encodeIntToBits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeBoolToBits\", function() { return encodeBoolToBits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeDateToBits\", function() { return encodeDateToBits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encode6BitCharacters\", function() { return encode6BitCharacters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeBitsToInt\", function() { return decodeBitsToInt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeBitsToDate\", function() { return decodeBitsToDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeBitsToBool\", function() { return decodeBitsToBool; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeCookieValue\", function() { return decodeCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeCookieBitValue\", function() { return decodeCookieBitValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeVendorCookieValue\", function() { return encodeVendorCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodeVendorCookieValue\", function() { return decodeVendorCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodePublisherCookieValue\", function() { return encodePublisherCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decodePublisherCookieValue\", function() { return decodePublisherCookieValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decode6BitCharacters\", function() { return decode6BitCharacters; });\n/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definitions */ \"./cookie/definitions/index.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n//import log from '../log';\n\nvar SIX_BIT_ASCII_OFFSET = 65;\n\nfunction repeat(count) {\n  var string = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';\n  var padString = '';\n\n  for (var i = 0; i < count; i++) {\n    padString += string;\n  }\n\n  return padString;\n}\n\nfunction padLeft(string, padding) {\n  return repeat(Math.max(0, padding)) + string;\n}\n\nfunction padRight(string, padding) {\n  return string + repeat(Math.max(0, padding));\n}\n\nfunction encodeIntToBits(number, numBits) {\n  var bitString = '';\n\n  if (typeof number === 'number' && !isNaN(number)) {\n    bitString = parseInt(number, 10).toString(2);\n  } // Pad the string if not filling all bits\n\n\n  if (numBits >= bitString.length) {\n    bitString = padLeft(bitString, numBits - bitString.length);\n  } // Truncate the string if longer than the number of bits\n\n\n  if (bitString.length > numBits) {\n    bitString = bitString.substring(0, numBits);\n  }\n\n  return bitString;\n}\n/**\n * Encodes each character of a string in 6 bits starting\n * with [aA]=0 through [zZ]=25\n */\n\n\nfunction encode6BitCharacters(string, numBits) {\n  var encoded = typeof string !== 'string' ? '' : string.split('').map(function (char) {\n    var int = Math.max(0, char.toUpperCase().charCodeAt(0) - SIX_BIT_ASCII_OFFSET);\n    return encodeIntToBits(int > 25 ? 0 : int, 6);\n  }).join('');\n  return padRight(encoded, numBits).substr(0, numBits);\n}\n\nfunction encodeBoolToBits(value) {\n  return encodeIntToBits(value === true ? 1 : 0, 1);\n}\n\nfunction encodeDateToBits(date, numBits) {\n  if (date instanceof Date) {\n    return encodeIntToBits(date.getTime() / 100, numBits);\n  }\n\n  return encodeIntToBits(date, numBits);\n}\n\nfunction decodeBitsToInt(bitString, start, length) {\n  return parseInt(bitString.substr(start, length), 2);\n}\n\nfunction decodeBitsToDate(bitString, start, length) {\n  return new Date(decodeBitsToInt(bitString, start, length) * 100);\n}\n\nfunction decodeBitsToBool(bitString, start) {\n  return parseInt(bitString.substr(start, 1), 2) === 1;\n}\n\nfunction decode6BitCharacters(bitString, start, length) {\n  var decoded = '';\n  var decodeStart = start;\n\n  while (decodeStart < start + length) {\n    decoded += String.fromCharCode(SIX_BIT_ASCII_OFFSET + decodeBitsToInt(bitString, decodeStart, 6));\n    decodeStart += 6;\n  }\n\n  return decoded;\n}\n\nfunction encodeField(_ref) {\n  var input = _ref.input,\n      field = _ref.field;\n  var name = field.name,\n      type = field.type,\n      numBits = field.numBits,\n      encoder = field.encoder,\n      validator = field.validator;\n\n  if (typeof validator === 'function') {\n    if (!validator(input)) {\n      return '';\n    }\n  }\n\n  if (typeof encoder === 'function') {\n    return encoder(input);\n  }\n\n  var bitCount = typeof numBits === 'function' ? numBits(input) : numBits;\n  var inputValue = input[name];\n  var fieldValue = inputValue === null || inputValue === undefined ? '' : inputValue;\n\n  switch (type) {\n    case 'int':\n      return encodeIntToBits(fieldValue, bitCount);\n\n    case 'bool':\n      return encodeBoolToBits(fieldValue);\n\n    case 'date':\n      return encodeDateToBits(fieldValue, bitCount);\n\n    case 'bits':\n      return padRight(fieldValue, bitCount - fieldValue.length).substring(0, bitCount);\n\n    case '6bitchar':\n      return encode6BitCharacters(fieldValue, bitCount);\n\n    case 'list':\n      return fieldValue.reduce(function (acc, listValue) {\n        return acc + encodeFields({\n          input: listValue,\n          fields: field.fields\n        });\n      }, '');\n\n    default:\n      log.warn(\"Cookie definition field found without encoder or type: \".concat(name));\n      return '';\n  }\n}\n\nfunction encodeFields(_ref2) {\n  var input = _ref2.input,\n      fields = _ref2.fields;\n  return fields.reduce(function (acc, field) {\n    acc += encodeField({\n      input: input,\n      field: field\n    });\n    return acc;\n  }, '');\n}\n\nfunction decodeField(_ref3) {\n  var input = _ref3.input,\n      output = _ref3.output,\n      startPosition = _ref3.startPosition,\n      field = _ref3.field;\n  var type = field.type,\n      numBits = field.numBits,\n      decoder = field.decoder,\n      validator = field.validator,\n      listCount = field.listCount;\n\n  if (typeof validator === 'function') {\n    if (!validator(output)) {\n      // Not decoding this field so make sure we start parsing the next field at\n      // the same point\n      return {\n        newPosition: startPosition\n      };\n    }\n  }\n\n  if (typeof decoder === 'function') {\n    return decoder(input, output, startPosition);\n  }\n\n  var bitCount = typeof numBits === 'function' ? numBits(output) : numBits;\n  var listEntryCount = typeof listCount === 'function' ? listCount(output) : typeof listCount === 'number' ? listCount : 0;\n\n  switch (type) {\n    case 'int':\n      return {\n        fieldValue: decodeBitsToInt(input, startPosition, bitCount)\n      };\n\n    case 'bool':\n      return {\n        fieldValue: decodeBitsToBool(input, startPosition)\n      };\n\n    case 'date':\n      return {\n        fieldValue: decodeBitsToDate(input, startPosition, bitCount)\n      };\n\n    case 'bits':\n      return {\n        fieldValue: input.substr(startPosition, bitCount)\n      };\n\n    case '6bitchar':\n      return {\n        fieldValue: decode6BitCharacters(input, startPosition, bitCount)\n      };\n\n    case 'list':\n      return new Array(listEntryCount).fill().reduce(function (acc) {\n        var _decodeFields = decodeFields({\n          input: input,\n          fields: field.fields,\n          startPosition: acc.newPosition\n        }),\n            decodedObject = _decodeFields.decodedObject,\n            newPosition = _decodeFields.newPosition;\n\n        return {\n          fieldValue: _toConsumableArray(acc.fieldValue).concat([decodedObject]),\n          newPosition: newPosition\n        };\n      }, {\n        fieldValue: [],\n        newPosition: startPosition\n      });\n\n    default:\n      log.warn(\"Cookie definition field found without decoder or type: \".concat(name));\n      return {};\n  }\n}\n\nfunction decodeFields(_ref4) {\n  var input = _ref4.input,\n      fields = _ref4.fields,\n      _ref4$startPosition = _ref4.startPosition,\n      startPosition = _ref4$startPosition === void 0 ? 0 : _ref4$startPosition;\n  var position = startPosition;\n  var decodedObject = fields.reduce(function (acc, field) {\n    var name = field.name,\n        numBits = field.numBits;\n\n    var _decodeField = decodeField({\n      input: input,\n      output: acc,\n      startPosition: position,\n      field: field\n    }),\n        fieldValue = _decodeField.fieldValue,\n        newPosition = _decodeField.newPosition;\n\n    if (fieldValue !== undefined) {\n      acc[name] = fieldValue;\n    }\n\n    if (newPosition !== undefined) {\n      position = newPosition;\n    } else if (typeof numBits === 'number') {\n      position += numBits;\n    }\n\n    return acc;\n  }, {});\n  return {\n    decodedObject: decodedObject,\n    newPosition: position\n  };\n}\n/**\n * Encode the data properties to a bit string. Encoding will encode\n * either `selectedVendorIds` or the `vendorRangeList` depending on\n * the value of the `isRange` flag.\n */\n\n\nfunction encodeDataToBits(data, definitionMap) {\n  var cookieVersion = data.cookieVersion;\n\n  if (typeof cookieVersion !== 'number') {\n    log.error('Could not find cookieVersion to encode');\n  } else if (!definitionMap[cookieVersion]) {\n    log.error(\"Could not find definition to encode cookie version \".concat(cookieVersion));\n  } else {\n    var cookieFields = definitionMap[cookieVersion].fields;\n    return encodeFields({\n      input: data,\n      fields: cookieFields\n    });\n  }\n}\n/**\n * Take all fields required to encode the cookie and produce the\n * URL safe Base64 encoded value.\n */\n\n\nfunction encodeCookieValue(data, definitionMap) {\n  var binaryValue = encodeDataToBits(data, definitionMap);\n\n  if (binaryValue) {\n    // Pad length to multiple of 8\n    var paddedBinaryValue = padRight(binaryValue, 7 - (binaryValue.length + 7) % 8); // Encode to bytes\n\n    var bytes = '';\n\n    for (var i = 0; i < paddedBinaryValue.length; i += 8) {\n      bytes += String.fromCharCode(parseInt(paddedBinaryValue.substr(i, 8), 2));\n    } // Make base64 string URL friendly\n\n\n    return btoa(bytes).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');\n  }\n}\n\nfunction encodeVendorCookieValue(vendorData) {\n  return encodeCookieValue(vendorData, _definitions__WEBPACK_IMPORTED_MODULE_0__[\"vendorVersionMap\"]);\n}\n\nfunction encodePublisherCookieValue(publisherData) {\n  return encodeCookieValue(publisherData, _definitions__WEBPACK_IMPORTED_MODULE_0__[\"publisherVersionMap\"]);\n}\n/**\n * Decode the (URL safe Base64) value of a cookie into an object.\n */\n\n\nfunction decodeCookieValue(cookieValue, definitionMap) {\n  // Replace safe characters\n  var unsafe = cookieValue.replace(/-/g, '+').replace(/_/g, '/') + '=='.substring(0, 3 * cookieValue.length % 4);\n  var bytes = atob(unsafe);\n  var inputBits = '';\n\n  for (var i = 0; i < bytes.length; i++) {\n    var bitString = bytes.charCodeAt(i).toString(2);\n    inputBits += padLeft(bitString, 8 - bitString.length);\n  }\n\n  return decodeCookieBitValue(inputBits, definitionMap);\n}\n\nfunction decodeCookieBitValue(bitString, definitionMap) {\n  var cookieVersion = decodeBitsToInt(bitString, 0, _definitions__WEBPACK_IMPORTED_MODULE_0__[\"NUM_BITS_VERSION\"]);\n\n  if (typeof cookieVersion !== 'number') {\n    log.error('Could not find cookieVersion to decode');\n    return {};\n  } else if (!_definitions__WEBPACK_IMPORTED_MODULE_0__[\"vendorVersionMap\"][cookieVersion]) {\n    log.error(\"Could not find definition to decode cookie version \".concat(cookieVersion));\n    return {};\n  }\n\n  var cookieFields = definitionMap[cookieVersion].fields;\n\n  var _decodeFields2 = decodeFields({\n    input: bitString,\n    fields: cookieFields\n  }),\n      decodedObject = _decodeFields2.decodedObject;\n\n  return decodedObject;\n}\n\nfunction decodeVendorCookieValue(cookieValue) {\n  return decodeCookieValue(cookieValue, _definitions__WEBPACK_IMPORTED_MODULE_0__[\"vendorVersionMap\"]);\n}\n\nfunction decodePublisherCookieValue(cookieValue) {\n  return decodeCookieValue(cookieValue, _definitions__WEBPACK_IMPORTED_MODULE_0__[\"publisherVersionMap\"]);\n}\n\n\n\n//# sourceURL=webpack:///./cookie/cookieutils.js?");

/***/ }),

/***/ "./cookie/definitions/index.js":
/*!*************************************!*\
  !*** ./cookie/definitions/index.js ***!
  \*************************************/
/*! exports provided: NUM_BITS_VERSION, vendorVersionList, vendorVersionMap, publisherVersionList, publisherVersionMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUM_BITS_VERSION\", function() { return NUM_BITS_VERSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vendorVersionList\", function() { return vendorVersionList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vendorVersionMap\", function() { return vendorVersionMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"publisherVersionList\", function() { return publisherVersionList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"publisherVersionMap\", function() { return publisherVersionMap; });\n/* harmony import */ var _vendor_version1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor/version1 */ \"./cookie/definitions/vendor/version1.js\");\n/* harmony import */ var _publisher_version1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./publisher/version1 */ \"./cookie/definitions/publisher/version1.js\");\n\n\nvar NUM_BITS_VERSION = 6;\nvar vendorVersionList = [_vendor_version1__WEBPACK_IMPORTED_MODULE_0__[\"default\"]];\nvar vendorVersionMap = vendorVersionList.reduce(function (acc, definition) {\n  acc[definition.version] = definition;\n  return acc;\n}, {});\nvar publisherVersionList = [_publisher_version1__WEBPACK_IMPORTED_MODULE_1__[\"default\"]];\nvar publisherVersionMap = publisherVersionList.reduce(function (acc, definition) {\n  acc[definition.version] = definition;\n  return acc;\n}, {});\n\n\n//# sourceURL=webpack:///./cookie/definitions/index.js?");

/***/ }),

/***/ "./cookie/definitions/publisher/version1.js":
/*!**************************************************!*\
  !*** ./cookie/definitions/publisher/version1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  version: 1,\n  fields: [{\n    name: 'cookieVersion',\n    type: 'int',\n    numBits: 6\n  }, {\n    name: 'created',\n    type: 'date',\n    numBits: 36\n  }, {\n    name: 'lastUpdated',\n    type: 'date',\n    numBits: 36\n  }, {\n    name: 'cmpId',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'vendorListVersion',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'publisherPurposeVersion',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'standardPurposeIdBitString',\n    type: 'bits',\n    numBits: 24\n  }, {\n    name: 'numCustomPurposes',\n    type: 'int',\n    numBits: 6\n  }, {\n    name: 'customPurposeIdBitString',\n    type: 'bits',\n    numBits: function numBits(decodedObject) {\n      return decodedObject.numCustomPurposes;\n    }\n  }]\n});\n\n//# sourceURL=webpack:///./cookie/definitions/publisher/version1.js?");

/***/ }),

/***/ "./cookie/definitions/vendor/version1.js":
/*!***********************************************!*\
  !*** ./cookie/definitions/vendor/version1.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  version: 1,\n  fields: [{\n    name: 'cookieVersion',\n    type: 'int',\n    numBits: 6\n  }, {\n    name: 'created',\n    type: 'date',\n    numBits: 36\n  }, {\n    name: 'lastUpdated',\n    type: 'date',\n    numBits: 36\n  }, {\n    name: 'cmpId',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'cmpVersion',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'consentScreen',\n    type: 'int',\n    numBits: 6\n  }, {\n    name: 'consentLanguage',\n    type: '6bitchar',\n    numBits: 12\n  }, {\n    name: 'vendorListVersion',\n    type: 'int',\n    numBits: 12\n  }, {\n    name: 'purposeIdBitString',\n    type: 'bits',\n    numBits: 24\n  }, {\n    name: 'maxVendorId',\n    type: 'int',\n    numBits: 16\n  }, {\n    name: 'isRange',\n    type: 'bool',\n    numBits: 1\n  }, {\n    name: 'vendorIdBitString',\n    type: 'bits',\n    numBits: function numBits(decodedObject) {\n      return decodedObject.maxVendorId;\n    },\n    validator: function validator(decodedObject) {\n      return !decodedObject.isRange;\n    }\n  }, {\n    name: 'defaultConsent',\n    type: 'bool',\n    numBits: 1,\n    validator: function validator(decodedObject) {\n      return decodedObject.isRange;\n    }\n  }, {\n    name: 'numEntries',\n    numBits: 12,\n    type: 'int',\n    validator: function validator(decodedObject) {\n      return decodedObject.isRange;\n    }\n  }, {\n    name: 'vendorRangeList',\n    type: 'list',\n    listCount: function listCount(decodedObject) {\n      return decodedObject.numEntries;\n    },\n    validator: function validator(decodedObject) {\n      return decodedObject.isRange;\n    },\n    fields: [{\n      name: 'isRange',\n      type: 'bool',\n      numBits: 1\n    }, {\n      name: 'startVendorId',\n      type: 'int',\n      numBits: 16\n    }, {\n      name: 'endVendorId',\n      type: 'int',\n      numBits: 16,\n      validator: function validator(decodedObject) {\n        return decodedObject.isRange;\n      }\n    }]\n  }]\n});\n\n//# sourceURL=webpack:///./cookie/definitions/vendor/version1.js?");

/***/ }),

/***/ "./demo/demo.js":
/*!**********************!*\
  !*** ./demo/demo.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_cookies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/cookies.js */ \"./client/cookies.js\");\n/* harmony import */ var _cookie_cookieutils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cookie/cookieutils.js */ \"./cookie/cookieutils.js\");\n\n\nvar code = document.getElementById('code'); //TODO: an error is being thrown\n\nfunction getDemoCookie() {\n  Object(_client_cookies_js__WEBPACK_IMPORTED_MODULE_0__[\"checkIabCookie\"])().then(function (result) {\n    return Object(_cookie_cookieutils_js__WEBPACK_IMPORTED_MODULE_1__[\"decodeVendorCookieValue\"])(result);\n  }).then(function (result) {\n    var cookieString = JSON.stringify(result);\n    var formattedString = js_beautify(cookieString);\n    code.innerHTML = formattedString;\n  }).catch(function (err) {\n    return console.error(err);\n  });\n}\n\ngetDemoCookie();\n\n//# sourceURL=webpack:///./demo/demo.js?");

/***/ })

/******/ });