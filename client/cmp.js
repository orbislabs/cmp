import {
  ConsentString
} from 'consent-string';
import {
  fetchAllVendorsArray,
  fetchAllPurposeArray
} from './utils';
import iabVendorList from './configs/iabVendorList.js';
import * as cookies from './cookies.js';
import renderVueApp from './ui/main.js';
import { fireGtmPixels } from './main.js';

export default class Cmp extends ConsentString {
  constructor(clientId, iabVendorList, result = null) {
    super(result);
    this.setCmpId(52);
    this.setCmpVersion(1);
    this.setConsentLanguage('en');
    this.setConsentScreen(1);
    this.setGlobalVendorList(iabVendorList);
    this.clientId = clientId;
    this.cmpLoaded = false;
    this.fullVendorList = fetchAllVendorsArray(iabVendorList);
    this.fullPurposeList = fetchAllPurposeArray(iabVendorList);
    this.customVendorsAllowed = getCustomVendorsAllowed();
  }

  readyCmpAPI() {
    this.cmpLoaded = true;
    console.log(`CMP => The CMP is loaded: ${this.cmpLoaded}`);
  }

  ping(empty = null, callback = () => {}) {
    const result = {
      gdprAppliesGlobally: true,
      cmpLoaded: this.cmpLoaded
    };
    callback(result, true);
  }

  getVendorConsents(vendors = allVendors, callback = () => {}) {
    let result = {};
    vendors.forEach((element) => {
      result[element] = this.isVendorAllowed(element);
    });
    callback(result, true);
  }

  getConsentData(empty = null, callback = () => {}) {
    const result = this.getConsentString();
    callback(result, true);
  }

  showConsentTool (parameter = null, callback = null) {
    // TODO : refactor for a single entry to showing the consent modal
    renderVueApp(this.clientId)
      .then(result => this.updateCmpAndWriteCookie(result))
      .then(result => this.readyCmpAPI(result))
      .then(result => fireGtmPixels(this.clientId))
      .catch(err => console.log(err));
  }

  // TODO : this function is not being used, this may not be needed
  onFullConsent() {
    return new Promise((resolve, reject) => {
      console.log('CMP => setting full consent');
      this.setVendorsAllowed(this.fullVendorList);
      this.setPurposesAllowed(this.fullPurposeList);
      cookies.writeCookie(this.getConsentString())
        .then((result) => {
          if (result) resolve(true);
        });
    });
  }
/* 
  getCustomVendorsAllowed() {
    if(typeof cookies.readCookie('custom') == 'string') {
      console.log('here??',cookies.readCookieSync('custom'))
      console.log(typeof cookies.readCookieSync('custom'))
      console.log(JSON.parse(cookies.readCookieSync('custom')))
      this.customVendorsAllowed = [1,2,4]
      //this.customVendorsAllowed = JSON.parse(cookies.readCookieSync('custom'));
    } else {
      this.customVendorsAllowed = [];
    }
  } */

  setCustomVendorsAllowed(customVendorArray) {
    this.customVendorsAllowed = customVendorArray;
    //cookies.writeCookie()
  }

  updateCmpAndWriteCookie(consentObject) {

    return new Promise((resolve, reject) => {
      this.setPurposesAllowed(consentObject.purposes);
      this.setVendorsAllowed(consentObject.vendors);
      this.setCustomVendorsAllowed(consentObject.customVendors);
      console.log(`CMP => Set CustomVendors:${JSON.stringify(this.customVendorsAllowed)}`);
      console.log(`CMP => Set Purposes: ${JSON.stringify(this.getPurposesAllowed())}`);
      console.log(`CMP => Set Vendors: ${JSON.stringify(this.getVendorsAllowed())}`);
      cookies.writeCookieCustom(JSON.stringify(consentObject.customVendors));
      cookies.writeCookie(this.getConsentString())
        .then((result) => {
          if (result) resolve(true);
        });
    });
  }
}

function getCustomVendorsAllowed() {
  if(typeof cookies.readCookieSync('custom') == 'string') {
    return JSON.parse(cookies.readCookieSync('custom'));
  } else {
    return [];
  }
}