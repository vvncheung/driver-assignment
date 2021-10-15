// const express = require('express');
// const app = express();
// const cors = require('cors');
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || '5000';

// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"))
// const http = require('http');

// const dbo = require("./db/conn");
// // const server = http.createServer(app);

// // app.get('/', (req, res) => {
// //   res.send({ express: 'express backend connected to react frontend'})
// //   console.log('connected')
// // })

// app.listen(port, () => {
//   // perform database connection when server starts
//   dbo.connectToServer((err) => {
//     if (err) console.log(err);
//   });
//   console.log(`server running on port: ${port}`);
// });


const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});