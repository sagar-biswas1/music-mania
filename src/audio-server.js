// const express = require('express');
// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// // Specify the path to your HLS content folder
// const hlsContentFolder = path.join(__dirname, '../uploads/hls_output');

// // Serve static files (HLS content)
// app.use('/hls', express.static(hlsContentFolder));


// const publicDirectory = './uploads/hls';
// app.get('/stream', (req, res) => {
//   // Specify the name of your HLS playlist file (e.g., your-audio.m3u8)
//   const hlsPlaylistFile = 'musicFile-1696275865239-535518988.m3u8';

//   // Construct the full path to the HLS playlist file
//   const hlsPlaylistPath = path.join(hlsContentFolder, hlsPlaylistFile);
// console.log(hlsPlaylistPath);
//   // Check if the playlist file exists
//   if (!fs.existsSync(hlsPlaylistPath)) {
//     return res.status(404).send('HLS content not found');
//   }

//   // Set the content type for HLS
//   res.setHeader('Content-Type', 'application/x-mpegURL');

//   // Stream the HLS playlist to the client
//   const readStream = fs.createReadStream(hlsPlaylistPath);
//   readStream.pipe(res);
// });

// app.listen(port, () => {
//   console.log(`HLS audio server is running on port ${port}`);
// });


require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4001;
const publicDirectory = './uploads/hls_output';

const requestHandler = (req, res) => {
    console.log(req.url)
  const filePath = path.join(publicDirectory, req.url);

req.on("data",(chunk)=>{
    console.log(chunk)
})
  fs.exists(filePath, (exists) => {
    if (!exists) {
        console.log(`File not found: ${filePath}`)
      res.statusCode = 404;
      res.end(`File not found: ${filePath}`);
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(`Error reading file: ${err}`)
        res.statusCode = 500;
        res.end(`Error reading file: ${err}`);
        return;
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
      res.end(data);
    });
  });
};

const server = http.createServer(requestHandler);
console.log("hello")
server.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }

  console.log(`Video server started on port ${port}`);
});


