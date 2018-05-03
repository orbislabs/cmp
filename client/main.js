import * as cookies from './cookies.js';
import { Cmp } from './cmp.js';
import vendorList from './vendorList.js';
import showConsentModalPromise from './modal.js';

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
				//showConsentModal();
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

loadCmp()
	.then(result => cookies.checkCookiesEnabledPromise(result)) // true OR false
	.then(result => cookies.checkIabCookie(result)) // base64 OR false
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
	.catch(err => console.log(err))


function loadCmp () {
	return new Promise ((resolve, reject) => {
		console.log('CMP => TESTING loadedcmp!');
		resolve(true);
	});
};
