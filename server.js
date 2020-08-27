const express= require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser").urlencoded({extended:false});
const mongoose = require("mongoose");
const multer = require("multer");
app.use(express.static(path.join(__dirname,"assets")));
app.use("/xyz",express.static(path.join(__dirname,"xyz")));
app.use(bodyParser);
app.set("view engine" , "ejs");
app.set("views" ,"views");
var storage = multer.diskStorage({
    destination:(req ,file ,cb)=>{
        cb(null,"xyz")
    },
    filename:(req ,file ,cb)=>{
        cb(null,Date.now()+'_'+Math.random()*1000+"mahmoud"+file.originalname)
    }
})
function fileFilter (req, file, cb) {


    if(file.mimetype==="image/png" ||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg")
    {
        cb(null, true)

    }else 
    {
        cb("invalid file type only png , jpg and jpeg is acceptable", false)

    }
  
}
app.use(multer({dest:"xyz" ,storage , fileFilter }).single("img"))
const routesLink = require("./Routes/routes.links");
app.use(routesLink);
mongoose.connect("mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/myDB",{
   useNewUrlParser:true ,useUnifiedTopology:true
})
app.listen(process.env.PORT||3000, ()=>{
    console.log("server is running");
})
