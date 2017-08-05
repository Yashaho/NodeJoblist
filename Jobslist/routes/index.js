let express = require("express");
let router  = express.Router();
let passport = require("passport");



//LANDING PAGE
router.get("/", (req, res)=>{
    res.render("landing");
});

//REGISTER ROUTE
router.get("/register", (req,res)=>{
    res.render("register");
});


router.post("/register", (req, res)=>{
    let newUser = new Users ({username: req.body.username, company:req.body.company, desc:req.body.companydesc});
    Users.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/joblist");
            console.log(newUser);
        });
    });


});



//LOGIN ROUTE 
router.get("/login", (req, res)=>{
    res.render("login");
    
});

//LOGIN LOGIC 

router.post("/login", passport.authenticate("local",
{
    
        successRedirect: "/joblist",
        failureRedirect: "/login"
    }), function(req,res){

    });


//LOGOUT ROUTE 
router.get("/logout", (req,res)=>{
        req.logout();
        res.redirect("/joblist");

});



module.exports = router;