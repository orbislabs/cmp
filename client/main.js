// Pluto CMP++ v1
import Cmp from './cmp.js';
import defaultConfig from './config.js';
import vendorList from './vendorList.js';
import { ConsentString } from 'consent-string';
import { 	checkCookiesEnabled,
            writeCookie,
            readCookie 
        } from './cookies.js';

function start () {
	if(!checkCookiesEnabled()) {
		console.log(`CMP is unable to set cookies.`);
		return;
	}
	let cmp = new Cmp(defaultConfig);
	cmp.isLoaded = true;
	window.__cmp = cmp;
}

// this creates a globally available CMP instance
start();


const consentData = new ConsentString();

// Modify the consent data
//consentData.setCmpId(1);
//consentData.setConsentScreen(1);
//consentData.setGlobalVendorList(vendorList);
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



