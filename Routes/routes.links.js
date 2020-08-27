const router = require("express").Router();
const database = require("../model/DB");

//display Product
router.get("/" , async(req,res,next)=>{
 const productContainer=  await database.find({});
    res.render("user",{productContainer})
})
router.get("/admin" , async(req,res,next)=>{
    const productContainer=  await database.find({});
       res.render("Admin",{productContainer})
   })
//add Product
router.post("/handleForm" , async(req,res,next)=>{
    console.log(req.file.path);
    const {name ,description ,price , total } = req.body;
    await database.insertMany({name ,description ,price , total , imgURL:req.file.path});
    res.redirect("/admin");
})
//Delete Product
router.get("/delete/:id" , async(req,res,next)=>{
    
    await database.findByIdAndDelete({_id:req.params.id});
    res.redirect("/admin");
})

//Edit Product
router.get("/edit/:id" , async(req,res,next)=>{
    const productContainer= await database.findById({_id:req.params.id});
    res.render("edit",{productContainer})
})

router.post("/editform/:id" , async(req,res,next)=>{
    const {name ,description ,price , total } = req.body;
  await database.findByIdAndUpdate({_id:req.params.id},
        {name ,description ,price , total , imgURL:req.file.path}
    );
    res.redirect("/admin");
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