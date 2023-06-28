const { mongoose } = require("../db");

const Beer = new mongoose.Schema(
    {
        brand: { 
            type: String ,
            required: true,
            cast: false
        },
        brewery: {
            type: String,
            required: true,
            cast: false
        },
        abv: {
            type: Number,
            required: true,
            cast: false
        },
        country: {
            type: String,
            required: true,
            cast: false
        },
        style: {
            type: String,
            required: true,
            cast: false
        },
        size: {
            type: Number,
            required: true,
            cast: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("beer", Beer)