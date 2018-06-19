/*
we can get data from loader + clientConfig
when dataLayer is available & clientConfig has GTM true...continue

DATA LAYER
we should push isUserEU if this is set to false -> all tags may fire. 
{ isUserEu : bool , consent: full || partial || none }
*/

function checkPermissionMismatch(userPermission, clientPermission) {
  let res = clientPermission.filter(function(n) {
    return !this.has(n);
  }, new Set(userPermission));
  return (res.length >= 1) ? false : true;
}

export default function tagManager(clientId) {
  return new Promise((resolve, reject) => {
    // this function is a hack - first we just check if this is for MiQ (client=1)
    if (clientId !== 1) resolve(console.log('GTM-Int: non MiQ client, resolving...'));
    // then we are hardcoding the MiQ FULL CONSENT Config
    const miqConfig = {
      iabVendors: [32, 101],
      iabPurposes: [1, 2, 3, 4, 5],
      customVendors: [1001, 1002, 1003, 1004],
    };
    // fetching the userConfig from the CMP Class
    const userConfig = {
      iabVendors: cmp.getVendorsAllowed().slice().sort((a, b) => a - b),
      iabPurposes: cmp.getPurposesAllowed().slice().sort((a, b) => a - b),
      customVendors: cmp.customVendorsAllowed.slice().sort((a, b) => a - b),
    };

    const a = checkPermissionMismatch(userConfig.iabPurposes, miqConfig.iabPurposes);
    const b = checkPermissionMismatch(userConfig.iabVendors, miqConfig.iabVendors);
    const c = checkPermissionMismatch(userConfig.customVendors, miqConfig.customVendors);

    if (typeof window.dataLayer !== 'undefined') {
      if (a && b && c) {
        if (window.dataLayer) {
          console.log('GTM-Int: Found, GTM dataLayer...');
          window.dataLayer.push({ consentStatus: 'true' });
          window.dataLayer.push({ event: 'consentUpdate' });
          resolve(true);
        } else {
          reject(console.warn('GTM-Int: No dataLayer available!'));
        }
      } else {
        console.log(a, b, c);
        resolve(console.log('GTM-Int: No Pixels are being fired...'));
        window.dataLayer.push({ consentStatus: 'false' });
        window.dataLayer.push({ event: 'consentUpdate' });
      }
    }
  });
}

