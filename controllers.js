const mailerBuilder = require("./mail-config");
const logger = require("./utils");

const sendController = (req, res) => {
    const requestBody = req.body;
    const { to, subject, text, attachments } = requestBody;

    const mailerOptions = {
        to,
        subject,
        text,
        attachments,
    };

    const mailer = mailerBuilder(mailerOptions);

    mailer((error, info) => {
        if (error) {
            res.status(500).send("Error sending email");
            logger(error, "error");
        } else {
            res.send("Email sent");
            logger("Email sent: " + info.response);
        }
    });
};

module.exports = { sendController };
