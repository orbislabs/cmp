import { checkIabCookie } from '../client/cookies.js';
import { decodeVendorCookieValue } from '../cookie/cookieutils.js';

var urlString = window.location.href;
var url = new URL(urlString);
var clientId = url.searchParams.get('c');

var script = document.createElement('script');
script.setAttribute('id', 'pluto-cmp-js-src');
script.setAttribute('src', '/cmp');

script.setAttribute('client-id', clientId);


if (!clientId) {
  script.setAttribute('client-id', 0);
  document.body.appendChild(script);
  console.log(script);
} else {
  script.setAttribute('client-id', clientId);
  document.body.appendChild(script);
  console.log(script);
}

const code = document.getElementById('code');

//TODO: an error is being thrown
function getDemoCookie () {
    checkIabCookie()
    .then(result => decodeVendorCookieValue(result))
    .then((result) => {
        if(!result) {
            code.innerHTML = 'No IAB cookie present, please load the CMP';
        } else {
            const cookieString = JSON.stringify(result);
            const formattedString = js_beautify(cookieString);
            code.innerHTML = formattedString;
        }
    })
    .catch(err => console.error(err));  
}

// TODO: this needs to be listened and not polled
getDemoCookie();
setInterval(getDemoCookie, 1000);

