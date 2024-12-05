const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const movieSchema = new Schema({
    movieName : {
        type: String,
        required: [true, 'Frist Name is Required'],
        minlength: [3, 'Movie should be atleast 3 characters'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Movie year cannot be empty.'],
        validate: {
            validator: Number.isInteger,
            message: 'Year must be a number and not a letter.',
          },
        min: [3000,'Year is 4 digits long.'],
    },
    rating : {
        type: String,
        required: [true, 'PG-13, G , PG'],
        minlength: [1, 'Movie rating should be atleast a character'],
        trim: true,
    },
    genre : {
        type: String,
        required: [true, 'Movie genre is required'],
        minlength: [3, 'Movie genre needs to be atleast 3 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    views: {
        type: String,
        required: [true, 'Amount of views  is required'],
        minlength:[10, 'Views must be at least 1 character long.'],
        trim: true,
    },
    length: {
        type: String,
        required: [true, 'Movie length is required'],
        trim: true,    
    }

 });

 module.exports = mongoose.model('Movie', movieSchema);