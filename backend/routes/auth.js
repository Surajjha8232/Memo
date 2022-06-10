const router = require("express").Router();
const { Userdetail } = require("../models/userdetail.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Userdetail.findOne({ email: req.body.email }); 
		
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		
		const id=user._id; 
		const email=user.email;
		const token = user.generateAuthToken();  
		const message="logged in successfully";
		
		res.status(200).json({ _id:id,email:email,token:token,message:message});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});  
const { protect } =require('../middleware/authMiddleware') ;

//private access 
router.get("/getuserdata",protect,async (req,res) =>{ 
	const {_id,email} = await Userdetail.findById(req.user._id)
	res.status(200).json({_id:_id,email:email,message:"User Data display"})
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;