/** Required Variables **/
const mongoose = require('mongoose');
const schema = mongoose.Schema;


/** Schema Rules **/
const videogameSchema = new schema({
    title: {
        type: String,
        required: true,
        // This must be unique
        // because it is very unlikely that two
        // videogames will have the same name
        unique: true
    },
    descript: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    gameType: {
        type: [String],
        required: true,
        // Added this to keep an empty array from
        // getting passed into the entry
        validate: {
            validator: function(array) {
                return array.length > 0;
            },
            message: 'Array cannot be empty'
        }
    },
    ageRating: {
        // This can also come in as unknown,
        // because not every game has an age
        // rating.
        type: String,
        default: "No Age Rating"
    },
    numOfPlayers: {
        type: String,
        required: true
    }
},
// Turned off the versionKey in the schema because
// it is not required for the db to work, and it also cleans
// up the db entry.
{versionKey: false}
);


/** Exports **/
module.exports = mongoose.model("Videogame", videogameSchema);