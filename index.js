const express = require("express");
const app = express();
const router = require("./routes");
const fileParser = require("express-multipart-file-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileParser);

app.use(router);

const port = process.env.NODE_PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
