const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name : {type: String ,minlength : 3,unique : true, required : true, dropDups: true},
    isGold: {type : Boolean , default : true},
    phone : {type: Number , required : true }
});
const Customer = mongoose.model("Customer",customerSchema);

function validateCustomerPost(post){
    const schema =  Joi.object({
        name : Joi.string().min(3).required(),
        isGold : Joi.boolean(),
        phone : Joi.number().required()
    });
    return schema.validate(post);
}
function validateCustomerPut(post){
    const schema =  Joi.object({
        name : Joi.string().min(3),
        isGold : Joi.boolean(),
        phone : Joi.number()
    }).min(1);
    return schema.validate(post);
}
exports.Customer = Customer;
exports.validateCustomerPost = validateCustomerPost;
exports.validateCustomerPut = validateCustomerPut;