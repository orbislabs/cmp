class Event {
    constructor (name) {
        this.name = name;
        this.callbacks = [];
    }

    registerCallback (callback) {
        this.callbacks.push(callback);
    }
}

class Reactor {
    constructor () {
        this.events = {};
    }

    registerEvent (eventName) {
        let event = new Event(eventName);
        this.events[eventName] = event; 
    }

    addEventListener (eventName, callback) {
        this.events[eventName].registerCallback(callback);
    }

    dispatchEvent (eventName, eventArgs) {
        this.events[eventName].callbacks.forEach((callback) => {
            callback(eventArgs);
        });
    }
}

let reactor = new Reactor();

reactor.registerEvent('modalShown');
reactor.addEventListener('modalShown', (a) => {
    console.log(`console: ${a.issue}`);
});
reactor.dispatchEvent('modalShown', {issue:1});