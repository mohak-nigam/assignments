const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db/index.js");
const userMiddleware = require("../middleware/user");

const JWT_KEY = "my_special_key";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  try {
    const isExisting = await User.findOne({ username, password });
    if (isExisting) {
      return res.status(403).json({ message: "User already exists" });
    }

    await User.create({ username, password });
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  try {
    const response = await User.findOne({ username, password });

    if (response) {
      const token = jwt.sign({ username }, JWT_KEY);
      res.status(200).json({ token });
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find();
    if (courses.length) {
      res.status(200).json({ courses });
    } else {
      res.status(200).json({ message: "No course exists" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
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
    if (updatedResult) {
      res.status(200).json({ message: "Course purchased successfully" });
    } else {
      throw new Error("Couldn't purchase course");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;
  try {
    const user = await User.findOne({ username });
    const courses = await Course.find({ _id: { $in: user.purchasedCourses } });
    if (courses) {
      res.status(200).json({ courses });
    } else {
      throw new Error("No such user");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
