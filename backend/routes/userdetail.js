const router = require("express").Router();
const { Userdetail, validatedetail } = require("../models/userdetail.model");
const bcrypt = require("bcrypt"); 
const jwt = require('jsonwebtoken') ;
const asyncHandler =require('express-async-handler');

router.post("/", async (req, res) => {
	try {
		const { error } = validatedetail(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Userdetail.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newuser = await new Userdetail({ ...req.body, password: hashPassword }).save();
		res.status(201).json({ _id:newuser._id,email:newuser.email,message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;