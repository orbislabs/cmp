// Pluto CMP++ v1

import Cmp from '/cmp.js';
import defaultConfig from '/config.js';
import { 	checkCookiesEnabled,
			writeCookie,
			readCookie 
		} from '/cookies.js';

function start () {
	if(!checkCookiesEnabled()) {
		console.log(`CMP is unable to set cookies.`);
		return;
	}
	let cmp = new Cmp(defaultConfig);
	cmp.isLoaded = true;
	window.__cmp = cmp;
}

// this creates a globally available CMP instance
start();

// writeCookie('dendog');
// console.log(readCookie('euconsent'))


