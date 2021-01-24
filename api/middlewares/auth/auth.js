const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWraper = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/auth/tokenHelper");
const  User = require("../../models/User");
const mongoose = require("mongoose");

const getAccessToRoute = (req, res, next) => {
    
    if(!isTokenIncluded(req))
    {
        return next(new CustomError("You are not authorized to access this route", 401));
    }
    const token = getAccessTokenFromHeader(req);
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return next(new CustomError("You are not authorized to access this route", 401));
        }
        req.user = {
            id: decoded.id
        };
        next();
    });
}

const userRoleMiddleware = function(roles = [])
{
    return asyncErrorWraper(async function (req, res, next){
        if(roles.length === 0)
        {
            return next();
        }
        const user = await User.findById(req.user.id);
        if(!user) return next(new CustomError("You are not authorized to access this route", 401));

        for(let i = 0; i < roles.length ; i++){
            if(user.roles.includes(roles[i].name)){
                return next();
            }
        }
     
        return next(new CustomError("You are not authorized to access this route", 401));
    });
}


module.exports = {
    getAccessToRoute,
    userRoleMiddleware
}