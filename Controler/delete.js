
const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator");

module.exports.DeleteProduct=async(req,res,next)=>{
    
    await database.findByIdAndDelete({_id:req.params.id});
    res.redirect("/admin");}