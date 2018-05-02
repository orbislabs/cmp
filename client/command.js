class Events {
    constructor () {
        this.queue = [];
    }

    execute (fn) {
        const command = arguments[0]
        console.log(command);
    }

    addToQueue (command) {
        this.queue.push(command);
        console.log(this.queue);
    }
}

// observables (read)
// create a single Events class - singleton pattern

let cmd = new Command();

cmd.addToQueue('event1');
cmd.addToQueue('event2');
cmd.addToQueue('event3');
cmd.addToQueue('event4');

cmd.execute('event1','arg-a','arg-b');






