const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_KEY = process.env.JWT_KEY;

const sessionValidation = async (req, res, next) => {
    try {
        // Preflight requests checks if the server accepts HTTP methods
        if (req.method === "OPTIONS") {
            next();
        } else if (req.headers.authorization) {
            // Conditional preventing token malformation
            // Verifies if it includes the word "Bearer" and removes if needed
            const authToken = req.headers.authorization.includes("Bearer")
                ? req.headers.authorization.split(" ")[1]
                : req.headers.authorization

                //  JWT token verification and payload extrication
                const payload = authToken ? jwt.verify(authToken, JWT_KEY) :
                undefined;

                if (payload) {
                    // Make db cal to users collection to find the user
                    const findUser = await User.findOne({ _id: payload._id});
                    if (!findUser) throw Error("User not found");
                    //add user identity to the request
                    req.user = findUser
                    //continue
                    next()
                } else {
                    throw Error("Invalid token")
                }

        } else {
            throw Error("Forbidden");
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
}

module.exports = sessionValidation