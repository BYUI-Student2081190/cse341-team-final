const userModel = require('../models/user');
const objectId = require('mongodb').ObjectId;

const controllers = {};

//GET
controllers.getUsers = async (req, res) => {
    //#swagger.tags=['users']
    const result = await userModel.find();
    //console.log(result);
    if (result !== null) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result)

    } else {
        res.status(500).json(result.error || 'An error occured getting users')
    }
};

controllers.getOneUser = async (req, res) => {
    //#swagger.tags=['users']
    const userId = req.params.id;
    const result = await userModel.find({ _id: userId });

    if (result !== null) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } else {
        res.status(500).json(result.error || 'Error: user not found')
    }

}

//POST         
controllers.addUser = async (req, res) => {
    //#swagger.tags=['users']
    const user = {
        username: req.body.username,
        favColor: req.body.favColor,
        bio: req.body.bio
    };
    const response = await userModel.insertMany(user);
    // const response = await userModel.save(user)

    //check response
    if (response !== null) {
        res.status(201).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the user');
    }
}

//PUT 
controllers.updateUser = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new objectId(req.params.id);
    const user = {
        username: req.body.username,
        favColor: req.body.favColor,
        bio: req.body.bio
    };

    const response = await userModel.replaceOne({ _id: userId }, user);

    //check response
    if (response.modifiedCount > 0) {
        res.status(204).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }

}

//DELETE
controllers.deleteUser = async (req, res) => {
    //#swagger.tags=['users']
    const userId = new objectId(req.params.id);
    const response = await userModel.deleteOne({ _id: userId });

    //check response
    if (response.deletedCount > 0) {
        res.status(204).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
}

module.exports = controllers;