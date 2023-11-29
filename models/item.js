const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        itemName: { type: String, required: true },
        quantity: { type: String, required: true },
        expirationDate: { type: Date, required: true},
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Item", itemSchema);