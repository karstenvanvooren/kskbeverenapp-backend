const express = require("express");

const router = express.Router();

const Standing = require("../models/Standing");


// GET FULL LEAGUE TABLE (sorted on punten, dan doelsaldo, dan doelpunten voor)
router.get("/", async (req, res) => {
  try {
    const standings = await Standing.find();

    const sorted = standings
      .map((team) => team.toObject())
      .sort((a, b) => {
        const goalDiffA = a.goalsFor - a.goalsAgainst;
        const goalDiffB = b.goalsFor - b.goalsAgainst;

        if (b.points !== a.points) return b.points - a.points;
        if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA;
        return b.goalsFor - a.goalsFor;
      })
      .map((team, index) => ({
        ...team,
        goalDifference: team.goalsFor - team.goalsAgainst,
        position: index + 1,
      }));

    res.json(sorted);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen van de stand.",
      error: error.message,
    });
  }
});


module.exports = router;