const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("message logged",() =>{
    console.log("message received");
});
emitter.emit("message logged");