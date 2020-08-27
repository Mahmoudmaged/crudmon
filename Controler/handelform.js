const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator");

module.exports.handelForm =async(req,res,next)=>{
    let errors = validationResult(req);
    console.log(errors);
    //console.log(req.file.path);
    const {name ,description ,price , total } = req.body;
    if(errors.isEmpty())
    {
        await database.insertMany({name ,description ,price , total , imgURL:req.file.path});
        res.redirect("/admin");
    }
    else
    {
    const productContainer=  await database.find({});
    res.render("Admin",{productContainer, messageErrors:errors.array(), oldInputs:{name ,description ,price , total , imgURL:req.file.path}})
    }
}