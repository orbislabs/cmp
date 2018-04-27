function cb (result) {
    console.log(result);
}
window.__cmp('ping', null, cb);

function cb (result) {
    console.log(result);
}
window.__cmp.ping(null, cb);
