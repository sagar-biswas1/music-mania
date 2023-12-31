const router = require('express').Router()
const { controllers : songsControllers} =require('../api/v1/song')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/', // Set the destination folder for uploaded files
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3');
    },
  });
  
  const upload = multer({ storage: storage });
  

router
.route("/api/v1/songs")
.get(songsControllers.findAll)
.post(upload.single('musicFile'),songsControllers.upload)


router
.route("/api/v1/songs/:id")
.get(songsControllers.findByID)

module.exports = {songRouter:router}