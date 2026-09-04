const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    opponent: {
      type: String,
      required: true,
    },

    opponentLogo: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    home: {
      type: Boolean,
      required: true,
    },

    competition: {
      type: String,
      required: true,
    },

    matchday: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "finished"],
      default: "upcoming",
    },

    homeScore: {
      type: Number,
      default: null,
    },

    awayScore: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Match", matchSchema);