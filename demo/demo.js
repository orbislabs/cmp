import { checkIabCookie } from '../client/cookies.js';
import { decodeVendorCookieValue } from '../cookie/cookieutils.js';



// LOGIC - Client Selection
// grab the querystring from the URL, get c=
// build a script element and attach to page

const urlString = window.location.href;
const url = new URL(urlString);
const clientId = url.searchParams.get('c');
const script = document.createElement('script');
script.setAttribute('id', 'pluto-cmp-js-src');
script.setAttribute('src', '/cmp');
script.setAttribute('client-id', clientId);
if (!clientId) {
  script.setAttribute('client-id', 0);
  document.body.appendChild(script);
} else {
  script.setAttribute('client-id', clientId);
  document.body.appendChild(script);
}


const code = document.getElementById('code');
// fetch cookie, decode, prettify and inject into DOM.
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

// below is a function for deleting euconsent IAB cookie
// adding to global scope to use in onclick
function deleteIabCookie () {
  document.cookie = 'euconsent' + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.' + window.hostname ;
  swal('Cookie Deleted!','Refreshing the page will automatically load the CMP','success');
}
window.deleteIabCookie = deleteIabCookie;


function injectJS() {
    var iFrameHead = window.frames["myFrame"].document.getElementsByTagName("head")[0];
    var myscript = document.createElement('script');
    myscript.setAttribute('id','pluto-cmp-js-src');
    myscript.setAttribute('client-id','1');

    myscript.type = 'text/javascript';
    myscript.src = '/cmp'; 
    iFrameHead.appendChild(myscript);
    console.log(iFrameHead);
}
window.injectJS = injectJS;
