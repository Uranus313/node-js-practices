require("express-async-errors");
const express = require("express");
const routes = require("./routes/routes");
const DBStarter = require("./DB");
require("./globalErrorHandling")();
const winston = require("winston");
const app = express();
routes(app);
DBStarter();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
