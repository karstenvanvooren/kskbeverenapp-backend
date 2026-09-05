const express = require("express");

const router = express.Router();

const MomVote = require("../models/MomVote");
const Match = require("../models/Match");
const Player = require("../models/Player");
const User = require("../models/User");


// GET ALL VOTES FOR MATCH
router.get("/match/:matchId", async (req, res) => {
  try {
    const votes = await MomVote.find({
      matchId: req.params.matchId,
    })
      .populate(
        "playerId",
        "firstName lastName number position image"
      )
      .populate("userId", "username");

    res.json(votes);
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen stemmen.",
      error: error.message,
    });
  }
});


// GET VOTE RESULTS
router.get("/match/:matchId/results", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);

    if (!match) {
      return res.status(404).json({
        message: "Wedstrijd niet gevonden.",
      });
    }

    const results = await MomVote.aggregate([
      {
        $match: {
          matchId: match._id,
        },
      },

      {
        $group: {
          _id: "$playerId",
          votes: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          votes: -1,
        },
      },
    ]);

    const totalVotes = results.reduce(
      (total, item) => total + item.votes,
      0
    );

    const formattedResults = [];

    for (const result of results) {
      const player = await Player.findById(result._id);

      if (player) {
        formattedResults.push({
          player: {
            id: player._id,
            firstName: player.firstName,
            lastName: player.lastName,
            number: player.number,
            position: player.position,
            image: player.image,
          },
          votes: result.votes,
          percentage:
            totalVotes === 0
              ? 0
              : Math.round((result.votes / totalVotes) * 100),
        });
      }
    }

    res.json({
      totalVotes,
      results: formattedResults,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fout bij ophalen stemresultaten.",
      error: error.message,
    });
  }
});


// CREATE VOTE
router.post("/", async (req, res) => {
  try {
    const { matchId, playerId, userId } = req.body;

    if (!matchId || !playerId || !userId) {
      return res.status(400).json({
        message: "matchId, playerId en userId zijn verplicht.",
      });
    }

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        message: "Wedstrijd niet gevonden.",
      });
    }

    if (match.status !== "finished") {
      return res.status(400).json({
        message: "Je kan pas stemmen wanneer de wedstrijd afgelopen is.",
      });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        message: "Speler niet gevonden.",
      });
    }

    if (!player.active) {
      return res.status(400).json({
        message: "Deze speler is niet actief.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Gebruiker niet gevonden.",
      });
    }

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
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Je hebt al gestemd voor deze wedstrijd.",
      });
    }

    res.status(400).json({
      message: "Fout bij stemmen.",
      error: error.message,
    });
  }
});


module.exports = router;