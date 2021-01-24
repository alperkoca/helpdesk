
const ticket = (req, res, next) => {
    res.status(200)
    .json({
        message:"ok"
    });
};

module.exports = {
    ticket
};