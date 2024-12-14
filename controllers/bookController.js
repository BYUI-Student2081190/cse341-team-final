const bookModel = require('../models/Book');
const objectId = require('mongodb').ObjectId;

const controllers = {};

//GET
controllers.getBooks = async (req, res) => {
    //#swagger.tags=['Books']
    try { 
        const result = await bookModel.find();
        //console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error.message || 'An error occured getting books')
    }
};

controllers.getByTitle = async (req, res) => {
    //#swagger.tags=['Books']
    try{
        const bookTitle = req.params.title;
        const result = await bookModel.findOne({ title: bookTitle });

        if (!result) {
            res.status(404).json({message: 'Could not find the book title in the db.'});
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        };
    } catch(error) {
        res.status(500).json(error.message || 'Error: book not found')
    }
};

//POST         
controllers.addBook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        publisher: req.body.publisher,
        yearPublished: req.body.yearPublished,
        genre: req.body.genre
    };
    const response = await bookModel.insertMany(book);
    // const response = await bookModel.save(book)

    //check response
    if (response !== null) {
        res.status(201).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the book');
    }
};

//PUT 
controllers.updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new objectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        publisher: req.body.publisher,
        yearPublished: req.body.yearPublished,
        genre: req.body.genre
    };

    const response = await bookModel.replaceOne({ _id: bookId }, book);

    //check response
    if (response.modifiedCount > 0) {
        res.status(204).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book');
    }

};

//DELETE
controllers.deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new objectId(req.params.id);
    const response = await bookModel.deleteOne({ _id: bookId });

    //check response
    if (response.deletedCount > 0) {
        res.status(204).send(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book');
    }
};

module.exports = controllers;