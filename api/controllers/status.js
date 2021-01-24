const asyncErrorWraper = require("express-async-handler");
const Status = require('../models/Status');
const Ticket = require('../models/Ticket');


const getStasuses = asyncErrorWraper(async (req, res, next) => {
    const statuses = await Status.find({});

    return res.status(200)
        .json({
            message: true,
            data: statuses
        });
});

const createStatus = asyncErrorWraper(async (req, res, next) => {
    const { name, color, blocked, isClosesTicket } = req.body;
    const user_id = req.user.id;

    const status = await Status.create(
        {
            name,
            color,
            blocked,
            isClosesTicket,
            createdUser: user_id,
            updatedUser: user_id
        });


    return res.status(200)
        .json({
            message: true,
            data: status
        });
});

const updateStatus = asyncErrorWraper(async (req, res, next) => {
    const { name, color, blocked, isClosesTicket } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const updatedStatus = await Status.findByIdAndUpdate(id,
        {
            name,
            color,
            blocked,
            isClosesTicket,
            updatedUser: user_id,
            updatedAt: Date.now()
        });
    return res.status(200)
        .json({
            message: true,
            data: updatedStatus
        });
});

const deleteStatus = asyncErrorWraper(async (req, res, next) => {
    const { id } = req.params;
    const ticketCount = await Ticket.find({ status: id }).count();
    if (ticketCount > 0) {
        return next(`You can not delete this status because ${ticketCount} ticket(s) linked with this status`);
    }
    const status = await Status.findById(id);
    if (status?.isSystemStatus) return next(`You can not delete this status because its system status`);

    await Status.findByIdAndDelete(id);
    return res.status(200)
        .json({
            message: true
        });

});


module.exports = {
    getStasuses,
    createStatus,
    updateStatus,
    deleteStatus
}