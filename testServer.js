const express = require('express');
const app = express();

app.use(express.json());

app.use("/users", require("./routes/apiUsers"));
app.use("/books", require("./routes/apiBooks"));

module.exports = app;