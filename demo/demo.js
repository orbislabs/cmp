import { checkIabCookie } from '../client/cookies.js';
import { decodeVendorCookieValue } from '../cookie/cookieutils.js';

const code = document.getElementById('code');

//TODO: an error is being thrown
function getDemoCookie () {
    checkIabCookie()
    .then(result => decodeVendorCookieValue(result))
    .then((result) => {
        const cookieString = JSON.stringify(result);
        const formattedString = js_beautify(cookieString);
        code.innerHTML = formattedString;
    })
    .catch(err => console.error(err));  
}

getDemoCookie();

