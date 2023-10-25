const { Article } = require("../model/article.model");
const asyncHandler = require("express-async-handler");

// @desc gets all the articles
// @route GET /api/
// @access private
const GetArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error });
        next(error);
    }
}

// @desc gets a single article
// @route GET /api/:id
// @access private
const GetArticle = asyncHandler(async (req, res) => {
    if (req.params.id) {
        const article = await Article.findById(req.params.id);
        if (!article) {
            res.status(404).json({ error: "article not found" });
        }
        res.status(200).json(article);
    }
    res.status(404).json({ error: "article with this id does not exist" });
})

// @desc adds a new article to the database
// @route POST /api/:id
// @access private
const AddArticle = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "Not found error" });
    }
    console.log(req.body);
    const { title, description, isVerified } = req.body;
    const article = await Article.create({ title, description, isVerified });
    if (!article) {
        res.status(500).json({ error: "article could not be saved" });
    }
    res.status(201).json(article);
})

// @desc updates a new article to the database
// @route PUT /api/:id
// @access private
const UpdateArticle = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "body in the request object does not exisr" });
    }
    if (!req.params.id) {
        res.status(500).json({ error: "no id found" });
    }
    const { title, description, isVerified } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) {
        res.status(404).json({ error: "article not found" });
    }
    const updatedarticle = await Article.findByIdAndUpdate(req.params.id, { title, description, isVerified }, {new: true});
    if (!updatedarticle) {
        res.status(500).json({ error: "article could not be updated" });
    }
    res.status(200).json(updatedarticle);
})

// @desc deletes an articles with a specific id
// @route DELETE /api/:id
// @access private
const DeleteArticle = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ error: "id not found" });
    }
    const articleExist = await Article.findById(id);
    if (!articleExist) {
        res.status(404).json({ error: "article not found" });
    }
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
        res.status(500).json({ error: "article could not be deleted" });
    }

    res.status(200).json({ message: "article deleted" });
})

module.exports = { GetArticles, GetArticle, AddArticle, UpdateArticle, DeleteArticle };