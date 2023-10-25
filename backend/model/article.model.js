const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    isVerified: {
        default: false,
        type: Boolean
    }
}, { timestamps: true });

const Article = mongoose.model("article", ArticleSchema);

module.exports = { Article };