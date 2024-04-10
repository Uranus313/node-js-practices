const Logger = require("./logger");
const EventEmitter = require("events");


const logger = new Logger();
logger.on("message logged",(args) =>{
    console.log("message received",args);
});
logger.log("hello");



