const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");
const Player = require("../models/Player");

// ==========================================
// REGISTER
// POST /users/register
// ==========================================

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email en password zijn verplicht.",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Dit emailadres bestaat al.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email: email.toLowerCase(),
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "Account aangemaakt.",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fout bij registreren.",
      error: error.message,
    });
  }
});

// ==========================================
// LOGIN
// POST /users/login
// ==========================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email en password zijn verplicht.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Email of wachtwoord is fout.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Email of wachtwoord is fout.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Succesvol ingelogd.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        favoritePlayerId: user.favoritePlayerId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij inloggen.",
      error: error.message,
    });
  }
});

// ==========================================
// GET ALL USERS
// GET /users
// ==========================================

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .populate("favoritePlayerId");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen gebruikers.",
      error: error.message,
    });
  }
});

// ==========================================
// GET USER
// GET /users/:id
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-passwordHash")
      .populate("favoritePlayerId");

    if (!user) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden.",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: "Ongeldige gebruiker-ID.",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE USER
// PUT /users/:id
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      username,
      profileImage,
      favoritePlayerId,
    } = req.body || {};

    if (favoritePlayerId) {
      const player = await Player.findById(favoritePlayerId);

      if (!player) {
        return res.status(404).json({
          message: "Favoriete speler niet gevonden.",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        profileImage,
        favoritePlayerId,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-passwordHash")
      .populate("favoritePlayerId");

    if (!updatedUser) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden.",
      });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: "Fout bij aanpassen gebruiker.",
      error: error.message,
    });
  }
});

module.exports = router;