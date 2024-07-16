const errorMiddleware = require("../../middleware/error");
const genreRouter = require("./genreRoutes");
const customerRouter = require("./customerRoutes");
const express = require("express");
exports = function(app){
    app.use(express.json());
    app.use("/api/genres",genreRouter);
    app.use("/api/customers",customerRouter);
    app.use(errorMiddleware);
}