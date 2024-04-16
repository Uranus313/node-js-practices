const express = require("express");
const Joi = require("joi");
const log = require("../middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const postsRouter = require("./routes/postsRoutes");
const homeRouter = require("./routes/homeRoutes");
const startupDebugger = require("debug")("app:startup");
const dBdebugger = require("debug")("app:DataBase");
let app = express();
app.use(express.json());
app.use(log);
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/posts",postsRouter);
app.use("/",homeRouter);
console.log("aplication name : " + config.get("name"));
console.log("host : "+config.get("mail.host"));
console.log("host : "+config.get("mail.appPassword"));
// console.log(`env : ${app.get("env")}`);
if(app.get("env") === "development"){
    app.use(morgan("tiny"));
    startupDebugger("morgan enabled");
}
dBdebugger("dataBase connected");


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
function validatePosts(post){
    const schema =  Joi.object({
        text : Joi.string().min(3).required()
    });
    return schema.validate(post);
}
