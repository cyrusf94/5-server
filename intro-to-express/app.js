// dependency which loads contents of .env file into process.env
require("dotenv").config();
/* 
    ? Creating a new project and express server
    * 1. init new npm project using `npm init` (tip: `npm init -y` does quick start)
    * 2. install express using `npm i express`
    * 3. in your `package.json`:
        * under scripts, add `"start": "node app.js"`
        * add `"dev": "nodemon"`
    * 4. create your entry file (index.js or app.js)
    * 5. run your server using `npm run dev` command
*/

// * assign dependency import to a variable
const express = require("express")
// * invoke top level express function within a variable
const app = express();
const cors = require("cors");

// * define our constants
let PORT = process.env.PORT
let HOST = process.env.HOST

/* 
    ? Basic Routing Example
    * .method() we want to handle (GET, POST, PUT, DELETE, etc.)
    * endpoint we create
    * callback function with request and response parameters
    * optional: can send simple response with .send() method on res object
    
    ? .get() is an HTTP method
*/
app.get("/", (req, res) => {
    res.send("test")
})

/* 
    ? URL Param
    * a dynamic endpoint that can have any value
    * accessed using `req.params` property
*/

app.get("/pokemon/:poke", (req, res) => {
    // let name = req.params.poke
    let { poke } = req.params
    console.log(poke)
    res.send(`The name that has been passed as a param is ${poke}`)
})

/* 
    ? URL Queries
    * dynamic endpoint that can have any key value pairs extrapolated
    * accessed using `req.query` property
*/

app.get("/aboutme", (req, res) => {
    console.log(req.query)
    let { name, age, state } = req.query
    res.send([name, age, state])
})

// ? Dependency which allows us to circumvent CORS
app.use(cors());
// ? Middleware used to translate JSON string to an object
app.use(express.json())
// ? Middleware parsing URL payloads (GET request)
app.use(express.urlencoded())


app.post("/auth/login", (req, res) => {
    // ? this is the body of a POST request
    console.log(req.body)
    // ? destructure the properties out of the object
    const {email, password} = req.body;
    // ? Send response back to the client
    res.send({
        message: "this is the user you sent me",
        email: email,
        password: password
    })
})


// * build our listener
app.listen(PORT, HOST, () => {
    console.log(`[server]: listening on ${HOST}:${PORT}`)
})
