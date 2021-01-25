const asyncErrorWraper = require("express-async-handler");
const ticket = (req, res, next) => {
    res.status(200)
    .json({
        message:"ok"
    });
};

const draftImageUpload = asyncErrorWraper(async (req, res, next) => {
    res.status(200)
    .json({
        success: true,
        message: "image upload successfull",
        data: req.ImageFileName
    })    
});

module.exports = {
    ticket,
    draftImageUpload
};