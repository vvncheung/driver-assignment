
const express = require("express");
const app = express();
const cors = require("cors");
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));


app.use(express.urlencoded({ extended: false }));

const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer((err) => {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});


