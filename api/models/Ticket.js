const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    ticketNumber: {
        type: String,
        required: [true, "Please provide a Ticket Number"],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a Category"],
        ref: "Category"
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a Owner"],
        ref: "User"
    },
    assignee: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a Assignee User"],
        ref: "User"
    },
    priority: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a Priority"],
        ref: "Priority"
    },
    summary: {
        type: String,
        required: [true, "Please provide a Summary"],
        minlength: [6, "Please provide a summary with min length 6"],
    },
    description: {
        type: String,
        required: [true, "Please provide a Description"]
    },
    isClosed: {
        type: Boolean,
        default: 0
    },
    closedDate: Date,
    dueDate: Date,
    attachment: String,
    status: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a Status"],
        ref: "Status"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    watcher: [{
        user: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Please provide a Assignee User"],
            ref: "User"
        },
        sendAlert: {
            type: Boolean,
            default: true
        }
    }],
});

module.exports = mongoose.model("Ticket", TicketSchema);