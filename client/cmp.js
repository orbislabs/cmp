import { ConsentString } from 'consent-string';
import { fetchAllVendorsArray,
        fetchAllPurposeArray } from './utils';
import vendorList from './vendorList.js';
import * as cookies from './cookies.js';

export default class Cmp extends ConsentString {
    constructor (result = null, vendorList) {
        super (result);
        this.setCmpId(199)
        this.setCmpVersion(1);
        this.setConsentLanguage('en');
        this.setConsentScreen(1);
        this.setGlobalVendorList(vendorList);
        this.cmpLoaded = false;
        this.fullVendorList = fetchAllVendorsArray(vendorList);
        this.fullPurposeList = fetchAllPurposeArray(vendorList);
    }

    readyCmpAPI () {
        this.cmpLoaded = true;
        console.log(`CMP => The CMP is loaded: ${this.cmpLoaded}`);
    }

    ping (empty = null, callback = () => {}) {
        const result = {
            gdprAppliesGlobally: true,
            cmpLoaded: this.cmpLoaded
        };
        callback(result, true);
    }

    queryAllowedVendors (vendors = allVendors, callback = () => {}) {
        let result = {};
        vendors.forEach((element) => {
            result[element] = this.isVendorAllowed(element);
        });
        callback(result, true);
    }

    getConsentData (empty = null, callback = () => {}) {
        const result = this.getConsentString();
        callback(result, true);
    }

    onFullConsent () {
        return new Promise ((resolve, reject) => {
            console.log('CMP => setting full consent')
            this.setVendorsAllowed(this.fullVendorList);
            this.setPurposesAllowed(this.fullPurposeList);
            cookies.writeCookie(this.getConsentString())
                .then((result) => {
                    if(result) resolve(true)
                })
        });
    }

    updatePurposesAndCookie (purposeArray) {
        return new Promise ((resolve, reject) => {
            this.setPurposesAllowed(purposeArray);
            console.log(`CMP => Set purposes: ${this.getPurposesAllowed()}`);
            cookies.writeCookie(this.getConsentString())
            .then((result) => {
                if(result) resolve(true)
            });
        });
    }

}
