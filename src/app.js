const express = require("express");
const applyMiddleware = require("./middlewares");
require("dotenv").config();
const app = express();
// const routes = require("./routes");
applyMiddleware(app)
// app.use(routes);
app.get("/health", (req, res) => {
  res.send("Hello World!");
});


app.use((err, _req, res, _next) => {
  // format error
  console.log(err)
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});




module.exports= app