const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");
const Volunteer = require("../model/volunteer");

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Create Account",
      });
    }

    if (user.password != password) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Password. Please enter correct Password",
      });
    }
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      msg: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Error while login",
      error,
    });
  }
});

router.post("/volunteer/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const user = await Volunteer.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Create Account",
      });
    }

    if (user.password != password) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Password. Please enter correct Password",
      });
    }
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      msg: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Error while login",
      error,
    });
  }
});

// POST request to create a new user
router.post("/user/register", async (req, res) => {
  const { name, phone, email, password, dob, gender } = req.body;

  // Validate the input data
  if (!name || !phone || !email || !password || !dob || !gender) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // You can add more specific validation logic here for each field if needed

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = new User({
      name,
      phone,
      email,
      password,
      dob,
      gender,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ success: true, savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user" });
  }
});

// GET request to retrieve all users
router.get("/user", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error("Error retrieving users:", err);
      res.status(500).json({ error: "Error retrieving users" });
    } else {
      res.status(200).json(users);
    }
  });
});

// POST request to create a new volunteer
router.post("/volunteer/register", async (req, res) => {
  const { name, phone, email, password, experience, specialization } = req.body;

  // Validate the input data
  if (
    !name ||
    !phone ||
    !email ||
    !password ||
    !experience ||
    !specialization
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // You can add more specific validation logic here for each field if needed

  try {
    const existingVolunteer = await Volunteer.findOne({ email });

    if (existingVolunteer) {
      return res
        .status(400)
        .json({ error: "Volunteer with this email already exists" });
    }

    const newVolunteer = new Volunteer({
      name,
      phone,
      email,
      password,
      experience,
      specialization,
    });

    const savedVolunteer = await newVolunteer.save();
    res.status(201).json({ success: true, savedVolunteer });
  } catch (err) {
    console.error("Error creating volunteer:", err);
    res.status(500).json({ error: "Error creating volunteer" });
  }
});

module.exports = router;
