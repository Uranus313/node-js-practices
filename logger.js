const EventEmitter = require("events");

class Logger extends EventEmitter{

    log (text){
        console.log(text);
        this.emit("message logged",{ id: 1, url : "http"});
    }
}
module.exports = Logger;