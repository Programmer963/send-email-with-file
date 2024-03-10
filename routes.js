const express = require("express");
const { sendMiddleware } = require("./middlewares");
const { sendController } = require("./controllers");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the email server!");
});

router.post("/send", sendMiddleware, sendController);

module.exports = router;
