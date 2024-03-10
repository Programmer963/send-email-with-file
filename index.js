const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = require("./routes");
const fileParser = require("express-multipart-file-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileParser);

app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
