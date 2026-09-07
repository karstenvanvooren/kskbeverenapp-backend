const mongoose = require("mongoose");
require("dotenv").config();

const Standing = require("./models/Standing");

const standings = [
  { team: "VK Ninove", played: 6, won: 5, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 7, points: 16 },
  { team: "KV Eendracht Aalter", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 15, goalsAgainst: 8, points: 14 },
  { team: "KSK Beveren", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 14, goalsAgainst: 9, points: 13 },
  { team: "Herleving Red Star Haasdonk", played: 6, won: 4, drawn: 0, lost: 2, goalsFor: 13, goalsAgainst: 10, points: 12 },
  { team: "SK Munkzwalm", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 11, points: 11 },
  { team: "KVV Schelde Serskamp-Schellebelle", played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 10, goalsAgainst: 10, points: 10 },
  { team: "Evergem 2020", played: 6, won: 3, drawn: 0, lost: 3, goalsFor: 9, goalsAgainst: 11, points: 9 },
  { team: "FCSM Latem", played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 8, goalsAgainst: 10, points: 8 },
  { team: "SK Denderhoutem", played: 6, won: 2, drawn: 1, lost: 3, goalsFor: 7, goalsAgainst: 12, points: 7 },
  { team: "VC Nokere-Kruishoutem", played: 6, won: 1, drawn: 2, lost: 3, goalsFor: 6, goalsAgainst: 13, points: 5 },
  { team: "SK Berlare", played: 6, won: 1, drawn: 1, lost: 4, goalsFor: 5, goalsAgainst: 15, points: 4 },
];

async function seedStandings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    await Standing.deleteMany({});

    await Standing.insertMany(standings);

    console.log(`${standings.length} teams toegevoegd aan de stand!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedStandings();