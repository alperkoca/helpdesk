const asyncHandler = require('express-async-handler');
const Priority = require('../models/Priority');
const CustomError = require('../helpers/error/CustomError');

const getPriorities = asyncHandler(async (req, res, next) => {
    var priorities = await Priority.find({});

    res.status(200)
    .json({
        message: true,
        data: priorities
    });
});

const createPriorities = asyncHandler(async (req, res, next) => {
    const {name, importance_factor, color, blocked} = req.body;
    const userId = req.user.id;

    const newPriorities = await Priority.create({
        name,
        color,
        blocked,
        importance_factor,
        createdUser: userId,
        updatedUser: userId
    });

    res.status(201)
    .json({
        message: true,
        data:newPriorities
    });
});

const updatePriorities = asyncHandler(async (req, res, next) => {
    const {name, importance_factor, color, blocked} = req.body;
    const userId = req.user.id;
    const {id} = req.params;

    const updatedPriorities = await Priority.findByIdAndUpdate(id, {
        name,
        color,
        blocked,
        importance_factor,
        updatedUser: userId,
        updatedAt: Date.now()
    }, { new: true});

    res.status(200)
    .json({
        message: true,
        data:updatedPriorities
    });
});

module.exports = {
    getPriorities,
    createPriorities,
    updatePriorities
}