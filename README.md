# FormForge Mailer

![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D18-green)
![Version](https://img.shields.io/github/v/release/Eclipse-Forge/FormForge-Mailer)
![Status](https://img.shields.io/badge/status-stable-success)

![Security Policy](https://img.shields.io/badge/security-policy%20enabled-blue)
![Stateless Design](https://img.shields.io/badge/design-stateless-lightgrey)
![SMTP Compatible](https://img.shields.io/badge/email-SMTP%20compatible-orange)
![Made with Node](https://img.shields.io/badge/made%20with-Node.js-6DA55F)

A lightweight, stateless contact-form backend that converts website form submissions into email messages via any SMTP provider.

Designed for simple deployment on Render, Railway, Fly.io, Azure App Service, Docker, VPS hosting, or any Node.js environment.

---

## Overview

FormForge Mailer acts as a secure email relay between your website and your inbox.

Rather than exposing SMTP credentials in browser code, websites submit form data to FormForge Mailer. The service validates the request, applies anti-spam protections, generates a formatted email, and delivers it using a configured SMTP server.

The service is intentionally stateless. No submitted form data is stored in databases or retained after processing.

### Request Flow

```text
Website Visitor
       │
       ▼
 Website Form
       │
       ▼
FormForge Mailer
       │
       ▼
 SMTP Provider
       │
       ▼
 Destination Inbox
```

---

## Features

- Stateless design with no database requirements
- SMTP-compatible with virtually any mail provider
- Configurable destination mailbox
- Configurable SMTP sender account
- Automatic HTML email generation
- Reply-To support for direct responses
- Optional confirmation copy sent to the submitter
- Request size limiting
- Rate limiting
- CORS protection
- Optional anti-spam token validation
- Honeypot spam detection
- Environment-based configuration
- Suitable for serverless and container deployments

---

## Use Cases

### ✔ Website Contact Forms

Receive enquiries directly in your inbox without exposing SMTP credentials.

### ✔ Multi-Site Deployments

Run a single FormForge Mailer instance behind multiple websites.

### ✔ Small Business Websites

Perfect for brochure websites, portfolios, clubs, community groups, and local businesses.

### ✔ Serverless Deployments

Works well on modern cloud infrastructure with minimal resource usage.

---

## Security Features

FormForge Mailer includes several layers of basic abuse prevention:

- Configurable CORS restrictions
- Rate limiting by client IP
- Honeypot field detection
- Optional shared-secret form token
- Request size limits
- SMTP authentication
- HTML escaping and sanitisation

See [SECURITY.md](SECURITY.md) for full security information.

---

## Configuration

All configuration is managed through environment variables.

### Required Variables

```env
POST_PATH=/contact

CORS_ORIGIN=https://www.example.com

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false

SMTP_USER=website@example.com
SMTP_PASS=your-password

SMTP_FROM=website@example.com

EMAIL_DESTINATION=info@example.com
```

### Optional Variables

```env
FORM_TOKEN=your-secret-token

RATE_LIMIT_MINUTES=15
RATE_LIMIT_MAX=5

TIMEOUT=10000
GREET_TIMEOUT=10000
SOCKET_TIMEOUT=30000
```

See `.env.example` for a complete reference configuration.

---

## Example Request

```json
{
    "Subject": "Membership Enquiry",
    "Email": "john@example.com",
    "Name": "John Smith",
    "Message": "I'd like to learn more about joining."
}
```

Produces an email similar to:

```text
Name
John Smith

Email
john@example.com

Message
I'd like to learn more about joining.
```

---

## Deployment

FormForge Mailer can be deployed anywhere Node.js is supported.

Popular platforms include:

- Render
- Railway
- Fly.io
- Azure App Service
- Docker
- Self-hosted VPS environments

Deployment requires only:

- Node.js
- Environment variables
- SMTP credentials

No database is required.

---

## Contributing

Contributions are welcome.

Areas of particular interest include:

- Documentation improvements
- Additional anti-spam features
- Enhanced email templates
- Additional deployment examples
- Test coverage
- Accessibility improvements

Please review [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

---

## Licence

Licensed under the Apache License 2.0.

This license provides:

- Commercial use
- Modification
- Distribution
- Patent protection
- Private use

See [LICENSE](LICENSE) for full terms.

---

## Acknowledgements

This project uses:

- **Express**
- **Nodemailer**
- **Express Rate Limit**
- **CORS**

All dependencies are permissively licensed.

---

### Philosophy

FormForge Mailer exists to solve a simple problem:

> Accept a form submission, turn it into a well-formatted email, and deliver it securely using as little infrastructure as possible.