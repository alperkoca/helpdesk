const expressAsyncHandler = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const User = require('../models/User');
const UserRole = require('../models/Role');
const bcrypt = require('bcryptjs');
const { json } = require('express');


const getUsers = expressAsyncHandler(async (req, res, next) => {
    let query = User.find();
    let total = 0;

    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i");
        searchObject["firstLastName"] = regex;
        query = query.where(searchObject);
        total = await User.countDocuments(searchObject);
    }
    else {
        total = await User.countDocuments();
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};

    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    query = query.skip(startIndex).limit(limit);
    const users = await query;
    res.status(200)
        .json({
            success: true,
            count: total,
            pagination,
            data: users
        });

});

const getUser = expressAsyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    return res.status(200)
    .json({
        success:true,
        data: user
    });
});

const createUser = expressAsyncHandler(async (req, res, next) => {
    const { firstLastName, email, password, passwordConfirm, roles, blocked } = req.body;
    const user_id = req.user.id;
    const existsUser = await User.findOne({email : email});

    if(existsUser) return next(new CustomError("User already exists.", 400));
    if (password !== passwordConfirm) return next(new CustomError("Password don't match", 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        firstLastName,
        email,
        password: hashedPassword,
        roles,
        blocked,
        createdUser: user_id,
        updatedUser: user_id
    });

    res.status(201)
    .json({
        success: true,
        data: newUser
    });
});

const updateUser = expressAsyncHandler(async (req, res, next) => {
    const { firstLastName, roles, blocked } = req.body;
    const id = req.params.id;
    const user_id = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(id, {
        firstLastName,
        roles,
        blocked,
        updatedUser: user_id,
        updatedAt: Date.now()
    }, { new: true});

    res.status(200)
    .json({
        success: true,
        data: updatedUser
    });
});

const getUserRoles = expressAsyncHandler(async (req, res, next) => {

    const userRoles = await UserRole.find({});

    return res.status(200)
    .json({
        success: true,
        data: userRoles
    });
});

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    getUserRoles
}