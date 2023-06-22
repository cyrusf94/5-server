const router = require("express").Router();
const { read, save } = require("../helper/rw");
const { v4: uuid_v4 } = require("uuid");
const dbPath = "./db/beers.json"

// TODO: POST api/create --> create beer
router.post("/create", (req, res) => {
    try {
        // generate new id
        const id = uuid_v4();
        // get all items from json file
        let beerDB = read(dbPath);
        //extrapolate the data from the request
        // check if the body has content
        if (Object.keys(req.body).length < 6) {
            throw Error("Please provide all content")
        }
        // package new id and the req data into a single object
        let newEntry = { id, ...req.body };
        // push the new content into the db
        beerDB.push(newEntry);
        // write new changes to the .json file
        save(beerDB, dbPath);
        res.status(200).json
    } catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})
// TODO: GET api/ --> all beers

router.get("/allbeers", (req, res) => {
    try{
        const allBeers = read(dbPath);
        res.status(200).json({
            allBeers
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})
// TODO: GET api/:id --> get one beer
router.get("/:id", (req, res) => {
    try{
           // destructure the id value from the request
        const { id } = req.params;
        // get your json file contents
        const db = read(dbPath);
        // find matching id
        const foundBeer = db.find(beer => beer.id === id);

        if (!foundBeer) throw Error("Beer not found")

        res.status(200).json(foundBeer)
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }

})
// TODO: PUT api/update/:id --> edit one beer
// TODO: DELETE api/delete/:id --> delete one beer

module.exports = router;