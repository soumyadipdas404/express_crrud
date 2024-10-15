const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const itemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(7)
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    variants: {
        type: Array,
    }
})

module.exports = mongoose.model('items',itemSchema);