const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name:{
        type:String,
        required:[true, "Please provide a Category Name"],
        minlength:[3, "lease provide a Category Name with min length 3"]
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
    },
    mainCategory:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    categories:[{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    }]
});

module.exports = mongoose.model("Category", CategorySchema);