const express = require('express');

const app = express();

let PORT = 5000;

app.use(express.static('public'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/about", (req, res) => {
    res.sendFile(`${__dirname}/public/about.html`)
})

app.get("/store", (req, res) => {
    res.sendFile(`${__dirname}/public/store.html`)
})


app.listen(PORT, () => {
    console.log(`[server]: listening on ${PORT}`)
})