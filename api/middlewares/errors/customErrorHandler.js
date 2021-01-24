const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if(err.name === "SyntaxError")
    {
        customError = new CustomError("Unexprected Syntax", 400);
    }
    if(err.name === "ValidationError")
    {
        customError = new CustomError(err.message, 400);
    }
    res.status(customError.status || 500)
    .json({
        success: false,
        message: customError.message || "Internal Server Error",
        error: customError
    });
};


module.exports = customErrorHandler;