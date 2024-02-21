const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index.js");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).send("Admin already exists");
    }
    await Admin.create({
      username,
      password,
    });

    res.status(200).json({ message: "Admin created successfully" });
  } catch {
    res.status(404).send("Error creating user");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  try {
    const isCourseExisting = await Course.findOne({ title });

    if (isCourseExisting) {
      return res.status(403).json({ Message: "course already exists" });
    }

    const newCourse = await Course.create({
      title,
      description,
      price,
      imageLink,
    });

    const courseId = newCourse["_id"];
    res.status(200).json({
      message: "Course created successfully",
      courseId,
    });
  } catch (error) {
    res.status(404).json({ errorMessage: "Something went wrong" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find();
    res.status(200).send({ courses });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
