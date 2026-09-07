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