/** -------------------
 * Book.js
 * 
 * defines the Mongoose schema for book objects in the books collection
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {type: String,
                required: true
        },
        author: {type: String,
                required: true
        },
        genre: {type: Array},
        releaseDate: {type: Date},
        aveStars: {type: Number,
                   default: 0
        }
    }
);

module.exports = mongoose.model("Book", bookSchema);