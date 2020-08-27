const router = require("express").Router();
const database = require("../model/DB");
const {check , validationResult}= require("express-validator");

module.exports.formValidation=[
check('name',"invalid data").matches(/^[A-Z a-z]/) ,
check('price',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('total',"invalid data").matches(/^[0-9]{1,500}$/) ,
check('description',"invalid data").matches(/^[A-Z a-z]/) ,]