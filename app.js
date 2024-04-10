const http = require("http");
const server = http.createServer((req , res) =>{
    if(req.url === "/"){
        res.write("hello");
        res.end();
    }
    else if (req.url === "/numbers"){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen("3050");
console.log("listening on 3050");


