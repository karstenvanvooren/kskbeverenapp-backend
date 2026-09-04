const mongoose = require("mongoose");
require("dotenv").config();

const Player = require("./models/Player");

const players = [
  {
    firstName: "Jarl",
    lastName: "Hautekeete",
    number: 1,
    position: "Doelman",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Mauro",
    lastName: "Van Goethem",
    number: 12,
    position: "Doelman",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Sander",
    lastName: "Bellemans",
    number: 21,
    position: "Doelman",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Samuell",
    lastName: "Kassels",
    number: 2,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Mike",
    lastName: "Smet",
    number: 3,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Emmanuel",
    lastName: "Griffioen",
    number: 4,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Dylan",
    lastName: "Van Camp",
    number: 5,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Moussa",
    lastName: "Mbaye El Hadji",
    number: 6,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Robbe",
    lastName: "Broeckaert",
    number: 7,
    position: "Verdediger",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Zakaria",
    lastName: "Benjouhra",
    number: 8,
    position: "Middenvelder",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Jean Danick",
    lastName: "Tchang",
    number: 10,
    position: "Middenvelder",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Cédric",
    lastName: "Praet",
    number: 11,
    position: "Middenvelder",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Warre",
    lastName: "Ponnet",
    number: 14,
    position: "Middenvelder",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Yentl",
    lastName: "Van De Velde",
    number: 9,
    position: "Aanvaller",
    image: "",
    bio: "",
    active: true,
  },
  {
    firstName: "Yannick",
    lastName: "Braem",
    number: 19,
    position: "Aanvaller",
    image: "",
    bio: "",
    active: true,
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