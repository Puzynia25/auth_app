const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }

    const token = req.headers.authorization.split(" ")[1]; //Bearer pdrgkdpjgjg
    if (!token) {
        return next(ApiError.unauthorized("User is not authorized"));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
        return next(ApiError.unauthorized("User is not authorized"));
    }

    if (user && user.status === "blocked") {
        return res.status(401).json({ message: "Your account is blocked!" });
    }

    req.user = user;
    next();
    return;
};
