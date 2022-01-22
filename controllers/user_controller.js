const express = require("express")
const { User, validate } = require("../models/user_model")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send({ message: error.details[0].message })
	//first check if user exists in db
	const user = await User.findOne({ email: req.body.email })
	//if user exists, return error 403
	if (user)
		return res
			.status(403)
			.send({ message: "User with given email already exists" })

	//hash the password entered with bcrypt
	const hashedPassword = await bcrypt.hash(req.body.password, 10)

	//populate the request body with the user details and the hashed password
	let newUser = new User({
		...req.body,
		password: hashedPassword,
	})
	//now save the user
	await newUser.save()

	//these two undefined fields will be excluded from the response body
	newUser.password = undefined
	newUser._v = undefined

	res
		.status(200)
		.send({ data: newUser, message: "New user created successfully" })
}

exports.getAllUsers = async (req, res) => {
	const users = await User.find().select("-password -_v")
	res.status(200).send({ data: users })
}

exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -_v")
	res.status(200).send({ data: user })
}

exports.updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -_v")
	res.status(200).send({ data: user })
}

exports.deleteUser = async (req, res) => {
	await User.findByIdAndDelete(req.params.id)
	res.status(200).send({ message: "User deleted successfully" })
};
