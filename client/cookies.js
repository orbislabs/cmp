const host = (window && window.location && window.location.hostname) || '';
const parts = host.split('.');

const COOKIE_DOMAIN = parts.length > 1 ? `;domain=.${parts.slice(-2).join('.')}` : '';
const COOKIE_MAX_AGE = 33696000;
const COOKIE_NAME = 'euconsent';
const PATH = '/'

function checkCookiesEnabled () {
    let cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
    return cookieEnabled;
}

function checkCookiesEnabledPromise () {
    return new Promise ((resolve, reject) => {
		let cookieEnabled = (navigator.cookieEnabled) ? true : false;
		if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ 
			document.cookie = "testcookie";
			cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
		}
		if (cookieEnabled == true || false ) {
			console.log(`CMP => set cookie status : ${cookieEnabled}`)
			resolve(cookieEnabled);
		} else {
			reject('Error checking if CMP can set cookies')
		}
	})
}

function checkIabCookie (result) {
	if (result == false) console.error('CMP => Cookies are blocked!')
	return new Promise ((resolve, reject) => {
		readCookie('euconsent')
			.then((result) => {
				if (result) {
					console.log(`CMP => IAB cookie loaded: ${result}`);
					resolve(result);
				} else {
					console.log(`CMP => No IAB cookie present`);
					resolve(false);
				}
			});
	});
};

function setIabCookie (result) {
	if (result = 'fullConsent') {}
	return new Promise ((resolve, reject) => {
		if (result == 'fullConsent') {
			onFullConsent()
			writeCookie()
		}
	})
}


function writeCookieSync (value) {
    document.cookie = `${COOKIE_NAME}=${value}${COOKIE_DOMAIN};path=${PATH};max-age=${COOKIE_MAX_AGE}`;
	return;
}

function readCookieSync (name = 'euconsent') {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
	return;
}

// below functions use Promises
function writeCookie (value) {
    document.cookie = `${COOKIE_NAME}=${value}${COOKIE_DOMAIN};path=${PATH};max-age=${COOKIE_MAX_AGE}`;
	return Promise.resolve(true);
}

function readCookie (name = 'euconsent') {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length === 2) {
		return Promise.resolve(parts.pop().split(';').shift());
	}
	return Promise.resolve();
}

export {
	readCookie,
	writeCookie,
	readCookieSync,
	writeCookieSync,
	checkCookiesEnabled,
	checkCookiesEnabledPromise,
	checkIabCookie,
	setIabCookie
};