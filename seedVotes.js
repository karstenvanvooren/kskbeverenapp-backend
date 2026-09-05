const mongoose = require("mongoose");

require("dotenv").config();

const MomVote = require("./models/MomVote");
const Match = require("./models/Match");
const Player = require("./models/Player");
const User = require("./models/User");

async function seedVotes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    const match = await Match.findOne({
      status: "finished",
      competition: "Competitie",
    });

    const players = await Player.find({
      active: true,
    }).limit(3);

    const users = await User.find().limit(3);

    if (!match) {
      console.log("Geen afgewerkte competitiewedstrijd gevonden.");
      return;
    }

    if (players.length < 3) {
      console.log("Niet genoeg spelers gevonden.");
      return;
    }

    if (users.length < 3) {
      console.log("Niet genoeg gebruikers gevonden.");
      return;
    }

    await MomVote.deleteMany({});

    const votes = [
      {
        matchId: match._id,
        playerId: players[0]._id,
        userId: users[0]._id,
      },
      {
        matchId: match._id,
        playerId: players[0]._id,
        userId: users[1]._id,
      },
      {
        matchId: match._id,
        playerId: players[1]._id,
        userId: users[2]._id,
      },
    ];

    await MomVote.insertMany(votes);

    console.log(`${votes.length} MOTM-stemmen toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedVotes();