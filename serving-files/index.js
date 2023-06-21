const express = require("express");
const app = express();

const PORT = 4000;

/* 
    ? Middleware
    * function or a method 
    * gives us access to the request and response objects
    * gives us access to the next middleware fx in the stack
    ! CAN BE MODIFIED
*/

function logTime(req, res, next) {
    let date = new Date();
    console.log(date.toLocaleDateString());
    req.date = date.toLocaleDateString();
    // * continues through the call stack
    next()
}

app.use(logTime)
app.use("/static", express.static(`${__dirname}/static`))


app.listen(PORT, () => {
    console.log(`[server] listening on ${PORT}`);
})