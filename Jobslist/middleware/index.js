const Users = require("../models/joblists");
const Joblists = require("../models/user");


let middlewareObj = {};


middlewareObj.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;