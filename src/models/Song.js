const mongoose = require("mongoose");

// Define the schema
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    fileName:{
      type: String,
      required: true,
      trim: true,
    },
    originalName:{
      type: String,
      required: true,
      trim: true,
    },
    audioLink:{
      type: String,
      required: true,
      trim: true,
    },
    durationInSeconds:{
      type: Number,
      required: true,
    },
    category: {
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
   
    
    processedPath:{
      type: String,
    }
  },
  {
    timestamps: true,
    id: true,
  }
);

// Create the Song model
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
