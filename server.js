var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var connection = require("./config/connection");

var orm = require("./config/orm.js");

// orm.selectAll();
// orm.insertOne();
// orm.updateOne();

//Show How Many Puppies In Kennel And Farm
app.get("/", function (req, res) {
  // orm.selectAll();
  // res.render("index", orm.selectAll());



  connection.query('SELECT * FROM Puppies; SELECT * FROM PuppiesAdopted', [1, 2], function (err, results) {
    if (err) throw err;
    console.log(results[0]); // [{1: 1}] Puppies
    console.log(results[1]); // [{2: 2}] PuppiesAdopted
    res.render("index", {
      Puppies: results[0],
      PuppiesAdopted: results[1],
    });
  });
});

//Find A New Puppy
app.post("/puppies", function (req, res) {
  connection.query("INSERT INTO Puppies(puppy_name) VALUES (?)", [req.body.puppy_name], function (err, result) {
    if (err) {
      return res.status(500).end();
    }
    res.json({
      id: result.insertId
    });
    console.log({
      id: result.insertId
    });
  });
});

// Adopting Puppy From Kennel To Farm
app.delete("/adopting/:id", function (req, res) {
  connection.query("DELETE FROM Puppies WHERE id = ?", [req.params.id], function (err, result) {
    if (err) {
      return res.status(500).end();
    } else if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

//Put Puppy In Farm
app.post("/adopted/:id", function (req, res) {
  connection.query("INSERT INTO PuppiesAdopted (puppy_name) VALUES (?)", [req.body.puppy_name], function (err, result) {
    if (err) {
      return res.status(500).end();
    }
    res.json({
      id: result.insertId
    });
    console.log({
      id: result.insertId
    });
  });
});

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});