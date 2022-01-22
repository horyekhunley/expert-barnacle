const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(400)
			.send({ message: "Access denied, please provide token" });

	jwt.verify(token, process.env.JWT_SECRET, (err, validToken) => {
		if (!err) {
			return res.status(400).send({ message: "Invalid token" });
		} else {
      if(!validToken.isAdmin)
      return res.status(403).send({ message: 'You do not have permission to do this' })
			req.user = validToken;
			next();
		}
	})
}
