const express = require("express");
const path = require("path");
require ("./db/conn.js");
const Admission = require("./models/admission");
const User = require("./models/register");
const Vaccine = require("./models/vaccine");
const hbs = require("hbs");
const http = require('http').createServer();






const app = express();
const port = process.env.PORT || 3000;

// setting path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");


// middleware

app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:true}));
app.use(express.static(staticpath));
app.set("view engine", ".hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

app.get("/", function(req, res){
  res.render("home");
});
// routing
// app.get()
app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/vaccine", function(req, res){
  res.render("vaccine");
});

app.get("/register", function(req, res){
  res.render("register");
});
app.get("/login", function(req, res){
  res.render("login");
});

app.get("/success", function(req, res){
  res.render("success");
});

app.get("/failure", function(req, res){
  res.render("failure");
});

// addmission post
app.post("/cont", async function(req, res){
  try{
      const admissionData = new Admission(req.body);
      await admissionData.save();
      res.status(201).render("success");
  }catch (error){
    res.status(500).render("failure");
  }
});

// vaccine post
app.post("/vaccine", async function(req, res){
  try{
      const vaccineData = new Vaccine(req.body);
      await vaccineData.save();
      res.status(201).render("success");
  }catch (error){
    res.status(500).render("failure");
  }
});
// register POST

app.post("/register", async function(req, res){
  const newUser = new User({
    email:req.body.username,
    password:req.body.password
  });
  await newUser.save(function(err){
    if(err){
     console.log(err);
   }else{
       res.render("index");
   }
 });

});

// login POST
app.post("/login", function(req, res){

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email:username}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("index");
        }
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.render("index");
})

app.listen(port, function(){
  console.log("our server is running on "+port);
});
