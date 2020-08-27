const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator");
module.exports.edit=async(req,res,next)=>{
    const errors= validationResult(req);
   const {name ,description ,price , total } = req.body;
   if(errors.isEmpty())
   {
       await database.findByIdAndUpdate({_id:req.params.id},
           {name ,description ,price , total , imgURL:req.file.path}
       );
       res.redirect("/admin");
   }
   else
   {
       const productContainer=  await database.find({});
       res.render("edit",{productContainer, messageErrors:errors.array(), oldInputs:{name ,description ,price , total , imgURL:req.file.path}})   
   }
 
}