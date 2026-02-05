# CS 234W - Such Catchy Book Review App
## Author: River
### Date: 02/04/2026

**Description:** CS 234W Homework | Implementing integration testing with Jest & Supertest

Dependencies & How To Install Them: 
>    - express 
>        - npm install express
>    - express-validator
>         - npm install express-validator
>    - dotenv
>         - npm install dotenv
>    - mongoose
>         - npm install mongoose
>    - bcrypt
>         - npm install bcrypt
>    - express-rate-limit
>         - npm install express-rate-limit
>    - helmet
>         - npm install helmet
>    - jsonwebtoken
>         - npm install jsonwebtoken
>    - jest
>         - npm install jest
>    - supertest
>         - npm install supertest
>    - mongodb-memory-server
>         - npm install mongodb-memory-server

> [!IMPORTANT]
> Instructions to run server with URLs to test routes:
> 1. Create clone of 234W repository from GitHub
> 2. Initialize node.js with _npm init_
> 3. Install dependencies in node_modules folder with _npm install_
> 4. Install Express with _npm install express_
> 5. Install ejs with _npm install express-validator_
> 6. Install dotenv with _npm install dotenv_
> 7. Install mongoose with _npm install mongoose_
> 8. To run the server and test it type _run node server.js_ or _npm start_
> 9. Open your browser and type _http://localhost:3000_ into the URL to get to the root route
>       * You will see a json message of _Welcome to Such Catchy Book Review App!_
> 11. To see all the books in the database type _http://localhost:3000/books_ into the URL to get to the root route
>     * You will again see a json message with all the books that have been added to the database
> 12. To see all books for a specific genre type _http://localhost:3000/books/TheGenreYouWant_ into the URL of your browser
>     * Ex. _http://localhost:3000/books/Fantasy_
>       * You will see a json message with all the books that have a genre of _Fantasy_ 

> [!NOTE]
> How to test the POST method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to POST
   > 5. Change the URL _http://localhost:3000/books_
   > 6. In the _Headers_ tab, enter _Content-Type_ in the header section and _application/json_ in the value section
   > 7. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed:\
>    `{
>       "title": "test",`\
>      ` "author": "test",`\
>      ` "genre":`\
>          `[`\
              `"Horror",`\
              `"Fantasy"`\
>       `],`\
>       `"releaseDate": "2019-10-30T00:00:00.000Z",`\
>       `"aveStars": 9`\
>      ` }`\
>          **The title and author fields are required**
   > 8. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been updated
   > 9. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been added

> [!NOTE]
> How to test the PUT method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to PUT
   > 5. Change the URL _http://localhost:3000/books/TheBookIdYouWantToUpdate_
   >       * The book ID will be listed in the json message when you access _http://localhost:3000/books_
   >          * Example of book ID: _6965a84c45dc2b161d08098c_
   > 6. In the _Headers_ tab, enter _Content-Type_ in the header section and _application/json_ in the value section
   > 7. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed below:\
>    `{
>       "title": "updated test",`\
>      ` "author": "updated test",`\
>      ` "genre":`\
>          `[`\
              `"Paranormal",`\
              `"Horror",`\
              `"Fantasy"`\
>       `],`\
>       `"releaseDate": "2019-10-30T00:00:00.000Z",`\
>       `"aveStars": 9`\
>      ` }`\
>          **The title and author fields are required**
   > 8. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been updated
   > 9. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been updated

> [!NOTE]
> How to test the DELETE method:
   > 1. Install the extension _Thunder Client_ in Visual Studio Code
   > 2. Make sure the server is started
   > 3. Create a new request
   > 4. Change the method to DELETE
   > 5. Change the URL _http://localhost:3000/books/TheBookIdYouWantToUpdate_
>       * The book ID will be listed in the json message when you access _http://localhost:3000/books_
>            * Example of book ID: _6965a84c45dc2b161d08098c_
   > 6. In the _Headers_ tab, make sure the _Content-Type_ in the header section and _application/json_ in the value section are **NOT** selected
   >     * If you want to include the _Content-Type_ in the header section and _application/json_ in the value section just make sure that there is valid JSON data in the             body tab in ThunderClient or else it won't work!
   > 8. Click the _Send_ button, you will get a response that the book related to the Id you entered in the URL has been deleted
   > 9. Go to _http://localhost:3000/books_ in the browser to check that the book you selected has been deleted

