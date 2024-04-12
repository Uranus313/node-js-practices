const express = require("express");
const Joi = require("joi");
const log = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dBdebugger = require("debug")("app:DataBase");
let posts = [{id : 1, text:"first"},{id : 2, text:"second"},{id : 3, text:"third"}];
let app = express();
app.use(express.json());
app.use(log);
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(helmet());
console.log("aplication name : " + config.get("name"));
console.log("host : "+config.get("mail.host"));
console.log("host : "+config.get("mail.appPassword"));
// console.log(`env : ${app.get("env")}`);
if(app.get("env") === "development"){
    app.use(morgan("tiny"));
    startupDebugger("morgan enabled");
}
dBdebugger("dataBase connected");
app.get("/", (req,res) => {
    res.send("hello");
});
app.get("/api/posts", (req,res) => {
    res.send(posts);
});
app.get("/api/posts/:id",(req,res) => {
    const post = posts.find( post => post.id === parseInt(req.params.id));
    if (post){
        res.send(post);
    }else{
        res.status(404).send("couldn't find this post");
    }
    
});
app.post("/api/posts",(req,res) =>{
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    const post = {id : posts.length +1 , text : req.body.text};
    posts.push(post);
    res.send(post);
});
app.put("/api/posts/:id",(req,res) => {
    const post = posts.find( post => post.id === parseInt(req.params.id));
    if (!post){
        res.status(404).send("couldn't find this post");
        return;
    }
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    post.text = req.body.text;
    res.send(post);
});
app.delete("/api/posts/:id",(req,res) =>{
    const post = posts.find( post => post.id === parseInt(req.params.id));
    if (!post){
        res.status(404).send("couldn't find this post");
        return;
    }
    let index = posts.indexOf(post);
    posts.splice(index,1);
    res.send(post);
})
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
