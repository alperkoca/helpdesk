const User = require('../models/User');
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraper = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = asyncErrorWraper(async (req, res, next) => {

    const {email, password, confirmPassword, firstLastName} = req.body;
    
    if (!(email && password && confirmPassword && firstLastName)) {
        return next(new CustomError("Please check your inputs", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new CustomError("User already exists.", 400));
    if(password !== confirmPassword) return next(new CustomError("Password don't match", 400));
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({email, password: hashedPassword, firstLastName})
    const token = generateToken(user);

    res.status(200)
    .json({
        result: { user },
        token: token
    })

});

const singin = asyncErrorWraper(async (req, res, next) => {
    const { email, password } = req.body

    if (!(email && password)) {
        return next(new CustomError("Please check your inputs", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new CustomError("Invalid credentails", 400));
    const isPasswordCorrect = await await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next(new CustomError("Invalid credentails", 400));
    const token = generateToken(user);
    user.password="";
    res.status(200)
    .json({
        result: { user },
        token: token
    })
});

const generateToken = (user) => {
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
}




module.exports = {
    signup,
    singin
}