require("dotenv").config();
const express = require("express");
const { CONNECT_TO_DATABASE } = require("./database/db");
const mongoose = require("mongoose");
const cors = require("cors");
const { Logger } = require("./middlewares/logger.middleware");
const { ErrorHandler } = require("./middlewares/ErrorHandler.middleware");

CONNECT_TO_DATABASE(); // Connection for mongodb

const app = express(); // initializing app

// Using middlewares
app.use(cors({
    origin: [process.env.ORIGIN_URL_ONE, process.env.ORIGIN_URL_TWO],
    //optionsSuccessStatus: true
})); // cross origin thingy
app.use(Logger); // logging every requests that comes to the server
app.use(express.json()); // body parser

// Routes
app.use("/api", require("./routes/index")); //articles
app.all('*', (req, res) => {
    res.status(404).json({ message: "error 404 not found" });
}); // returns 404 not found error if route does not exist


// Error Handling
app.use(ErrorHandler);

// Running the server if the mongoose connection is successful or open.
mongoose.connection.on('open', () => {
    app.listen(process.env.PORT, () => console.log(`server running at url: ${process.env.ORIGIN_URL_TWO}`));
});
