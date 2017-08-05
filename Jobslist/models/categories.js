let mongoose = require("mongoose");


let categoriesSchema = new mongoose.Schema({
    contentwriters = String,
    database = String,
    design = String,
    management = String,
    mobiledev = String,
    onlinemarket = String,
    programming = String,
    qatest = String,
    sales = String, 
    sysad = String,
    techsupp = String,
    techhard = String,
    others = String,

});

modules.export = new mongoose.model("categories", categoriesSchema);