const router = require("express").Router(); // ✅ Fix: Create a router instance
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt"); // ✅ Fix: Required for password comparison

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message }); // ✅ Fix: typo in `mesaage`

        const user = await User.findOne({ email: req.body.email }); // ✅ Fix: `User`, not `user`
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" }); // ✅ Fix: typo in "Inavlid"

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" }); // ✅ Fix: typo in "Inavlid"

        const token = user.generateAuthToken(); // Assuming you defined this method in your User model
        res.status(200).send({ data: token, message: "Logged in successfully" }); // ✅ Fix: typo in message
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const Schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password") // ✅ Fix: `joi.string().password()` is invalid
    });
    return Schema.validate(data);
};

module.exports = router;
