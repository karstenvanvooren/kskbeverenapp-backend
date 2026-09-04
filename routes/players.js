const express = require("express");
const router = express.Router();

const Player = require("../models/Player");

// GET alle spelers
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();

    res.json(players);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen spelers",
      error: error.message,
    });
  }
});

// GET één speler
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({
        message: "Speler niet gevonden",
      });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen speler",
      error: error.message,
    });
  }
});

// POST nieuwe speler
router.post("/", async (req, res) => {
  try {
    const player = new Player(req.body);

    const savedPlayer = await player.save();

    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanmaken speler",
      error: error.message,
    });
  }
});

// PUT speler aanpassen
router.put("/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPlayer) {
      return res.status(404).json({
        message: "Speler niet gevonden",
      });
    }

    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanpassen speler",
      error: error.message,
    });
  }
});

// DELETE speler
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    if (!deletedPlayer) {
      return res.status(404).json({
        message: "Speler niet gevonden",
      });
    }

    res.json({
      message: "Speler verwijderd",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij verwijderen speler",
      error: error.message,
    });
  }
});

module.exports = router;