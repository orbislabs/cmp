import { ConsentString } from 'consent-string';
import { fetchAllVendorsArray,
        fetchAllPurposeArray } from './utils';
import vendorList from './vendorList.js';

export class Cmp extends ConsentString {
    constructor (result = null, vendorList) {
        super (result);
        this.setCmpId(199)
        this.setCmpVersion(1);
        this.setConsentLanguage('en');
        this.setConsentScreen(1);
        this.setGlobalVendorList(vendorList);
        this.fullVendorList = fetchAllVendorsArray(vendorList);
        this.fullPurposeList = fetchAllPurposeArray(vendorList);
        //this.on('fullConsent', this.onFullConsent);
        this.listen()
    }

    ping (empty = null, callback = () => {}) {
        const result = {
            gdprAppliesGlobally: true,
            cmpLoaded: true
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
        console.log('CMP => setting full consent')
        this.setVendorsAllowed(this.fullVendorList);
        this.setPurposesAllowed(this.fullPurposeList);
    }

    listen () {
        document.getElementById('agree-button').addEventListener('click', this.onFullConsent);
    }
}