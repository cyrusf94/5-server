require("dotenv").config();

/* 
    ? Creating a new project and express server
    *1. init new npm project using 'npm init' (tip: 'npm init -y' 
    does a quick start)
    * 2. install express using 'npm i express'
    * 3. in your 'package.json':
        * under scripts, add '"start": "node app.js"' 
        * add '"dev": "nodemon"'
    * 4. create your entry file (index.js or app.js)
    * 5. run your server using 'npm run dev' command
*/

// * assign dependency import to a variable
const express = require("express");
// * invoke top level express function within a variabl
const app = express();

// * define our constants
let PORT = process.env.PORT
let HOST = process.env.HOST

/* 
    ? Basic Routing Example
    * .method() we want to handle (GET, POST, PUT, DELETE, ECT.)
    * endpoint we create
    * callback function with request and response parameters
    * optional: can send simple response with .send() method on
    res object

    ? .get() is an HTTP method
*/

app.get("/", (req, res) => {
    res.send("You just hit your very first server endpoint")
})

/* 
    ? URL Param
    * a dynamic endpoint that can have any value
*/

app.get("/params/:name", (req, res) => {
    let name = req.params.name;
    console.log(name);
    res.send(`The name that has been passed as a param is ${name}`)
})

/* 
    ? URL Queries
    * dynamic endpoint that can have any key value pairs
    extrapolated
*/

app.get("/aboutme", (req, res) => {
    console.log(req.query);
    let {name, age, state} = req.query
    res.send([name, age, state]);
})

// * build our listner
app.listen(PORT, HOST, () => {
    console.log(`[server]: listening on ${HOST}:${PORT}`);
});

