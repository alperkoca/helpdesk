const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const RoleSchema = new Schema({
    name:{
        type:String,
        required:[true, "Please provide a Role Name"]
    },
    description:String
});

module.exports = mongoose.model("Role", RoleSchema);


