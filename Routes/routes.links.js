const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator");
const formvalidation = require("../Controler/validation");
const handelform = require("../Controler/handelform");
const deleteProduct = require("../Controler/delete");
const editData = require("../Controler/editdata");
//display Product
router.get("/" , async(req,res,next)=>{
 const productContainer=  await database.find({});
    res.render("user",{productContainer})
})
router.get("/admin" , async(req,res,next)=>{
    const productContainer=  await database.find({});
       res.render("Admin",{productContainer , messageErrors:[] ,oldInputs:{name:'',description :'',price :'', total :'', imgURL:''}})
   })
//add Product
router.post("/handleForm" ,formvalidation.formValidation,handelform.handelForm
)
//Delete Product
router.get("/delete/:id" , deleteProduct.DeleteProduct
)

//Edit Product
router.get("/edit/:id" , async(req,res,next)=>{
    const productContainer= await database.findById({_id:req.params.id});
    res.render("edit",{productContainer ,messageErrors:[] ,oldInputs:{name:'',description :'',price :'', total :'', imgURL:''}})
})

router.post("/editform/:id" ,formvalidation.formValidation,editData.edit
 )
//showmore
router.get("/showmore/:id", async(req,res,next)=>{
    let productContainer= await  database.find({_id:req.params.id});
      res.render("showmore" ,{productContainer});
 })

  //search
  router.post("/search", async(req,res,next)=>{
    let productContainer= await  database.find({name : new RegExp(req.body.search)});
      res.render("user" ,{productContainer});
  })
  
module.exports=router;