const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator")

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
router.post("/handleForm" ,
check('name',"invalid data").matches(/^[A-Z a-z]/) ,
check('price',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('total',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('description',"invalid data").matches(/^[A-Z a-z]/) ,
async(req,res,next)=>{
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
})
//Delete Product
router.get("/delete/:id" , async(req,res,next)=>{
    
    await database.findByIdAndDelete({_id:req.params.id});
    res.redirect("/admin");
})

//Edit Product
router.get("/edit/:id" , async(req,res,next)=>{
    const productContainer= await database.findById({_id:req.params.id});
    res.render("edit",{productContainer ,messageErrors:[] ,oldInputs:{name:'',description :'',price :'', total :'', imgURL:''}})
})

router.post("/editform/:id" ,
check('name',"invalid data").matches(/^[A-Z a-z]/) ,
check('price',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('total',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('description',"invalid data").matches(/^[A-Z a-z]/) ,
 async(req,res,next)=>{
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
  
})
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