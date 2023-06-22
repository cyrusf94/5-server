// ? this is where our read write functions reside for our .json file

// Enables access to the file system
const fs = require("fs");

// Helper functions that read and save .json( file)
function save(data, path) {
    fs.writeFile(path, JSON.stringify(data), err => {
        if (err) console.log(err);
    })
}

function read(path) {
    const file = fs.readFileSync(path);
    return !file.length ? [] : JSON.parse(file);
}

module.exports = {read, save};