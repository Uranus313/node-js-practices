const log = require("./logger");
const path = require("path");

let firstName = "uranus";
let dirpath = path.parse(__filename);
// console.log(firstName);
log.log(dirpath);