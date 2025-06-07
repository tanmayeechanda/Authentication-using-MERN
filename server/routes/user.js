const router = require("express").Router(); // FIX 1: Correct way to create a router
const { user, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const existingUser = await user.findOne({ email: req.body.email }); // FIX 2: moved outside if block & use lowercase `user`
        if (existingUser) {
            return res.status(409).send({ message: "user with the given email already exist!!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new user({ ...req.body, password: hashPassword }).save(); // FIX 3: typo corrected: `passowrd` → `password`
        res.status(201).send({ message: "User Created Successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
