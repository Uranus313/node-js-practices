const mongoose = require("mongoose");
exports = function(){
mongoose.connect("mongodb://localhost/movieCamp").then(() => console.log("connected"));
}