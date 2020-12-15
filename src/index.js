const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
let studentArray = require("./InitialData");
let maxId = studentArray.length;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/api/student", (req, res) => {
  try {
    res.json(studentArray);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get("/api/student/:id", (req, res) => {
  const student = studentArray.find((element) => {
    return element.id == req.params.id;
  });
  //   console.log(student);
  if (student) {
    res.json(student);
  } else {
    res.sendStatus(404);
  }
});

const isNullOrUndefined = (val) => val === null || val === undefined;

app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body;
  if (
    isNullOrUndefined(name) ||
    isNullOrUndefined(currentClass) ||
    isNullOrUndefined(division)
  ) {
    res.sendStatus(400);
  } else {
    let newId = maxId + 1;
    maxId = newId;
    const newStudent = {
      newId,
      name,
      currentClass,
      division,
    };
    studentArray.push(newStudent);
    res.send({ id: newId });
  }
});

app.put("/api/student/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const { name, currentClass, division } = req.body;
  const matchedIndex = studentArray.findIndex((s) => s.id == idToUpdate);
  if (matchedIndex == -1) {
    res.sendStatus(400);
  } else {
    if (!isNullOrUndefined(name)) {
      studentArray[idToUpdate].name = name;
      console.log(studentArray);
    }
    if (!isNullOrUndefined(currentClass)) {
      studentArray[idToUpdate].currentClass = currentClass;
    }
    if (!isNullOrUndefined(division)) {
      studentArray[idToUpdate].division = division;
    }
    res.sendStatus(200);
  }
  // console.log(nameToUpdate.name);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
