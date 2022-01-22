const express = require("express");
const { User } = require("../models/user_model");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).send({ message: "Invalid email or password" });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		res.status(400).send({ message: "Invalid email or password" });

	const token = user.generateAuthToken();
	res
		.status(200)
		.send({ data: token, message: "Logging you in, please wait..." });
});

module.exports = router;
