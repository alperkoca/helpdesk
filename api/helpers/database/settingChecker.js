const asyncErrorWraper = require("express-async-handler");
const Setting = require("../../models/Setting");


const settingChecker = asyncErrorWraper(async (req, res, next) => {
    const TicketNumber = await Setting.findOne({name: "TicketNumber"});
    if(!TicketNumber)
    {
        await Setting.create({
            name: "TicketNumber", valueNum:1
        });
    }
});

module.exports = {
    settingChecker
}