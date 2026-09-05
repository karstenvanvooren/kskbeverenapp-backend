const mongoose = require("mongoose");
require("dotenv").config();

const Player = require("./models/Player");

const players = [
  {
    firstName: "Jarl",
    lastName: "Hautekeete",
    position: "Doelman",
  },
  {
    firstName: "Mauro",
    lastName: "Van Goethem",
    position: "Doelman",
  },
  {
    firstName: "Sander",
    lastName: "Bellemans",
    position: "Doelman",
  },

  {
    firstName: "Samuell",
    lastName: "Kassels",
    position: "Verdediger",
  },
  {
    firstName: "Mike",
    lastName: "Smet",
    position: "Verdediger",
    birthDate: new Date("1991-03-06"),
  },
  {
    firstName: "Emmanuel",
    lastName: "Griffioen",
    position: "Verdediger",
  },
  {
    firstName: "Dylan",
    lastName: "Van Camp",
    position: "Verdediger",
    birthDate: new Date("2002-03-27"),
  },
  {
    firstName: "Moussa",
    lastName: "Mbaye El Hadji",
    position: "Verdediger",
  },
  {
    firstName: "Robbe",
    lastName: "Broeckaert",
    position: "Verdediger",
  },
  {
    firstName: "Ward",
    lastName: "Huygens",
    position: "Verdediger",
  },
  {
    firstName: "Niels",
    lastName: "De Pauw",
    position: "Verdediger",
    birthDate: new Date("1996-01-19"),
  },
  {
    firstName: "Arno",
    lastName: "De Kuyffer",
    position: "Verdediger",
  },

  {
    firstName: "Zakaria",
    lastName: "Benjouhra",
    position: "Middenvelder",
  },
  {
    firstName: "Jean Danick",
    lastName: "Tchang",
    position: "Middenvelder",
  },
  {
    firstName: "Cédric",
    lastName: "Praet",
    position: "Middenvelder",
    birthDate: new Date("2003-06-16"),
  },
  {
    firstName: "Warre",
    lastName: "Ponnet",
    position: "Middenvelder",
    birthDate: new Date("2001-12-26"),
  },
  {
    firstName: "Raphael",
    lastName: "Holzhauser",
    position: "Middenvelder",
  },
  {
    firstName: "Mathias",
    lastName: "Pijl",
    position: "Middenvelder",
  },
  {
    firstName: "Emiel",
    lastName: "De Schepper",
    position: "Middenvelder",
    birthDate: new Date("2002-03-05"),
  },
  {
    firstName: "Seppe",
    lastName: "Troch",
    position: "Middenvelder",
  },
  {
    firstName: "Muhammad",
    lastName: "Al Hanji",
    position: "Middenvelder",
  },
  {
    firstName: "Sami",
    lastName: "Kandil",
    position: "Middenvelder",
    birthDate: new Date("2005-02-17"),
  },
  {
    firstName: "Adam",
    lastName: "Tounsi",
    position: "Middenvelder",
  },
  {
    firstName: "Gabriel Rocha",
    lastName: "Quissonge",
    position: "Middenvelder",
  },

  {
    firstName: "Yentl",
    lastName: "Van De Velde",
    position: "Aanvaller",
    birthDate: new Date("1995-11-23"),
  },
  {
    firstName: "Jean-Baptist",
    lastName: "Monden",
    position: "Aanvaller",
    birthDate: new Date("2004-01-21"),
  },
  {
    firstName: "Yannick",
    lastName: "Braem",
    position: "Aanvaller",
  },
  {
    firstName: "Victor",
    lastName: "Zaman",
    position: "Aanvaller",
  },
  {
    firstName: "Milan",
    lastName: "Roelandt",
    position: "Aanvaller",
  },
];

async function seedPlayers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    await Player.deleteMany({});

    await Player.insertMany(players);

    console.log(`${players.length} spelers toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedPlayers();