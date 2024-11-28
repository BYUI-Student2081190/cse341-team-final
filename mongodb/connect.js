/** Required Variables **/
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

/** Connection to Database **/

// Establish a connection
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch(error) {
        console.log(error); // If there is a problem connecting, throw a error
    }
};

/** Export the File **/
module.exports = dbConnect;