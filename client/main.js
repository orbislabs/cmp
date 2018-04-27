// Pluto CMP++ v1
import Cmp from './cmp.js';
import Store from './store.js';
import defaultConfig from './config.js';
import vendorList from './vendorList.js';
import * as a from './utils.js'; // this can be removed - testing
import { ConsentString } from 'consent-string';
import { 	checkCookiesEnabled,
            writeCookie,
            readCookie 
        } from './cookies.js';

function start () {
	if(!checkCookiesEnabled()) {
		console.log(`CMP is unable to set cookies.`);
		return;
	}
	let store = new Store(vendorList);
	let cmp = new Cmp(defaultConfig, store);
	cmp.isLoaded = true;
	window.__cmp = cmp;
}

// this creates a globally available CMP instance
start();