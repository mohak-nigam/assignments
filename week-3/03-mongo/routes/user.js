const express = require("express");
const { Router } = express;
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const app = express();

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  try {
    const isExisting = await User.findOne({ username, password });
    if (isExisting) {
      return res.status(403).json({ message: "user already exists" });
    }

    await User.create({ username, password });

    res.status(404).json({ message: "User created successfully" });
  } catch (e) {
    res.status(404).errored(e);
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({ message: "No Courses" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.send(error.message);
    res.status(404).errored("Something went wrong");
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const { username } = req.headers;

  try {
    const updatedResult = await User.updateOne(
      { username: username },
      { $push: { purchasedCourses: courseId } }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "course couldn't be updated" });
    }

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;

  try {
    const user = await User.findOne({ username: username });
    const courses = await Course.find({
      _id: { $in: user.purchasedCourses },
    });
    res.json({ courses });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
