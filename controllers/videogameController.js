/** Required Variables **/
const Videogame = require('../models/Videogame');


/** Middleware to handle the CRUD operations **/
// Select all videogames in the db
const selectAll = async (req, res) => {
    try {
        // Try to select all the videogames from the db
        const result = await Videogame.find();
        res.status(200).send(result);
    } catch (error) {
        // If the videogames cannot be found, then display
        // an error to the user
        res.status(500).send({message: error.message || 'An error occured while querying the db.'});
    }
};

// Select a videogame in the db based on title
const selectByTitle = async (req, res) => {
    try {
        const vgTitle = req.params.title;
        const result = await Videogame.find( {title : vgTitle} );

        // If there is not a videogame with that title
        // have a 404 error
        if (!result.length) {
            res.status(404).send({message: `Could not find a videogame with the title ${vgTitle} in the db. Please try another title.`});
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        // If there is another type of error display a 500 error to the user
        res.status(500).send({message: error.message || 'An error occured while querying the db.'})
    }
};

// Select videogames by type in the db
const selectByType = async (req, res) => {
    try {
        const vgType = req.params.type;
        const result = await Videogame.find( {gameType : { $in : vgType} });

        // If things came back display, otherwise tell the user
        // nothing matches the search
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: `There is no videogame with the type of ${vgType}. Please input a different type.`});
        }
    } catch (error) {
        // If an error occurs send a 500
        res.status(500).send({message: error.message || 'An error occured while querying the db.'});
    }
};

// Create a videogame entry
const createVideoGameEntry = async (req, res) => {
    try {
        // Obtain the insert data
        const insertData = ({
            title: req.body.title,
            descript: req.body.descript,
            publisher: req.body.publisher,
            developer: req.body.developer,
            gameType: req.body.gameType,
            ageRating: req.body.ageRating,
            numOfPlayers: req.body.numOfPlayers
        });
        const response = await Videogame.insertMany(insertData);

        // If no errors happen, then add the data
        res.status(201).send(response);
    } catch (error) {
        // If we could not add the data, tell the user
        res.status(500).send({message: error.message || 'An error occured while adding to the db.'});
    }
};

// Update a videogame entry
const updateVideoGameEntry = async (req, res) => {
    try {
        // Obtain the data id
        const id = req.params.id;
        // Get the replace data
        const replaceData = ({
            title: req.body.title,
            descript: req.body.descript,
            publisher: req.body.publisher,
            developer: req.body.developer,
            gameType: req.body.gameType,
            ageRating: req.body.ageRating,
            numOfPlayers: req.body.numOfPlayers
        });
        // Do a quick check to see if the entry
        // even is in the db at all
        const check = await Videogame.find( {_id : id} );

        // If nothing comes back, throw a 400 error
        if (!check.length) {
            res.status(400).send({message: `Cannot update videogame data because _id:${id} does not exsist in the collection.`});
        } else {
            // Now try to update the db entry
            const result = await Videogame.replaceOne(
                {_id : id}, 
                replaceData,
                // This will allow the mongoose schema to run
                // during an update action. For some reason
                // mongoose always makes this false on default
                // so we need to come in here and set it to true 
                {runValidators: true, context: replaceData}
            );
            // If everything worked send the res
            res.status(200).send({result});
        }
    } catch (error) {
        // If we cannot update because of connection issues
        res.status(500).send({message: error.message || 'An error occured while trying to update the entry.'});
    }
};

// Delete a videogame entry
const deleteVideoGameEntry = async (req, res) => {
    try {
        // Obtain the id
        const id = req.params.id;

        // Do a quick check to see if it is even in the db
        const check = await Videogame.find( {_id : id} );

        if (!check.length) {
            // Send the error
            res.status(400).send({message: `There is no videogame with the _id:${id} in the collection.`});
        } else {
            // If we are bigger than 0 then we can continue
            const result = await Videogame.deleteOne( {_id : id} );
            // If no errors happen send the res
            res.status(200).send(result);
        }
    } catch (error) {
        // If something goes wrong catch the error
        res.status(500).send({message: error.message || 'An error occured while trying to delete the entry.'});
    }
};


/** Exports **/
module.exports = {
    selectAll,
    selectByTitle,
    selectByType,
    createVideoGameEntry,
    updateVideoGameEntry,
    deleteVideoGameEntry
};