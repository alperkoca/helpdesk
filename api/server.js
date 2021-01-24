const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const cors = require("cors");



dotenv.config({
    path: "./config/config.env"
});

const app = express();
app.use(cors());

//Express Boddy Middliware
app.use(express.json());




//Db Connect
connectDatabase();

//Router
app.use("/api", router);

//Error Handle
app.use(customErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`App start on ${PORT}`);
});