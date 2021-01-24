const mongoose = require("mongoose");
const {userRoleChecker} = require("./userRoleChecker");
const {ticketStatusChecker} = require("./ticketStatusChecker");

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Conncetion Successfull");
    })
    .then(() => userRoleChecker())
    .then(() => ticketStatusChecker())
    .catch((err) => {
        console.log(err);
    });
};


module.exports = connectDatabase;