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

class Cmp {
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
}
const cmp = new Cmp();