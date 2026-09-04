const express = require("express");
const router = express.Router();

const News = require("../models/News");

// GET alle nieuwsartikels
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen nieuws",
      error: error.message,
    });
  }
});

// GET één nieuwsartikel
router.get("/:id", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Nieuwsartikel niet gevonden",
      });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen nieuwsartikel",
      error: error.message,
    });
  }
});

// POST nieuwsartikel
router.post("/", async (req, res) => {
  try {
    const article = new News(req.body);
    const savedArticle = await article.save();

    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanmaken nieuwsartikel",
      error: error.message,
    });
  }
});

// PUT nieuwsartikel
router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedArticle) {
      return res.status(404).json({
        message: "Nieuwsartikel niet gevonden",
      });
    }

    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanpassen nieuwsartikel",
      error: error.message,
    });
  }
});

// DELETE nieuwsartikel
router.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({
        message: "Nieuwsartikel niet gevonden",
      });
    }

    res.json({
      message: "Nieuwsartikel verwijderd",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij verwijderen nieuwsartikel",
      error: error.message,
    });
  }
});

module.exports = router;