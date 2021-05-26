const mongoose = require("mongoose");
const validator = require("validator");


const vaccineSchema = mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  
  email:{
    type:String,
    required:true,
    validator(value){
      if(validator.isEmail(value)){
        throw new Error("invalid email")
      }
    }
  },
  address:{
    type:String,
    required:true,

  },
  phone:{
    type:Number,
    required:true
  },
  message:String
})

// collection

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
