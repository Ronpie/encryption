//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("./mongoosedb");
const app = express();



app.set("view engine", "ejs");
app.use(bodyParser({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});
app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        mongoose.User.findOne({email:req.body.email}, (err,foundUser) => {
            if (!err){
                if (foundUser) {
                    res.send("this email is already registered.");
                }else{
                    const user_new = new mongoose.User({
                        email: req.body.username,
                        password: req.body.password,
                    });
                    user_new.save((error) => {
                        if (!error){
                            res.render("secrets");
                        }else{
                            console.log(error);
                            
                        }
                    });
                    
                }
                
            }else{
                console.log(err);
                
            }
        })
        
    })
app.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post((req, res) => {
        mongoose.User.findOne({email: req.body.username}, (err, foundUser) => {
            if (!err){
                if(foundUser){
                    if (foundUser.password === req.body.password){
                        res.render("secrets");
                    }else{
                        res.send("Password is wrong");
                        
                    }
                    
                }else{
                    res.send("this email has not registered. Sign up");
                }
            }else{
                console.log(err);
                
            }
        })
    })


port = process.env.PORT;
if (port == null || port == ""){
    port = 3008
}
app.listen(port, () => {
    console.log(`server is on http://localhost:${port}`);
    
})
