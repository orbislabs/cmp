import './refactor.main';

// Main CMP flow logic is here.
/* init()
  .then(result => cookies.checkCookiesEnabledPromise(result)) // true OR false
  .then(result => cookies.checkIabCookie(result)) // base64 OR false
  .then(result => loadCmp(clientId, iabVendorList, result))
  .then((result) => {
    if (result == false) {
      renderVueApp(clientId)
        .then(result => cmp.updateCmpAndWriteCookie(result))
        .then(result => fireGtmPixels(clientId))
        .then(result => cmp.readyCmpAPI(result))
        .then(result => cookies.requestHttpCookies( 'euconsent', cmp.getConsentString() ))
		    .catch(err => console.log(err));
    } else {
      fireGtmPixels(clientId)
        .then(result => cmp.readyCmpAPI(result));
    }
  })
  .catch(err => console.log(err)); */