const router = require("express").Router();
const { error } = require("console");
const { json } = require("express");
const {save, read} = require("../helper/rw");
//import path to json file
const dbPath = "./db/users.json"
// TODO: build /register route
// http://localhost:4000/auth/register

router.post("/register", (req, res) => {
    try {
        // Destructure the body
        const { name, email, password } = req.body;
        // Grab current veiw of our json file
        let userDB = read(dbPath);
        // check if user exists
        let foundUser = userDB.filter(usr => usr.email === email);
        // Throw error if user doesn't exist
        if (foundUser.length > 0) {
            throw Error("Email already exists")
        }
        // Push data to read array if user exists
        userDB.push({name, email, password});
        // Save the user to the json file
        const isSaved = save(userDB, dbPath);
        // send response
        res.status(201).json({
            message: `User Created`,
            email
        })
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })

    }
    })

/* 
    ! CHALLENGE
    * check if user exists, if they dont return that user does 
    not exist
    * if they do exists, match passwords
    * if passwords match, return 200 response with user logged in
    * if passwords do not match, return incorrect password
*/


// TODO build /login route
// http://localhost:4000/auth/login

router.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        
        let userDB = read(dbPath);

        let foundUser = userDB.filter(usr => usr.email === email);
        
        if(foundUser.length === 0) {
            throw Error("user does not exist")

        } if (foundUser[0].password === password) {
            res.status(200).json({
                message: `user logged in`
        })
        } else {
            res.status(422).json({
                message: "incorrect password"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router;