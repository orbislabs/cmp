if (typeof dataLayer === 'undefined') {
    console.log('dataLayer is undefined');
} else {
    dataLayer.push({'consentStatus':'true'});
    dataLayer.push({'event':'consentUpdate'}); 
}