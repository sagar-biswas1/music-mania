const mongoose = require("mongoose");

// Define the schema
const songSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    Artist: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      enum: ["free tier", "premium tier"],
      default: "free tier",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (many-to-one relationship)
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

// Create the Song model
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
