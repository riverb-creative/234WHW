/** -----------------------
 * userRouter.js
 * 
 * define the routes (method + path) the api responds to.
 * note that each path defined here assumes that /users has been typed in
 */

//imports
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book = require('../models/Book');
const bookController = require('../controllers/bookController');

//method    =   GET
//path      =   http://localhost:3000/books
//response  =   full list of all books in collection
router.get("/", (request, response) => {
    bookController.getAllBooks(request, response);
});

//method    =   GET
//path      =   http://localhost:3000/books/:theGenre
//response  =   book data for the document that matches the genre
router.get("/:theGenre", bookController.getBookByGenre);

//method    =   POST
//path      =   http://localhost:3000/books
//response  =   add user data to collection and return success message
router.post("/", bookController.addBook);

//method    =   DELETE
//path      =   http://localhost:3000/books
//response  =   remove book data from collection and return success message
router.delete("/:bookId", (request, response) => {
    bookController.deleteBook(request, response)
});

//method    =   PUT
//path      =   http://localhost:3000/books
//response  =   edit book data in collection and return success message
router.put("/:bookId", bookController.editBook);

module.exports = router;