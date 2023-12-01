const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
    {
        owner: { type: String, required: true},
        itemName: { type: String, required: true },
        quantity: { type: String, required: true },
        expirationDate: { type: Date, required: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Grocery", grocerySchema);