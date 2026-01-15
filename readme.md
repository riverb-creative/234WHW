# CS 234W - Such Catchy Book Review App
## Author: River
### Date: 01/14/2026

**Description:** CS 234W Term Project | building a book review Express API that connects to an external data store and demonstrates basic CRUD functionality

Dependencies & How To Install Them: 
>    - express 
        > - npm install express
>    - express-validator
        > - npm install express-validator
>    - dotenv
        > - npm install dotenv
>    - mongoose
        > - npm install mongoose


> [!IMPORTANT]
> Instructions to run server with URLs to test routes:
> 1. Create clone of 234W repository from GitHub
> 2. Initialize node.js with _npm init_
> 3. Install dependencies in node_modules folder with _npm install_
> 4. Install Express with _npm install express_
> 7. Install ejs with _npm install express-validator_
> 8. Install dotenv with _npm install dotenv_
> 9. Install mongoose with _npm install mongoose_
> 10. To run the server and test it type _run node server.js_ or _npm start_
> 11. Open your browser and type _http://localhost:3000_ into the URL to get to the root route
    > - You will see a json message of _Welcome to Such Catchy Book Review App!_
> 12. To see all the books in the database type _http://localhost:3000/books_ into the URL to get to the root route
    > - You will again see a json message with all the books that have been added to the database
> 13. To see all books for a specific genre type _http://localhost:3000/books/TheGenreYouWant_ into the URL to get to the root route
    > - Ex. _http://localhost:3000/books/Fantasy_
        > - You will see a json message with all the books that have a genre of _Fantasy_ 

> [!NOTE]
> How to test the POST method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to POST
   > 5. Change the URL _http://localhost:3000/books_
   > 6. In the _Headers_ tab, enter _Content-Type_ in the header section and _application/json_ in the value section
   > 7. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed below:
        >   {
            >   "title": "test",
            >   "author": "test",
            >   "genre": 
                >   [
                    >   "Paranormal",
                    >   "Horror",
                    >   "Fantasy"
                >   ],
            >   "releaseDate": "2019-10-30T00:00:00.000Z",
            >   "aveStars": 9
        >   }
        > - The title and author fields are required 
    > 8. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been updated
    > 9. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been added

> [!NOTE]
> How to test the PUT method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to PUT
   > 5. Change the URL _http://localhost:3000/books/TheBookIdYouWantToUpdate_
        > - The book ID will be listed in the json message when you access _http://localhost:3000/books_
            > - Example of book ID: _6965a84c45dc2b161d08098c_
   > 6. In the _Headers_ tab, enter _Content-Type_ in the header section and _application/json_ in the value section
   > 7. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed below:
        >   {
            >   "title": "updated test",
            >   "author": "updated test",
            >   "genre": 
                >   [
                    >   "Paranormal",
                    >   "Horror"
                >   ],
            >   "releaseDate": "2020-10-30T00:00:00.000Z",
            >   "aveStars": 8
        >   }
        > - The title and author fields are required 
    > 8. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been updated
    > 9. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been updated

> [!NOTE]
> How to test the DELETE method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to DELETE
   > 5. Change the URL _http://localhost:3000/books/TheBookIdYouWantToUpdate_
        > - The book ID will be listed in the json message when you access _http://localhost:3000/books_
            > - Example of book ID: _6965a84c45dc2b161d08098c_
   > 6. In the _Headers_ tab, make sure the _Content-Type_ in the header section and _application/json_ in the value section are **NOT** selected
   > 7. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been deleted
   > 8. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been deleted