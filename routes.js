const express = require("express");
const mailerBuilder = require("./mail-config");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the email server!");
});

router.post("/send", (req, res) => {
    const requestBody = req.body;
    const { to, subject, text } = requestBody;

    console.log("Sending email to: ", to, " subject: ", subject);

    const mailer = mailerBuilder({
        to,
        subject,
        text,
    });

    mailer((error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.send("Email sent");
        }
    });
});

module.exports = router;
