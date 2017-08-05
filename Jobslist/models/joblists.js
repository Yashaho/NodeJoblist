let mongoose = require("mongoose");
let moment   = require("moment");



let joblistSchema = new mongoose.Schema({
    title: String,
    categories: String,
    salary: Number,
    description: String,
    worktype: String,
    location: String,
    lat:Number,
    lng:Number,
    experience: String,
    requirements: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        company: String,
        companydesc: String

    }
});

module.exports = mongoose.model("Joblists", joblistSchema);