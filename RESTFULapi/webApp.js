const express = require("express");
let posts = [{id : 1, text:"first"},{id : 2, text:"second"},{id : 3, text:"third"}];
let app = express();
app.use(express.json());
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
    const post = {id : posts.length +1 , text : req.body.name};
    posts.push(post);
    res.send(post);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
