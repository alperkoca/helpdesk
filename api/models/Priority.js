const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
    name:{
        type:String,
        required:[true, "Please provide a Role Name"]
    },
    color:{
        type:String,
        default:"#000"
    },
    importance_factor: {
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    createdUser:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    updatedAt:{
        type:Date,
        default: Date.now
    },
    updatedUser:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    blocked:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Priority", PrioritySchema);