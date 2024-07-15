const express = require("express");
const Joi = require("joi");
const debug = require("debug")("app:DB");
const mongoose = require("mongoose");


const router = express.Router();
const customerSchema = new mongoose.Schema({
    name : {type: String ,minlength : 3,unique : true, required : true, dropDups: true},
    isGold: {type : Boolean , default : true},
    phone : {type: Number , required : true }
});
const Customer = mongoose.model("Customer",customerSchema);
async function saveCustomer(name,isGold,phone){
    const customer = new Customer({
        name: name,
        isGold: isGold,
        phone : phone
    });
    
    const result = await customer.save();
    return result;
}

async function getCustomers(id){
    if(id === undefined){
        const customers = await Customer.find().sort({name : 1});
        return customers;
    }else{
        const customer = await Customer.find({_id : id});
        return customer;
    }
}
async function deleteCustomer(id){
    const result = await Customer.deleteOne({_id : id});
    return result;
}
async function updateCustomer(id,name,isGold,phone){
    const customer = await Customer.findById(id);
    if (!customer){
        return null;
    }
    if(name){
        customer.name = name;
    }
    if(isGold){
        customer.isGold = isGold;
    }
    if(phone){
        customer.phone = phone;
    }
    const result = await customer.save();
    return result;
}

router.get("/",async (req,res) => {
    try {
        const customers = await getCustomers();
        res.send(customers);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/:id",async (req,res) => {
    try {
        const customer = await getCustomers(req.params.id);
        res.send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.post('/',async (req,res) =>{
    const {error} = validateCustomerPost(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    try {
        const result = await saveCustomer(req.body.name,req.body.isGold,req.body.phone);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.put("/:id",async (req,res) => {
    const {error} = validateCustomerPut(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    try {
        const result = await updateCustomer(req.params.id,req.body.name);
        if (!result){
            res.status(404).send("found no customer with this ID ");
            return;
        }
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.delete("/:id",async (req,res) => {
    try {
        const result = await deleteCustomer(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

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
module.exports = router;