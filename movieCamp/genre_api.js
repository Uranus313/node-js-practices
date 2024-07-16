const express = require("express");
const genreRouter = require("./routes/genreRoutes");
const customerRouter = require("./routes/customerRoutes");
const mongoose = require("mongoose");
const errorMiddleware = require("../middleware/error");
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
