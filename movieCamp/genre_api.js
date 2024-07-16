require("express-async-errors");
const express = require("express");
const genreRouter = require("./routes/genreRoutes");
const customerRouter = require("./routes/customerRoutes");
const mongoose = require("mongoose");
const errorMiddleware = require("../middleware/error");
// const winston = require("winston");
process.on("uncaughtException",(error) => {
    console.log("we got an uncaught exception",error);
    process.exit(1);
});
process.on("unhandledRejection",(error) => {
    console.log("we got an unhandled rejection",error);
    process.exit(1);
});
mongoose.connect("mongodb://localhost/movieCamp").then(() => debug("connected")).catch(err => debug(err));
const app = express();
app.use(express.json());
app.use("/api/genres",genreRouter);
app.use("/api/customers",customerRouter);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
