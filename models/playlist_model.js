const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity")

const playlistSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
		required: true,
	},
	description: {
		type: String,
	},
	songs: {
		type: Array,
		default: [],
	},
	image: {
		type: String,
	}
});

const validate = (playlist) => {
	const schema = Joi.object({

		name: Joi.string().required(),
		user: Joi.string().required(),
		description: Joi.string().allow(''),
		image: Joi.string().allow(''),
		songs: Joi.array().items(Joi.string()),
		
	});
  return schema.validate(playlist)
};
const playlist = mongoose.model("playlist", playlistSchema);

module.exports = {
  Playlist, validate
}
