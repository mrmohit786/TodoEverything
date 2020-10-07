const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../Models/User");
const Task = require("../Models/Task");
const Auth = require("./middleware");
const router = express.Router();

//@route POST api/task
router.post(
  "/api/task",
  [
    Auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Please add a description.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description } = req.body;

    try {
      let task = new Task({ title, description, user: req.user.id });
      task = await task.save();
      res.json(task);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//@route GET api/task
router.get("/api/task", Auth, async (req, res) => {
  try {
    let task = await Task.find({ user: req.user.id }).populate("name");
    if (!task) return res.status(404).json("Task not found");

    res.json(task);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

//@route GET api/tasks
router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });

    res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/task/:id
router.put(
  "/api/task/:id",
  [
    Auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Please add a description.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json("User not found");
      }

      let task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json("Task not found");
      }

      task.title = title;
      task.description = description;

      task = await task.save();

      res.json(task);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

//@route DELETE api/task/:id
router.delete("/api/task/:id", Auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    let task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json("Task not found");
    }

    res.json("Task Delete");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
