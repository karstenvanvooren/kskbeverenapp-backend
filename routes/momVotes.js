const express = require("express");
const router = express.Router();

const MomVote = require("../models/MomVote");

// GET alle stemmen van een wedstrijd
router.get("/match/:matchId", async (req, res) => {
  try {
    const votes = await MomVote.find({
      matchId: req.params.matchId,
    })
      .populate("playerId", "firstName lastName number position image")
      .populate("userId", "username");

    res.json(votes);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen stemmen",
      error: error.message,
    });
  }
});

// POST een stem
router.post("/", async (req, res) => {
  try {
    const { matchId, playerId, userId } = req.body;

    // Controleer of gebruiker al gestemd heeft
    const existingVote = await MomVote.findOne({
      matchId,
      userId,
    });

    if (existingVote) {
      return res.status(400).json({
        message: "Je hebt al gestemd voor deze wedstrijd.",
      });
    }

    const vote = new MomVote({
      matchId,
      playerId,
      userId,
    });

    const savedVote = await vote.save();

    res.status(201).json(savedVote);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij stemmen",
      error: error.message,
    });
  }
});

module.exports = router;