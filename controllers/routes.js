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

router.get("/allbeers", async (req, res) => {
    try{
        console.log(req.user)
        const findAll = await Beer.find({});
        if (findAll.length === 0) throw Error("no entries found");

        res.status(200).json({
            findAll
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})
// TODO: GET api/:id --> get one beer
router.get("/:id", async (req, res) => {
    try{
        const { id: _id } = req.params
        const foundBeer = await Beer.findOne({ _id })
        if (!foundBeer) throw Error("Beer not found")

        res.status(200).json(foundBeer)
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }

})
// TODO: PUT api/update/:id --> edit one beer
router.put("/update/:id", async (req, res) => {
    try {
        const { id: _id } = req.params;
        
        const newBeer= req.body;
        
        const updatedBeer = await Beer.updateOne({ _id} , { $set: newBeer });
        
        if (updatedBeer.matchedCount === 0) throw Error("ID not found");
        
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

router.delete("/:id", async (req, res) => {
    try {
        const { id: _id } = req.params;

        const deleteBeer = await Beer.findByIdAndDelete({ _id })

        if (!deleteBeer) throw Error("ID not found")

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