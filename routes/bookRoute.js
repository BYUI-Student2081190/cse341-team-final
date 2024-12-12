/** Required Variables **/
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController')

/** Routes **/
// Change this how you need it to talk to the controller
//router.get('/', (req, res) => { res.json({ message: 'Books!' }) });


// Get all books in the db
router.get('/', controller.getBooks);
// Find the book by title
router.get('/title/:title', controller.getByTitle);


// Add a new book
router.post('/', controller.addBook);

// Update a book using bookId
router.put('/:id', controller.updateBook);

// Delete a book using bookId
router.delete('/:id', controller.deleteBook);

/** Export **/
module.exports = router;