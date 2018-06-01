import * as cookies from './cookies.js';
import Cmp from './cmp.js';
import iabVendorList from './configs/iabVendorList.js';
import api from './api.js';
import renderVueApp from './ui/main.js';
import { isEqual } from 'underscore';

// here we grab the client id from a data att in the script tag
let clientId;
if(document.getElementById('pluto-cmp-js-src')) {
  clientId = document.getElementById('pluto-cmp-js-src').getAttribute('client-id');
} else {
  clientId = 0;
}

//const clientId = document.getElementById('pluto-cmp-js-src').getAttribute('client-id');
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
function loadCmp(clientId = 1, iabVendorList, result) {
  return new Promise((resolve, reject) => {
    if (result == false) {
      let consentString = new Cmp(clientId, iabVendorList, null);
      window.cmp = consentString;
      resolve(false);
    } else {
      let consentString = new Cmp(clientId, iabVendorList, result);
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
  .then(result => loadCmp(clientId, iabVendorList, result))
  .then((result) => {
    if (result == false) {
      renderVueApp(clientId)
        .then(result => cmp.updateCmpAndWriteCookie(result))
        .then(result => fireGtmPixels(clientId))
        .then(result => cmp.readyCmpAPI(result))
		    .catch(err => console.log(err));
    } else {
      fireGtmPixels(clientId)
        .then(result => cmp.readyCmpAPI(result));
    }
  })
  .catch(err => console.log(err));

export function fireGtmPixels (clientId) {

  return new Promise((resolve, reject) => {
    
    // this function is a hack - first we just check if this is for MiQ (client=1)
    if (clientId != 1) resolve(console.log('GTM-Int: non MiQ client, resolving...'));
    // then we are hardcoding the MiQ FULL CONSENT Config
    const miqConfig = {
      iabVendors : [32,101],
      iabPurposes : [1,2,3,4,5],
      customVendors : [1001,1002,1003,1004]
    };
    // fetching the userConfig from the CMP Class
    const userConfig = {
      iabVendors : cmp.getVendorsAllowed().slice().sort((a, b) => a - b),
      iabPurposes : cmp.getPurposesAllowed().slice().sort((a, b) => a - b),
      customVendors : cmp.customVendorsAllowed.slice().sort((a, b) => a - b)
    };
    const a = checkPermissionMismatch( userConfig.iabPurposes , miqConfig.iabPurposes );
    const b = checkPermissionMismatch( userConfig.iabVendors , miqConfig.iabVendors );
    const c = checkPermissionMismatch( userConfig.customVendors , miqConfig.customVendors );

    if (a && b && c) {
      if(dataLayer) {
        console.log('GTM-Int: Found, GTM dataLayer...');
        dataLayer.push({'event':'appnexus-consent'});
      } else {
        reject(console.warn('GTM-Int: No dataLayer available!'));
      }
    } else {
      resolve(console.log('GTM-Int: No Pixels are being fired...'));
    }

  });
}


function checkPermissionMismatch(userPermission, clientPermission) {
  var res = clientPermission.filter(function(n) {
    return !this.has(n);
  }, new Set(userPermission));
  return (res.length >= 1) ? false : true ;
}
