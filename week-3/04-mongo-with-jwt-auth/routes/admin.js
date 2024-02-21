const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const router = Router();

const JWT_KEY = "my_special_key";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  if (username && password) {
    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(409).send("Admin already exists");
      }
      await Admin.create({ username, password });
      res.status(200).json({ message: "Admin created successfully" });
    } catch (error) {
      res.status(404).send(error.message);
    }
  } else {
    res.status(404).send("something went wrong");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  try {
    const isAdmin = await Admin.findOne({ username, password });
    if (isAdmin) {
      const token = jwt.sign({ username }, JWT_KEY);
      res.status(200).json({ token });
    } else {
      throw new Error("Admin doenst exist, check username or password");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  try {
    const isCourseExisting = await Course.findOne({
      title,
      description,
      price,
      imageLink,
    });
    if (isCourseExisting) {
      return res.status(403).json({ message: "course already exists" });
    }

    const response = await Course.create({
      title,
      description,
      price,
      imageLink,
    });
    res.status(200).json({
      message: "Course created successfully",
      courseId: response.id,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

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

module.exports = router;
