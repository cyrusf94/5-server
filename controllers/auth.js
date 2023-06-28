const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")
// value specifying how many times we run algorithm on data to be scrambled
const SALT = Number(process.env.SALT)

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) throw Error("Incorrect schema values");

        // Instantiate a new model using provided req.body object values
        // hash the password using .hashSync() method
        const newUser = new User({ name, email, password: bcrypt.hashSync(password, SALT) })
        // Save the model document into the collection
        await newUser.save();

        res.status(201).json({
            message: `User created`,
            newUser
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// TODO: create a login.
/* 
    * you will need to use a method you already know on the User model
    * you will need to cross check if email and password match an entry within the User model
    * have erorr handling in case someone doesn't put correct values (undefined)
    * if email doesn't match, create error handling for email
    * if password doesnt match, create error handling for password
    * return a response back
*/

// http://localhost:4000/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let foundUser = await User.findOne({ email });
        
        if (!foundUser) throw Error("User not found");
        
        // Async .compare() method which takes passwords from req.body
        // compares it against password from the user found in db
        const verifyPwd = await bcrypt.compare(password, foundUser.password)

        if (!verifyPwd) throw Error("Incorrect password");

        res.status(200).json({
            message: `Logged in`
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router