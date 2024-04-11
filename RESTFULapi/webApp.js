const express = require("express");
let app = express();
app.get("/", (req,res) => {
    res.send("hello");
});
app.get("/api/numbers", (req,res) => {
    res.send([1,2,3,4,5]);
});
app.listen(3000, () => {
    console.log("listening");
});
