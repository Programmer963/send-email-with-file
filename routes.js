const express = require("express");
const mailerBuilder = require("./mail-config");
const router = express.Router();

function isDev() {
    return process.env.SEWF_DEBUG === "TRUE";
}

router.get("/", (req, res) => {
    res.send("Welcome to the email server!");
});

router.post("/send", (req, res) => {
    const requestBody = req.body;
    const { to, subject, text } = requestBody;

    if (isDev()) {
        console.log("Sending email to: ", to, " subject: ", subject);
    }

    const mailerOptions = {
        to,
        subject,
        text,
    };

    if (req.files && req.files.length > 0) {
        const attachments = [];
        req.files.forEach((file) => {
            attachments.push({
                filename: file.originalname,
                content: file.buffer,
            });
        });
        if (isDev()) {
            console.log("Attachments: ", attachments);
        }
        mailerOptions.attachments = attachments;
    }

    const mailer = mailerBuilder(mailerOptions);

    mailer((error, info) => {
        if (error) {
            res.status(500).send("Error sending email");
        } else {
            res.send("Email sent");
        }
        if (isDev()) {
            if (error) {
                console.error(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
    });
});

module.exports = router;
