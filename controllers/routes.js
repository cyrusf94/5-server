const router = require("express").Router();
const Beer = require("../models/Beer");

// TODO: POST api/create --> create beer
// ! Challenge
// * check if all values are presented
// * pass them into the model
// * save
// * return result (aka serve a response)
// * SPICEY MODE: try to pass brand as a number,
// see what happens, see how you can alert us

router.post("/create", async (req, res) => {
    try {
        const { brand, brewery, abv, country, style, size } = req.body
        
        if (!brand || !brewery || !abv || !country || !style || !size) {
            throw Error("Incorrect schema data");
        }
        
        const newBeer = new Beer({ brand, brewery, abv, country, style, size })

        await newBeer.save();

        res.status(201).json({
            message: `Beer added`,
            newBeer
        })
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
router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        
        const db = read(dbPath);
        
        const foundBeer = db.find(beer => beer.id === id);
        
        if (!foundBeer) throw Error("Beer not found")
        
        let update = { id, ...req.body };
        let index = db.indexOf(foundBeer);
        db.splice(index, 1, update);

        save(db, dbPath);

        res.status(200).json({
            message: "Beer updated"
        })
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})
// TODO: DELETE api/delete/:id --> delete one beer

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        
        const db = read(dbPath);
        
        const foundBeer = db.find(beer => beer.id === id);
        
        if (!foundBeer) throw Error("Beer not found")
        
        let removed = db.filter(beer => beer !== foundBeer);

        save(removed, dbPath);

        res.status(200).json({
            message: "Beer deleted"
        })
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router;