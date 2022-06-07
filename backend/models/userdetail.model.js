const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id },"-----BEGIN RSA PRIVATE KEY-----\rMIIEowIBAAKCAQEAz7pZEypvrFJCDshsbOamj9bmy/dXnUOyCo5b3xSvvTNIoFAC\r5ePXozCD/5Byih1JB6ZYE6OceEW6oArkPzZOl8bFBlqV9k30oerMtVei18+CfF/u\rFLWlJXs9FvXrRTKtsL43OmpLCH3LdzK9/+ZqhEx/TShp3JudUWuRW8ALqrBd8QW5\rCWJHYozYVaIpFzwJ9KW6fJ9GpZfcToCOquLWo8iINnAovXmvcAtdmzgIqoucD988\rf9oerll/CubJLy2rOiyeRvsAYouoefoyQZWN8IYPlnb5IB6Z7qnVL6rZz44dAjVw\rS3uARW3lxpfeZn3TN7wpPkBssGBF0OSEHNrXVwIDAQABAoIBAC8HHCVnpRKZKNVZ\r8JoS+cB0wZmJrK8w5TzYj9oIP+UQmC+bDZzoISiT0j5ogFXeXWs68JO5pbHg72hO\rLvBUpiRcXryag3rYmTqTArdHWNmM5BiuSyMrIHFE3ka1dAcdew8ZcT1rVQNeH1Mk\rDLnDe3fqLaPVM2o7XLlTJfxklP+WN6xWhBgDVgEawneo5svdgblYhg3u7cb4fsHg\rcAf0sCYraVuqcUHa/AUVOx7n5U39x3ShOvOQvFlWEDD6uN4Yg/twW2UyfFDWD57p\r2oPIEf06wOOu2XylPQwEU9w92Fr4yNqk0xksn8sOjbRyEPZncpDICsPTo1nsrz+R\r0AcwWUkCgYEA7DfUujbbg6WrfSOyS718kTeej0Il5z19JYu11g+Sis4r8RWbT92q\rweCp4dCGCpJrsPbs4+s4hT42sKfjUcUy5ZCGTDturQNbhH0RGxPp1KUTrytzdph8\r4mqpCVYcN1AmLCCA0WtFqJ53taWuipcLtU48ZRC4jHI+stUSNCtaE8UCgYEA4R+6\rx5mUjOWAK8GSTgHMWa72KqaxR/osYwmMPtHtjIFm1aOElQaXbGlZKd3dR5Tnw/4R\r8hO/gJc+eQeaPGhri0IVmG66JNTw8q0M0Qd+l0OrarYS5c09XzjAUdGOatstsaNE\rrhgRG90HvVYt0cHyKRa/C4+CnEBod/EoS/UnhGsCgYB5wT1Qzj3PWXFPCzs3du/i\rGf0Mclf/HN6In76WG2i5SxOzLCPlwqflTtvBnS25/Uas7FmmEPQNGcguvhqZZz+Y\rvCm82VVusDBX1e8fOeBozr2aqJbXJjoYqkl+mnfoutMyI37Ccrxw8V1ar4+Lt9c9\rGJpgrYGyQqC2pMTBRyci0QKBgHxc9uXE5ddgAQorCROm0qjIipzNMSo9/b9ISv15\rIu13nsNubZOV7JirKeKC+fbNP6t585fzaNs0sgJSPNYaKS7o9t0abiJisCifiHEA\r3uHZNBzjMFVaqAiuZS/NwAsvwXJca1hxWyI1XE0wCmfR6GDie+96/AAtZIi95DDx\r4T65AoGBAIE5LSP+glxJEd8jU/qc80D/dXf6icURyYDGARw8mziAgw6fL9cwbmqb\rIGDxP1ke2FA8OZ0W4VybRi9UcprenvADYpPb+CPZv4gxGoDFg0Bb/JcFUKL29hC1\rsteX0GR4TKYNeXLC+zz7Qr0DzhpqRswSyHG5GckkIRdgHx4l/Uza\r-----END RSA PRIVATE KEY-----", {
		expiresIn: "7d",
	});
	return token;
};

const Userdetail = mongoose.model("userdetail", userSchema);

const validatedetail = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { Userdetail, validatedetail };