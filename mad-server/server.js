const express = require("express");
const app = express();
const cors = require("cors");

// word storage
let words = [];

let PORT = 4000;

// ? Middleware
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.post("/word", (req, res) => {
    const { word } = req.body;
    
    words.push(word);
    
    if (words.length === 5) {
        res.send(words);
        words = [];
    }
    
})


app.listen(PORT, () => {
    console.log(`[server]: listening on ${PORT}`)
})