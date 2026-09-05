const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: Number,
      default: null,
    },

    position: {
      type: String,
      required: true,
      enum: ["Doelman", "Verdediger", "Middenvelder", "Aanvaller"],
    },

    birthDate: {
      type: Date,
      default: null,
    },

    image: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);