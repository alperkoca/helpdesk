const {UserRoles} = require("../auth/userRoles");
const Role = require("../../models/Role");
const asyncErrorWraper = require("express-async-handler");
const mongoose = require("mongoose");

const userRoleChecker = asyncErrorWraper(async (req, res, next) => {

    Object.values(UserRoles).map(x => mapFunc(x));
});

const mapFunc = async(x) => {
    const role = await Role.findOne({name: x.name});
    if(!role){
       await Role.create(x);
    }
    else{
        role.description = x.description;
        role.save();
    }
}

module.exports = {
    userRoleChecker
}