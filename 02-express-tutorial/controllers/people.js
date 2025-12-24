const { people } = require("../data.js");

const getPeople = (req, res) => {
  res.json(people);
};

const getPerson = (req, res) => {
  const idToFind = parseInt(req.params.id, 10);

  const person = people.find((p) => p.id === idToFind);

  if (!person) {
    return res.status(404).json({ message: "Person is not found" });
  }

  res.status(200).json(person);
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a name" });
  }

  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

const updatePerson = (req, res) => {
  const idToFind = parseInt(req.params.id, 10);

  const person = people.find((p) => p.id === idToFind);

  if (!person) {
    return res.status(404).json({ message: "Person is not found" });
  }

  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a name" });
  }

  person.name = req.body.name;
  res.status(200).json(person);
};

const deletePerson = (req, res) => {
  const idToFind = parseInt(req.params.id, 10);

  const person = people.find((p) => p.id === idToFind);

  if (!person) {
    return res.status(404).json({ message: "Person is not found" });
  }

  // Using filter for updated list
  const updatedPeople = people.filter((p) => p.id !== idToFind);
  people.length = 0;
  people.push(...updatedPeople);

  res.status(200).json({ success: true });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
