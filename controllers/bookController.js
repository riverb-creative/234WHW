/**-----------------------------
 * bookController.js 
 * 
 * define all the functions needed to interact with the book collection
 * in our database 
 * ----------------------------- */ 

const Book = require('../models/Book');

//get the whole collection of books
exports.getAllBooks = async (request, response) => {
    try {
        const books = await Book.find();
        response.status(200).json(books);
    }
    catch (errMsg) {
        response.status(500).json({ error: "Server error - " + errMsg });
    }
}

//get book by genre
exports.getBookByGenre = async(request, response) => {
    const theGenre = request.params.theGenre;
    if(theGenre) {
        try {
            const books = await Book.find({genre: theGenre});
            response.status(200).json(books);
        }
        catch (errMsg) {
            response.status(400).json({error: "No such genre or server error - " + errMsg});
        }
    }
}

//add a book
exports.addBook = async(request, response) => {
    const {title, author, genre, releaseDate, aveStars} = request.body;
    try {
        const bookResult = await Book.create({title, author, genre, releaseDate, aveStars});
        response.status(201).json({message: "success", bookAdded: bookResult});
    }
    catch (errMsg) {
        response.status(500).json({message: "failure", error: errMsg});
    }
}

//delete a book by id
exports.deleteBook = async(request, response) => {
    const theId = request.params.bookId;
    try {
        const bookResult = await Book.findByIdAndDelete(theId);
        response.status(200).json({message: "success", bookDeleted: bookResult});
    }
    catch (errMsg) {
        response.status(500).json({message: "failure", error: errMsg});
    }
}

//edit a book by id
exports.editBook = async(request, response) => {
    const theId = request.params.bookId;
    const updatedBook = request.body;
    console.log(updatedBook);
    try {
        const bookResult = await Book.findByIdAndUpdate(theId, updatedBook,
                                                    {new: true,       // return updated document
                                                     runValidators: true});
        response.status(200).json({message: "success", bookUpdated: bookResult});
    }
    catch (errMsg) {
        response.status(500).json({message: "failure", error: errMsg});
    }
}