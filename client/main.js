/* // Pluto CMP++ v1
import Cmp from './cmp.js';
import Store from './store.js';
import defaultConfig from './config.js';
import vendorList from './vendorList.js';
import * as a from './utils.js'; // this can be removed - testing
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
	let store = new Store(vendorList);
	let cmp = new Cmp(defaultConfig, store);
	cmp.isLoaded = true;
	window.__cmp = cmp;
}

// this creates a globally available CMP instance
start(); */

import * as cookies from './cookies.js';
import { Cmp } from './cmp.js';
import vendorList from './vendorList.js';
import showConsentModal from './modal.js';

function init () {
	console.log('CMP => startup');
    if (!cookies.checkCookiesEnabled()) {
        console.error('CMP => cookies are blocked');
        return;
    }
    cookies.readCookie()
        .then((result) => {
            if (!result) {
				console.log('CMP => no IAB cookie set - showing modal')
				showConsentModal();
				let consentString = new Cmp(null, vendorList);
                window.cmp = consentString;
            } else {
                console.log('CMP => loading cookie data')
                let consentString = new Cmp(result, vendorList);
                window.cmp = consentString;
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

init();