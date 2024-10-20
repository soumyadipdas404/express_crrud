const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(7)
    },
    categoryName: {
        type: String,
        require: true,
    },
    products:{
        type:Array
    }
})

module.exports = mongoose.model('category', categorySchema);
