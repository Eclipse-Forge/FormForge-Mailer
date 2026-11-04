// App Setup
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();


// Environment configuration
const PORT = process.env.PORT || 3000;
const POST_PATH = process.env.POST_PATH;

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const SMTP_CONFIG = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    connectionTimeout: parseInt(process.env.TIMEOUT),
    greetingTimeout: parseInt(process.env.GREET_TIMEOUT),
    socketTimeout: parseInt(process.env.SOCKET_TIMEOUT)
};

const SMTP_FROM = process.env.SMTP_FROM;
const DESTINATION = process.env.EMAIL_DESTINATION;

const debug = process.env.DEBUG || false;

// Validate required configuration
if (
    !DESTINATION ||
    !SMTP_CONFIG.host ||
    !SMTP_CONFIG.auth.user ||
    !SMTP_CONFIG.auth.pass ||
    !CORS_ORIGIN ||
    !POST_PATH
) {
    console.error(
        'Missing required environment variables. Check: EMAIL_DESTINATION, SMTP_HOST, SMTP_USER, SMTP_PASS, CORS_ORIGIN, POST_PATH'
    );
    process.exit(1);
}

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_MINUTES || `15`) * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || `5`),
    standardHeaders: true,
    legacyHeaders: false
});

// Middleware
app.use(cors({
    origin: CORS_ORIGIN,
    methods: [`POST`, `GET`],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({
    limit: '25kb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '25kb'
}));

app.use(POST_PATH, limiter);

// SMTP transport
const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Removes any formatting attempts from the submitted content to ensure it formats correctly in email
const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, '<br>');

// Contact form endpoint
app.post(POST_PATH, async (req, res) => {
    // Debug Mode
    if (debug) {
        console.log(`Headers: ${req.headers}
            Body: ${req.body}`);
    }

    // Honeypot field
    if (req.body.sec) {
        return res.sendStatus(403);
    }

    // Optional secret token
    else if (process.env.FORM_TOKEN && req.body.formToken !== process.env.FORM_TOKEN) {
        return res.sendStatus(403);
    }

    // Additional origin check
    else if (req.headers.origin && req.headers.origin !== CORS_ORIGIN) {
        return res.sendStatus(401);
    }

    try {
        const fields = Object.entries(req.body);

        // Supports both capitalised and uncapitalised field names
        const subjectValue = req.body.Subject || req.body.subject;
        const emailValue = req.body.Email || req.body.email;

        // let bodyContent = '';
        let htmlContent = ``;

        for (const [key, value] of fields) {
            // Ignore anti-spam fields
            if (key === 'sec' || key === 'formToken') {
                continue;
            }
            
            // bodyContent += `${key}\n${value}\n\n`;
            htmlContent += `
                <p>
                    <strong>${escapeHtml(key)}</strong><br>
                    ${escapeHtml(value)}
                </p>`
        }

        const mailOptions = {
            from: SMTP_FROM,
            to: DESTINATION,
            replyTo: emailValue || undefined,
            cc: emailValue || undefined,

            subject: `[Website Contact] ${subjectValue || 'No Subject Provided'}`,
            html: htmlContent
            // text: bodyContent.trim()
        };

        const info = await transporter.sendMail(mailOptions);
        // Add transparency logging to make issues visible
        console.log(`Message Sent:
            ${info}`)

        return res.status(200).json({
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error({
            message: error.message,
            code: error.code,
            response: error.response
        });

        return res.status(500).json({
            message: 'Failed to send email'
        });
    }
});

// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`POST endpoint: ${POST_PATH}`);
    console.log(`Email destination: ${DESTINATION}`);
    console.log(`SMTP host: ${SMTP_CONFIG.host}:${SMTP_CONFIG.port}`);
});