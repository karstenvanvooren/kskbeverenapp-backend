const express = require("express");

const router = express.Router();

const Match = require("../models/Match");


// GET ALL MATCHES
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({
      date: 1,
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen wedstrijden.",
      error: error.message,
    });
  }
});


// GET ONE MATCH
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: "Wedstrijd niet gevonden.",
      });
    }

    res.json(match);
  } catch (error) {
    res.status(400).json({
      message: "Ongeldige wedstrijd-ID.",
      error: error.message,
    });
  }
});


// CREATE MATCH
router.post("/", async (req, res) => {
  try {
    const match = new Match(req.body);

    const savedMatch = await match.save();

    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanmaken wedstrijd.",
      error: error.message,
    });
  }
});


// UPDATE MATCH
router.put("/:id", async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMatch) {
      return res.status(404).json({
        message: "Wedstrijd niet gevonden.",
      });
    }

    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanpassen wedstrijd.",
      error: error.message,
    });
  }
});


// DELETE MATCH
router.delete("/:id", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMatch) {
      return res.status(404).json({
        message: "Wedstrijd niet gevonden.",
      });
    }

    res.json({
      message: "Wedstrijd verwijderd.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij verwijderen wedstrijd.",
      error: error.message,
    });
  }
});


module.exports = router;