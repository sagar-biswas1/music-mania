const parameterValidators = {
    title: (value) => value && value.length >= 5,
    artist: (value) => value && value.length >= 3,
    cover: (value) => value && value.match(/^https?:\/\/.*\.(jpg|png|gif)$/),
    status: (value) => ["draft", "published", "rejected"].includes(value),
    category: (value) => ["free tier", "premium tier"].includes(value),
    fileName: (value) => value && value.length >= 1,
    originalName: (value) => value && value.length >= 1,
    audioLink: (value) => value && value.match(/^.*\.(mp3|ogg)$/),
    durationInSeconds: (value) => value && !Number.isNaN(value) && value >= 1,
    uploadedBy: (value) => value && value.length >= 3,
  };

  module.exports= parameterValidators