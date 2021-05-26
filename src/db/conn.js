const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-tariq:761203ta@covid-19unit.wpdra.mongodb.net/covid-19Unit", {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(function(){
  console.log("connection successful");
}).catch(function(error){
  console.log("error");
})
