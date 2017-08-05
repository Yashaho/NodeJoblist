const express           = require("express"),
      app               = express(),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),    
      Joblists          = require("./models/joblists");
      geocoder          = require("geocoder"),
      passport          = require("passport"),
      middleware        = require("./middleware/index"),
      Users             = require("./models/user"),
      localStrategy     = require("passport-local"),
      methodOverride    = require("method-override");

let joblistRoutes = require("./routes/joblist"),
    indexRoutes   = require("./routes/index");
     
app.locals.moment   = require("moment");





mongoose.connect("mongodb://localhost/joblist");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));




//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "AHAHA",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use("/", indexRoutes);
app.use("/joblist", joblistRoutes);




//LOCALHOST
app.listen(3000,  (req, res)=>{
    console.log("SERVER STARTED...");
});
