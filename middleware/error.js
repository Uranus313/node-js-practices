const winston = require("winston");
exports = (err,req,res,next) => {
    // winston.error(err.message,err);
    res.statys(500).send("something went wrong");
}