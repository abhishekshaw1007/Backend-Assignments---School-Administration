const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const initialData = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/api/student", (req, res) => {
  try {
    res.json(initialData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get("/api/student/:id", (req, res) => {
  const student = initialData.find((element) => {
    return element.id == req.params.id;
  });
  //   console.log(student);
  if (student) {
    res.json(student);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
