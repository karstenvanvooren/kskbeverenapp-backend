const mongoose = require("mongoose");

require("dotenv").config();

const Comment = require("./models/Comment");
const News = require("./models/News");
const User = require("./models/User");

async function seedComments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    const news = await News.find();
    const users = await User.find();

    if (news.length === 0) {
      console.log("Geen nieuwsartikels gevonden.");
      return;
    }

    if (users.length === 0) {
      console.log("Geen gebruikers gevonden.");
      return;
    }

    await Comment.deleteMany({});

    const comments = [
      {
        newsId: news[0]._id,
        userId: users[0]._id,
        content: "Sterke start van het seizoen! 💛💙",
      },
      {
        newsId: news[0]._id,
        userId: users[1]._id,
        content: "Mooie overwinning!",
      },
      {
        newsId: news[1]._id,
        userId: users[2]._id,
        content: "Top dat iedereen gratis binnen kon.",
      },
    ];

    await Comment.insertMany(comments);

    console.log(`${comments.length} comments toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedComments();