const log = require("./logger");
const path = require("path");
const os = require("os")
let firstName = "uranus";
let dirpath = path.parse(__filename);
let allMemory = os.totalmem();
let freeMemory = os.freemem();
// console.log(firstName);
log.log(allMemory);
log.log(freeMemory);G