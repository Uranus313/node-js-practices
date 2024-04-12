const express = require("express");
const Joi = require("joi");
class Genre {
    constructor(id , name){
        this.id = id;
        this.name = name;
    }
}
const genres = [
    new Genre(1,"Action"), new Genre(2,"Horror"), new Genre(3,"Drama")
]
const app = express();
app.use(express.json());
app.get("/api/genres",(req,res) => {
    res.send(genres);
});
app.get("/api/genres/:id",(req,res) => {
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(genre){
        res.send(genre);
    }else{
        res.status(404).send("couldn't find this genre");
    };

});
app.post('/api/genres', (req,res) =>{
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    const genre = new Genre(genres.length + 1 ,req.body.name );
    genres.push(genre);
    res.send(genre);
});
app.put("/api/genres/:id",(req,res) => {
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("couldn't find this genre");
        return;
    }
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    genre.name = req.body.name;
    res.send(genre);
});
app.delete("/api/genres/:id",(req,res) => {
    const genre = genres.find( genre => genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("couldn't find this genre");
        return;
    }
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre); 
});

function validatePosts(post){
    const schema =  Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(post);
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`);
});
