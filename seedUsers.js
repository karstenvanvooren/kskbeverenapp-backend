const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("./models/User");

const users = [
  {
    username: "Karsten",
    email: "karsten@test.be",
    password: "test1234",
  },
  {
    username: "Supporter",
    email: "supporter@test.be",
    password: "test1234",
  },
  {
    username: "BeverenFan",
    email: "beveren@test.be",
    password: "test1234",
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    await User.deleteMany({});

    const usersWithHash = [];

    for (const user of users) {
      const passwordHash = await bcrypt.hash(user.password, 10);

      usersWithHash.push({
        username: user.username,
        email: user.email,
        passwordHash,
      });
    }

    await User.insertMany(usersWithHash);

    console.log(`${users.length} gebruikers toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedUsers();