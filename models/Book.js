const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    yearPublished: {
        type: Number,
        required: false
    },
    genre: {
        type: [String]
    }
})

module.exports = mongoose.model('Book', bookSchema);


// title
// author
// description
// publisher
// yearPublished
// genre