import vendorList from './vendorList.js';
import { ConsentString } from 'consent-string';
import { 	checkCookiesEnabled,
            writeCookie,
            readCookie 
        } from './cookies.js';

const consentData = new ConsentString();

// Modify the consent data
consentData.setCmpId(1);
consentData.setConsentScreen(1);
consentData.setGlobalVendorList(vendorList);
//consentData.setPurposeAllowed(12, true);

// Update the cookie value
//writeCookie(consentData.getConsentString());

function checkCmpCookie () {
    const cookie = readCookie('euconsent');
    console.log(cookie)
}

checkCmpCookie();

class Store {
    constructor ({
        vendorConsentData,
        vendorList,
        customPurposeList
    } = {} ) {
		this.vendorConsentData,
		this.vendorList,
		this.customPurposeList
    }
}