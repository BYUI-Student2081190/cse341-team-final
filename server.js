/** Required Variables **/
const express = require('express');
const mongoose = require('mongoose');
const dbConnection = require('./mongodb/connect');
// On the dev side set the port to 2024
const PORT = process.env.PORT || 2024;
const app = express();


/** Middleware **/
app.use(express.json());
// Hook to index route
app.use('/', require('./routes/indexRoute'));


/** Database Connection **/
dbConnection();


/** Run on PORT **/
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});