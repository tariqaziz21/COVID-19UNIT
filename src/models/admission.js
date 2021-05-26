const mongoose = require("mongoose");
const validator = require("validator");


const admissionSchema = mongoose.Schema({

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

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
