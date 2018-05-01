import vendorList from './vendorList.js';
import { ConsentString } from 'consent-string';
import { 	checkCookiesEnabled,
            writeCookie,
            readCookie,
            readCookieSync 
        } from './cookies.js';


function checkCmpCookie () {
    const cookie = readCookieSync('euconsent');
    if (cookie) {
        const consentData = new ConsentString();
        consentData.setVendorsAllowed([1,2,4,6,9,12,33,44])
        window.consentData = consentData;
        return cookie;
    } else {
        // do we fire the modal here???
        return false; 
    }
}

class Store {
    constructor (vendorList) {
        this.vendorList = vendorList;
        this.vendorConsentCookieData = checkCmpCookie();
        this.allowedVendorsArray = consentData.allowedVendorIds;
    }
}

export default Store;