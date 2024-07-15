const express = require("express");
const Joi = require("joi");
const debug = require("debug")("app:DB");
const mongoose = require("mongoose");


const router = express.Router();
const genreSchema = new mongoose.Schema({
    name : {type: String ,minlength : 3,unique : true, required : true, dropDups: true}
});
const Genre = mongoose.model("Genre",genreSchema);
async function saveGenre(name){
    const genre = new Genre({
        name: name
    });
    
    const result = await genre.save();
    return result;
}
async function getGenres(id){
    if(id === undefined){
        const genres = await Genre.find().sort({name : 1});
        return genres;
    }else{
        const genre = await Genre.find({_id : id});
        return genre;
    }
}
async function deleteGenre(id){
    const result = await Genre.deleteOne({_id : id});
    return result;
}
async function updateGenre(id,name){
    const genre = await Genre.findById(id);
    if (!genre){
        return null;
    }

    genre.name = name;
    const result = await genre.save();
    return result;
}

router.get("/",async (req,res) => {
    try {
        const genres = await getGenres();
        res.send(genres);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/:id",async (req,res) => {
    try {
        const genre = await getGenres(req.params.id);
        res.send(genre);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.post('/',async (req,res) =>{
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    try {
        const result = await saveGenre(req.body.name);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.put("/:id",async (req,res) => {
    const {error} = validatePosts(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    try {
        const result = await updateGenre(req.params.id,req.body.name);
        if (!result){
            res.status(404).send("found no genre with this ID ");
            return;
        }
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.delete("/:id",async (req,res) => {
    try {
        const result = await deleteGenre(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

function validatePosts(post){
    const schema =  Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(post);
}
module.exports = router;