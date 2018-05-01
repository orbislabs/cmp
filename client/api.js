function __cmp (command, parameter = null, callback = null) {
    switch (command) {
        case 'ping' : ping(parameter, callback); break;
        default : console.error('Error: unknown command');
    }
}
