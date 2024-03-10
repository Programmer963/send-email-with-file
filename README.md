# Send email with file

This is an example Express.js application that provides an email sending service. Many email apps don't provide file attachments for free. So I've created free solution.

## Warning

-   Provider is Gmail, used [app password](https://support.google.com/mail/answer/185833?hl=en)
-   Deployment is configured for [vercel](https://vercel.com/)
-   Maximum attachments size is 4.5 MB, if the app is deployed on [vercel serverless functions](https://vercel.com/guides/how-to-bypass-vercel-body-size-limit-serverless-functions)
-   You can manually deploy it to increase size limit to 10 MB

## Getting Started

### Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/guinnod/send-email-with-file.git
cd send-email-with-file.git
```

### Install Dependencies

Install the required packages using npm:

```bash
npm install
```

### Configure Environment Variables

Before running the the app, you'll need to set up the necessary environment variables by creating a `.env` file in the project directory.
You can use the provided [.env.example](.env.example) as a template.
Copy and rename it to `.env`, then edit it to include your specific configuration.

```bash
cp example.env .env
```

Edit the `.env` file to include the required values for your application.

You can enable logging setting `SEWF_LOGGING_ENABLE = TRUE`.
`SEWF` (send email with file) prefix is used to avoid collision of environment variables.

### Running the App

You can run the app using npm.

```bash
# development mode
npm run dev

# Production mode
npm run start
```

The app will be accessible at [http://localhost:8080](http://localhost:8080).

## Usage

To send an email, make a POST request to the `/send` endpoint with the following form data parameters:

| Field                             | Type   | Required | Description                                                                   |
| --------------------------------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `to`                              | string | Yes      | The recipient's email address.                                                |
| `subject`                         | string | Yes      | The subject line of the email.                                                |
| `text`                            | string | No       | The plaintext content of the email.                                           |
| Other                             | -      | No       | Any other attributes that [nodemailer](https://nodemailer.com/smtp/) accepts. |
| Attachments directly in form data | file   | No       | Attach files directly to the form data if you want to send attachments.       |
