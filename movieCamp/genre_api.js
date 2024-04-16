const express = require("express");
const genreRouter = require("./routes/genreRoutes");

const app = express();
app.use(express.json());
app.use("/api/genres",genreRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
