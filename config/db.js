//import libraries and frameworks
const mongoose = require('mongoose');
require('dotenv').config();

//make the connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch((error) => {console.log("oops! ", error)});