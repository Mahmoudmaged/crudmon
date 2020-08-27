const mongosse  = require("mongoose");
const indexSchema = new mongosse.Schema({
    name:String,
    description:String,
    price:Number,
    total:Number,
    imgURL:String
})
const modulData =mongosse.model('ProductData',indexSchema);
module.exports=modulData;


