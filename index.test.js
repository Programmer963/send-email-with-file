const request = require("supertest");
const nodemailerMock = require("nodemailer-mock");
const express = require("express");
const bodyParser = require("body-parser");
const { sendMiddleware } = require("./middlewares");
const { sendController } = require("./controllers");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send", sendMiddleware, sendController);

describe("Email Sending Service", () => {
    beforeEach(() => {
        nodemailerMock.mock.reset();
    });

    test('should respond with 400 status code if "to" or "subject" is missing', async () => {
        const response = await request(app)
            .post("/send")
            .send({ text: "Hello World" });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Missing required fields");
    });

    test("should attach files and call next middleware", async () => {
        const mockFiles = [
            { originalname: "test.txt", buffer: "Sample content" },
        ];
        const mockReq = {
            body: {
                to: "example@example.com",
                subject: "Test Subject",
                text: "Hello World",
            },
            files: mockFiles,
        };
        const mockRes = {};
        const mockNext = jest.fn();

        sendMiddleware(mockReq, mockRes, mockNext);
        expect(mockReq.body.attachments).toBeDefined();
        expect(mockNext).toHaveBeenCalled();
    });

    test("should send an email and respond with success message", async () => {
        const sendMailMock = nodemailerMock.mock.getSentMail();
        const response = await request(app).post("/send").send({
            to: "example@example.com",
            subject: "Test Subject",
            text: "Hello World",
        });

        expect(sendMailMock.length).toBe(1);
        expect(sendMailMock[0].to).toBe("example@example.com");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Email sent");
    });

    test("should handle errors in sending emails", async () => {
        nodemailerMock.mock.setShouldFailOnce();

        const response = await request(app).post("/send").send({
            to: "example@example.com",
            subject: "Test Subject",
            text: "Hello World",
        });

        expect(response.statusCode).toBe(500);
        expect(response.text).toBe("Error sending email");
    });
});
