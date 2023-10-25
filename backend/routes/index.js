const express = require("express");
const { GetArticles, GetArticle, AddArticle, UpdateArticle, DeleteArticle } = require("../controller/article.controller");

// initializing the express router
const router = express.Router();


// All routes for the app
router
    .get("/", GetArticles)
    .get("/:id", GetArticle)
    .post("/", AddArticle)
    .put("/:id", UpdateArticle)
    .delete("/:id", DeleteArticle)


module.exports = router;