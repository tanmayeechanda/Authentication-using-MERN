const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// POST /api/users
router.post("/", async (req, res) => {
  try {
    // 1. Validate input
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).send({ message: "User already registered" });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 4. Save new user
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    // 5. Success response
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
