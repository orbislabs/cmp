import * as cookies from './cookies.js';
import Cmp from './cmp.js';
import vendorList from './vendorList.js';
import showConsentModalPromise from './modal.js';
import api from './api.js';

function init () {
	return new Promise ((resolve, reject) => {
		window.__cmp = api;
		console.log('CMP => API Initialising...');
		resolve(true);
	});
};

function loadCmp (result, vendorList) {
	return new Promise ((resolve, reject) => {
		if (result == false ) {
			let consentString = new Cmp(null, vendorList);
			window.cmp = consentString;
			resolve(false);
		} else {
			let consentString = new Cmp(result, vendorList);
			window.cmp = consentString;
			if (!cmp) reject('Error loading CMP')
			resolve(window.cmp);
		}
	});
};

// Main CMP flow logic is here.
init()
	.then(result => cookies.checkCookiesEnabledPromise(result)) // true OR false
	.then(result => cookies.checkIabCookie(result)) // base64 OR false
	.then(result => loadCmp(result, vendorList))
	.then((result) => {
		if (result == false) { 
			showConsentModalPromise()
				.then((result) => {
					if (result == 'fullConsent') {
						cmp.onFullConsent();
					} else {
						cmp.updatePurposesAndCookie(result);
					}
				})
				.then(result => cmp.readyCmpAPI(result))
		} else {
			cmp.readyCmpAPI(result)
		}
	})
	.catch(err => console.log(err));