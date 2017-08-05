let express = require("express");
let router  = express.Router();
let Users = require("../models/user");
let middlware = require("../middleware/index");
let Joblists =require("../models/joblists");




//MAIN PAGE
router.get("/", (req, res)=>{
   
        Joblists.find({}) .sort({ createdAt: -1}).limit(5).exec((err, allJobsList) =>{

   
        if(err){
            console.log(err);
        }
        else {
            res.render("job/index", {job: allJobsList, currentUser: req.user});
        }


        
    });

    
});

//ADD POST

router.post("/", middlware.isLoggedin, (req, res)=>{
    let title = req.body.title;
    let experience = req.body.experience;
    let salary = req.body.salary;
    let categories = req.body.categories
    let description = req.body.description;
    let worktype = req.body.worktype;
    let postedBy = {
        id: req.user._id,
        company: req.user.company,
        companydesc: req.user.desc
    }

    geocoder.geocode(req.body.location, function (err, data) {
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let location = data.results[0].formatted_address;


    let newJob = {title:title,  experience:experience, salary:salary, categories:categories, postedBy:postedBy, description:description, worktype:worktype, location:location, lat:lat, lng, lng};

    Joblists.create(newJob, (err, newCreateJob)=>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/joblist");
            console.log(postedBy);
        }

    });

});

});


// NEW JOB
router.get("/new",middleware.isLoggedin, (req, res)=>{
    res.render("job/new");
});


//SHOW ONE JOB

router.get("/:id", (req,res)=>{
    Joblists.findById(req.params.id, (err, foundOneJob)=>{
        if(err){
            console.log(err);
        }
        else {
            res.render("job/show", {foundjob:foundOneJob});
        }
    });
    

});






module.exports = router;