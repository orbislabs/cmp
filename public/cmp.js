// PLUTO CMP++ v0.0.1
console.log('CMP++ :: script loaded');
/* 
function __cmp (command, parameter = null, callback = null) {
    switch (command) {
        case 'ping' : ping(parameter, callback); break;
        default : console.error('Error: unknown command');
    }
}

function ping (parameter = null, callback = null) {
    console.log('ping() command has been called');
    
    if (typeof callback == 'function') {
        callback(obj);
    }
    return 'obj';
};


const obj = {
    gdprAppliesGlobally : false,
    cmpLoaded : true
} */

// window.__cmp('ping', null, function(result){console.log(result);});

/* class Cmp {
    constructor () {
        this.isLoaded = false;
    }
    commands = {
        ping: (_, callback = () => {}) => {
            const result = {
                gdprAppliesGlobally: false, // config.storeConsentGlobally - get this from the config file
                cmpLoaded: true
            };
            callback(result, true);
        }
    }
} */

class Cmp {
    constructor (store) {
        this.isLoaded = false;
        this.store = store;
    }
    ping (empty = null, callback = () => {}) {
        const result = {
            gdprAppliesGlobally: false, // config.storeConsentGlobally - get this from the config file
            cmpLoaded: true
        };
        callback(result, true);
    }
}


class Store {
    constructor () {
		this.cmpId = 1,
		this.cmpVersion = 1,
		this.cookieVersion = 1,
		this.vendorConsentData,
		this.publisherConsentData,
		this.vendorList,
		this.customPurposeList
    }
}

const store = new Store();
const cmp = new Cmp(store);

const defaultConfig = {
	customPurposeListLocation: './purposes.json',
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: false,
	storePublisherData: false,
	logging: false,
	localization: {},
	forceLocale: null,
	gdprApplies: true
};

class Config {
	constructor(defaultConfig) {
		this.globalVendorListLocation = defaultConfig.globalVendorListLocation;
    }
}