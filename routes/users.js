const express = require("express");
const router = express.Router();

const User = require("../models/User");

// GET alle gebruikers
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen gebruikers",
      error: error.message,
    });
  }
});

// GET één gebruiker
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-passwordHash")
      .populate("favoritePlayerId");

    if (!user) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen gebruiker",
      error: error.message,
    });
  }
});

// POST nieuwe gebruiker
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);

    const savedUser = await user.save();

    const userResponse = savedUser.toObject();
    delete userResponse.passwordHash;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanmaken gebruiker",
      error: error.message,
    });
  }
});

// PUT gebruiker aanpassen
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden",
      });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanpassen gebruiker",
      error: error.message,
    });
  }
});

module.exports = router;