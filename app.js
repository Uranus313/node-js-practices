const log = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");
let firstName = "uranus";
let dirpath = path.parse(__filename);
let allMemory = os.totalmem();
let freeMemory = os.freemem();
fs.readdir("./",function(err,files){
    if(err){
        console.log("Error",err);
    }else{
        console.log("Files",files);
    }
});