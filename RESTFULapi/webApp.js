const express = require("express");
let app = express();
app.get("/", (req,res) => {
    res.send("hello");
});
app.get("/api/numbers", (req,res) => {
    res.send([1,2,3,4,5]);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
