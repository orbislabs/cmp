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
}