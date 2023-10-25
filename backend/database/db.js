const mongoose = require("mongoose");

const CONNECT_TO_DATABASE = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("database connected"))
        .catch((err) => console.log(err));
}

module.exports = { CONNECT_TO_DATABASE };