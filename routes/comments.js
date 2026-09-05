const express = require("express");

const router = express.Router();

const Comment = require("../models/Comment");
const News = require("../models/News");
const User = require("../models/User");


// GET COMMENTS FOR NEWS
router.get("/news/:newsId", async (req, res) => {
  try {
    const comments = await Comment.find({
      newsId: req.params.newsId,
    })
      .populate("userId", "username profileImage")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen comments.",
      error: error.message,
    });
  }
});


// CREATE COMMENT
router.post("/", async (req, res) => {
  try {
    const { newsId, userId, content } = req.body;

    if (!newsId || !userId || !content) {
      return res.status(400).json({
        message: "newsId, userId en content zijn verplicht.",
      });
    }

    const newsExists = await News.findById(newsId);

    if (!newsExists) {
      return res.status(404).json({
        message: "Nieuwsartikel niet gevonden.",
      });
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden.",
      });
    }

    const comment = new Comment({
      newsId,
      userId,
      content,
    });

    const savedComment = await comment.save();

    const populatedComment = await Comment.findById(savedComment._id)
      .populate("userId", "username profileImage");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanmaken comment.",
      error: error.message,
    });
  }
});


// DELETE COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.id
    );

    if (!deletedComment) {
      return res.status(404).json({
        message: "Comment niet gevonden.",
      });
    }

    res.json({
      message: "Comment verwijderd.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij verwijderen comment.",
      error: error.message,
    });
  }
});


module.exports = router;