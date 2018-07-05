import { ConsentString } from 'consent-string';
import getCustomVendorsAllowed from './customVendors';
import * as cookies from '../utils/cookies';
import iabVendorList from '../configs/iabVendorList';

export default class Cmp extends ConsentString {
  constructor(result = null) {
    super(result.iabCookie);
    this.setCmpId(52);
    this.setCmpVersion(1);
    this.setConsentLanguage('en');
    this.setConsentScreen(1);
    this.setGlobalVendorList(iabVendorList);
    this.clientId = result.clientId;
    this.cmpLoaded = false;
    this.customVendorsAllowed = getCustomVendorsAllowed();
  }

  readyCmpAPI() {
    this.cmpLoaded = true;
    console.log(`CMP => The CMP is loaded: ${this.cmpLoaded}`);
  }

  ping(empty = null, callback = () => {}) {
    const result = {
      gdprAppliesGlobally: true,
      cmpLoaded: this.cmpLoaded,
    };
    callback(result, true);
  }

  // TODO: allVendors does not exist right now
  getVendorConsents(vendors = allVendors, callback = () => {}) {
    const result = {};
    vendors.forEach((element) => {
      result[element] = this.isVendorAllowed(element);
    });
    callback(result, true);
  }

  getConsentData(empty = null, callback = () => {}) {
    const result = this.getConsentString();
    callback(result, true);
  }

  showConsentTool(showUiBoolean) {
    console.log('[Info] showConsentTool has been called.');
    return new Promise((resolve, reject) => {
      if (showUiBoolean) {
        return import(/* webpackChunkName: "ui" */ '../ui/main.js')
          .then(appModule => appModule.default(this.clientId))
          .then(userConsentObject => this.updateCmpAndWriteCookie(userConsentObject))
          .then(() => cookies.requestHttpCookies('euconsent', this.getConsentString()))
          // .then(() => Promise.resolve('UI Closed'))
          .catch(err => console.error(err));
      }
      resolve('false');
    });
  }

  setCustomVendorsAllowed(customVendorArray) {
    this.customVendorsAllowed = customVendorArray;
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