> Security Best-Practices Demonstrated
   > * Environment variables for secrets used for JSON Web Token and Mongo DB Atlas
   > * Using Helmet middleware to set security-related HTTP response headers
   > * Input validation used on router of apiUsers (add user, & edit user) and apiBooks (delete book)
   > * The use of proper HTTP status codes: 200, 201, 400, 401, 409, & 500
   > * Avoiding the inclusion of sensitive data in responses: passwords not shown in responses

> Protected Routes:
   > * apiBooks route is protected by using the jsonwebtoken, so only authorized users can delete a book by its Book ID
   > * Both apiBooks and apiUsers routes are protected with express-validator dependencies with the _.escape()_ option in order to sanitize any text that has HTML mark up characters.

> [!IMPORTANT]
> Instructions on how to register user:
> 1. Create clone of 234W repository from GitHub
> 2. Initialize node.js with _npm init_
> 3. If needed install all dependecies listed above
> 4. To run the server and test it type _run node server.js_ or _npm start_
> 5. Install the extension _Thunder Client_ in Visual Studio Code
> 6. Make sure the server is started
> 7. Create a new request
> 8. Change the method to POST
> 9. Change the URL _http://localhost:3000/users_
> 10. In the _Headers_ tab, enter _Content-Type_ in the header section and _application/json_ in the value section
> 11. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed for a successful response:\
>    `{
>       "userName": "test",`\
>      ` "email": "test@gmail.com",`\
>      ` "password":Il0vepasswords!`\
>      ` }`\
>           * The userName, email, and password fields are required
>           * Password needs to be:
>              * Minimum of 12 characters
>              * At least ONE uppercase letter
>              * At least ONE lowercase letter
>              * At least ONE number
>              * At least ONE special character: _! @ # $ % ^ & * ( )_
> 12. Click the _Send_ button, you will get a response that the user added was successful
> 13. Go to _http://localhost:3000/users_ in the browser to check that the user you registered has been added
> 14. To get an unsuccessful response follow steps 1 through 10 if anything was changed
> 11. Go to the _Body_ tab, make sure it is on _JSON_ and enter something similar to what is listed for a unsuccessful response:\
>    `{
>       "userName": "test2",`\
>      ` "email": "test2@gmail.com",`\
>      ` "password":passw0rd`\
>      ` }`\
>          * The userName, email, and password fields are required
>           * Since the password is:
>              *  Less than 12 characters: an error response will appear with error message
>              * No uppercase letters: an error response will appear with error message
>              * No special characters: an error response will appear with an error message

> [!IMPORTANT]
> Error Handling HTTP Codes used in bookController.test.js & userController.test.js :
> 1. 200, 201, 400, 401, and 500

> [!IMPORTANT]
>  Instructions to test bookController.test.js:
> 1. Open the terminal and run _npx jest bookController.test.js_
>        *This will only run the bookController.test.js
> 2. To test both files you can run _npm test_
> 3. The first test in bookController.test.js tests _that the bookId DOES NOT exist_, if the book id does not exist it will send a 500 HTTP Code
> 4. The first test in bookController.test.js tests _that the bookId exists and it is deleted_, the test must first create a new book object, which then checks that it exists and sends a 201 HTTP code it then accesses the bookId and requests that this bookId be deleted and when it is deleted it will send a 200 HTTP code.

> [!IMPORTANT]
>  Instructions to test userController.test.js:
> 1. Open the terminal and run _npx jest userController.test.js_
>        *This will only run the userController.test.js
> 2. To test both files run _npm test_
> 3. The first test in userController.test.js tests _that new user is created_, if the user is unique and has all the required fields (usereName, email, and password) it will send a 200 HTTP code
> 4. The second to fourth test in userController.test.js tests the unsuccessful users that are missing data including, but not limited to:
>        * required fields of userName, email & password
>        * password must haves:
>                 * minimum of 12 character 
>                 * at least ONE uppercase
>                 * at least ONE lowercase
>                 * at least ONE digit
>                 * at least ONE special character _! @ # $ % ^ & * ( )_
> 5. The fifth test verifies _that username exist_ and if so it will send the 200 HTTP code
> 6. The sixth test verifies _that userName exists and password is correct for login_, the test first creates a new user info (userName, email, and password) if it is unique it will send a 201 HTTP code. The test then checks if the newly created userName and password exists, if it does it sends 201 HTTP code
> 7. The seventh test verifies _the userName does not exist for login_, if it does not exist send a 401 HTTP code
> 8. The seventh test verifies _the username exists and password is incorrect for login_, if it does not exist send a 401 HTTP code