const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get((req, res) => {
  let db_connect = dbo.getDb("driverDataNew");
  db_connect
    .collection("backup")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("backup")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    _id: req.body._id,
    driver: req.body.driver,
    records: req.body.records,
  };
  db_connect.collection("backup").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 document added");
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post((req, response) => {
  let db_connect = dbo.getDb("driverDataNew");
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      records: req.body.records
    },
  };
  db_connect
    .collection("backup")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("backup").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;
