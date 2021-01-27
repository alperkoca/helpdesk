const asyncErrorWraper = require("express-async-handler");
const Ticket = require("../models/Ticket");
const Status = require("../models/Status");
const Setting = require("../models/Setting");

const draftImageUpload = asyncErrorWraper(async (req, res, next) => {
    res.status(200)
        .json({
            success: true,
            message: "image upload successfull",
            data: req.ImageFileName
        })
});

const createTicket = asyncErrorWraper(async (req, res, next) => {
    const { category, summary, assignee, dueDate, priority, description } = req.body;
    const user_id = req.user.id;

    const newStatus = await Status.findOne({ name: "New", isSystemStatus: true });
    const ticketNumber = await Setting.findOneAndUpdate(
        { name: "TicketNumber" },
        { $inc: { valueNum: 1 } }
    );

    const ticket = await Ticket.create({
        ticketNumber: ticketNumber.valueNum,
        category,
        owner: user_id,
        assignee: assignee,
        priority,
        summary,
        description,
        dueDate,
        attachment: req.AttachmentFileName,
        createdUser: user_id,
        updatedUser: user_id,
        status: newStatus._id,
        watcher: { user: assignee }
    });
    res.status(200)
        .json({
            success: true,
            data: ticket
        });
})

const getTickets = asyncErrorWraper(async (req, res, next) => {
    const tickets = await Ticket.find({})
        .populate({
            path: "category",
            select: "name",
            populate: {
                path: "mainCategory",
                select: "name"
            }
        })
        .populate({
            path: "status",
            select: { name: 1, color: 1 }
        })
        .populate({
            path: "priority",
            select: { name: 1, color: 1 }
        })
        .populate({
            path: "assignee",
            select: { firstLastName: 1, profile_image: 1 }
        })
        .populate({
            path: "createdUser",
            select: { firstLastName: 1, profile_image: 1 }
        })
        ;

    res.status(200)
        .json({
            success: true,
            data: tickets
        });
});

module.exports = {
    draftImageUpload,
    createTicket,
    getTickets
};