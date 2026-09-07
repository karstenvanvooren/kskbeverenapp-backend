const mongoose = require("mongoose");

const standingSchema = new mongoose.Schema(
  {
    team: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    played: {
      type: Number,
      default: 0,
    },

    won: {
      type: Number,
      default: 0,
    },

    drawn: {
      type: Number,
      default: 0,
    },

    lost: {
      type: Number,
      default: 0,
    },

    goalsFor: {
      type: Number,
      default: 0,
    },

    goalsAgainst: {
      type: Number,
      default: 0,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Standing", standingSchema);