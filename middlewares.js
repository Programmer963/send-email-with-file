const sendMiddleware = (req, res, next) => {
    if (!req.body.to || !req.body.subject) {
        return res.status(400).send("Missing required fields");
    }

    if (req.files && req.files.length > 0) {
        const attachments = [];
        req.files.forEach((file) => {
            attachments.push({
                filename: file.originalname,
                content: file.buffer,
            });
        });
        req.body.attachments = attachments;
    }

    next();
};

module.exports = { sendMiddleware };
