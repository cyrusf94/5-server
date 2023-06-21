require("dotenv").config()
const express = require('express');

const app = express();

let PORT = process.env.PORT || 5000;
let HOST = process.env.HOST || "127.0.0.1";

app.get('/example', (req, res) => {
    res.send('hello, example')
})

app.get("/html", (req, res) => {
    res.send("<h1>Hello, <b>World</b>!</h1>");
})

app.get('/:key', (req, res) => {
    console.log(req.params)
})

app.get('/params/:page', (req, res) => {
    let page = req.params.page;
    console.log(`you are on ${page}`)
    if (page === "aboutme") {
        res.send('<h1>About Me</h1>')
    } else if (page === "home") {
        res.send('<h1>Home page</h1>');
    }
})

app.get('/params/:name', (req ,res) => {
    
    res.send('<form action="http://localhost:5000/"><input type="text"><button></button></form>')
})


app.listen(PORT, HOST, () => {
    console.log(`[server]: listening on ${HOST}:${PORT}`);
});


