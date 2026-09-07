const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB verbinding
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB verbonden!");
  })
  .catch((error) => {
    console.error("MongoDB verbinding mislukt:", error);
  });

// Routes
const usersRoutes = require("./routes/users");
const playersRoutes = require("./routes/players");
const matchesRoutes = require("./routes/matches");
const newsRoutes = require("./routes/news");
const commentsRoutes = require("./routes/comments");
const momVotesRoutes = require("./routes/momVotes");
const standingsRoutes = require("./routes/standings");

app.use("/users", usersRoutes);
app.use("/players", playersRoutes);
app.use("/matches", matchesRoutes);
app.use("/news", newsRoutes);
app.use("/comments", commentsRoutes);
app.use("/mom-votes", momVotesRoutes);
app.use("/standings", standingsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "KSK Beveren API werkt!",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});