const nodemailer = require("nodemailer");

const user = process.env.SEWF_SENDER_EMAIL;
const pass = process.env.SEWF_APP_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user,
        pass,
    },
});

const mailerBuilder = (options) => {
    const mailOptions = {
        from: user,
        ...options,
    };
    return (callback) => transporter.sendMail(mailOptions, callback);
};

module.exports = mailerBuilder;
