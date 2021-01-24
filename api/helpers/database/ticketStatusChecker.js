const asyncErrorWraper = require("express-async-handler");
const Status = require("../../models/Status");


const ticketStatusChecker = asyncErrorWraper(async (req, res, next) => {
    const newStatus = await Status.findOne({name: "New", isSystemStatus: true});
    if(!newStatus)
    {
        await Status.create({
            name: "New", color: "#FF0000", isSystemStatus: true
        });
    }
    const answeredStatus = await Status.findOne({name: "Answered", isSystemStatus: true});
    if(!answeredStatus)
    {
        await Status.create({
            name: "Answered", color: "#0000FF", isSystemStatus: true
        });
    }
    const solvedStatus = await Status.findOne({name: "Solved", isSystemStatus: true});
    if(!solvedStatus)
    {
        await Status.create({
            name: "Solved", color: "#00FF00", isSystemStatus: true, isClosesTicket: true
        });
    }
});

module.exports = {
    ticketStatusChecker
}