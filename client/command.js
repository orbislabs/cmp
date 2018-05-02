class Command {
    constructor () {
        this.queue = [];
    }

    execute (input) {
        const command = arguments[0]
        console.log(command);
    }

    addToQueue (command) {
        this.queue.push(command);
        console.log(this.queue);
    }
}

let cmd = new Command();

cmd.addToQueue('event1');
cmd.addToQueue('event2');
cmd.addToQueue('event3');
cmd.addToQueue('event4');

cmd.execute('event1','arg-a','arg-b');

function countArguments(a,b) {  
    console.log(arguments.length);
 }
 // get the number of arguments
 countArguments('welcome', 'to', 'Earth');




