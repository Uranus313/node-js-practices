const Joi = require("joi");
const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema({
    name : {type: String ,minlength : 3,unique : true, required : true, dropDups: true}
});
const Genre = mongoose.model("Genre",genreSchema);
function validatePosts(post){
    const schema =  Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(post);
}
exports.Genre = Genre;
exports.validatePosts = validatePosts;