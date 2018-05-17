import * as cookies from './cookies.js';
import Cmp from './cmp.js';
import vendorList from './vendorList.js';
import api from './api.js';
import renderVueApp from './ui/main.js';

// here we grab the client id from a data att in the script tag
const clientId = document.getElementById('pluto-cmp-js-src').getAttribute('client-id');
console.log(`CMP => Detected clientID: ${clientId}`);

// this function adds the api to the global window object
function init() {
  return new Promise((resolve, reject) => {
    window.__cmp = api;
    console.log('CMP => API Initialising...');
    resolve(true);
  });
}

// logic is stored for starting with a loaded CMP or empty
function loadCmp(clientId, vendorList, result) {
  return new Promise((resolve, reject) => {
    if (result == false) {
      let consentString = new Cmp(clientId, vendorList, null);
      window.cmp = consentString;
      resolve(false);
    } else {
      let consentString = new Cmp(clientId, vendorList, result);
      window.cmp = consentString;
      if (!cmp) reject('Error loading CMP');
      resolve(window.cmp);
    }
  });
}

// Main CMP flow logic is here.
init()
  .then(result => cookies.checkCookiesEnabledPromise(result)) // true OR false
  .then(result => cookies.checkIabCookie(result)) // base64 OR false
  .then(result => loadCmp(result, vendorList))
  .then((result) => {
    if (result == false) {
      renderVueApp(clientId)
        .then(result => cmp.updateCmpAndWriteCookie(result))
		    .then(result => cmp.readyCmpAPI(result))
		    .catch(err => console.log(err));
    } else {
      cmp.readyCmpAPI(result);
    }
  })
  .catch(err => console.log(err));