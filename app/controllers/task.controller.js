const db = require("../models");
const Task = db.task;

// Create and Save a new Task
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }

  // Create a Task
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    type: 1,
    userId: req.body.userId,
  });

  // Save Task in the database
  task
    .save(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Task.find(condition)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

exports.userChecklist = (req, res) => {
  Task.find({ userId: req.userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

exports.fetchAll = (req, res) => {
  Task.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Task with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Task with id=" + id });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  let id = req.body.id;
  Task.findOneAndUpdate(
    {
      // userId: req.userId,
      _id: req.body.id,
    },
    { ...req.body },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else {
        res.send({
          message: "Task was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};