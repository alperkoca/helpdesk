const mongoose = require("mongoose");
const { userRoleChecker } = require("./userRoleChecker");
const { ticketStatusChecker } = require("./ticketStatusChecker");
const { settingChecker } = require("./settingChecker");

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => userRoleChecker())
        .then(() => ticketStatusChecker())
        .then(() => settingChecker())
        .then(() => console.log("MongoDB Conncetion Successfull"))
        .catch((err) => {
            console.log(err);
        });
};


module.exports = connectDatabase;