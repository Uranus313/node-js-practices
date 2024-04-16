const express = require("express");
let router = express.Router();

let posts = [{id : 1, text:"first"},{id : 2, text:"second"},{id : 3, text:"third"}];
router.get("/", (req,res) => {
    res.send(posts);
});
router.get("/:id",(req,res) => {
    const post = posts.find( post => post.id === parseInt(req.params.id));
    if (post){
        res.send(post);
    }else{
        res.status(404).send("couldn't find this post");
    }
    
});
router.post("/",(req,res) =>{
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    const post = {id : posts.length +1 , text : req.body.text};
    posts.push(post);
    res.send(post);
});
router.put("/:id",(req,res) => {
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
router.delete("/:id",(req,res) =>{
    const post = posts.find( post => post.id === parseInt(req.params.id));
    if (!post){
        res.status(404).send("couldn't find this post");
        return;
    }
    let index = posts.indexOf(post);
    posts.splice(index,1);
    res.send(post);
})
module.exports = router;