function cb (result) {
    console.log(result);
}
window.__cmp('ping', null, cb);

function cb (result) {
    console.log(result);
}
window.__cmp.ping(null, cb);

function cb (result) {
    console.log(result);
}
window.__cmp.getConsentData(null, cb);

function cb (result) {
    console.log(result);
}
window.__cmp.getVendorConsents([1,2,3,4,5,6,7,8,9], cb);