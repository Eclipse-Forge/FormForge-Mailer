# Deployment Guide

FormForge Mailer is designed to be simple to deploy and maintain.

The service is completely stateless and requires only:

- A Node.js host
- An SMTP account
- Environment variables
- A website capable of sending POST requests

No database, persistent storage, or external services are required.

---

## Prerequisites

Before deployment you will need:

- A hosting platform capable of running Node.js
- An SMTP provider
- An email address that will receive form submissions
- A configured `.env` file

See `.env.example` for all available configuration options.

---

## Basic Deployment

1. Clone or download the repository.
2. Copy `.env.example` to `.env`.
3. Configure your SMTP credentials and email destination.
4. Install dependencies:

```bash
npm install
```

5. Start the service:

```bash
npm start
```

The service will expose:

```text
POST  <POST_PATH>
GET   /health
```

---

## Website Integration

FormForge Mailer expects form submissions to be sent as JSON.

At minimum, forms should include:

```text
Subject
Email
```

Additional fields may be included and will be automatically added to the generated email.

Example:

```json
{
    "Subject": "General Enquiry",
    "Email": "user@example.com",
    "Name": "John Smith",
    "Message": "Hello world"
}
```

---

## Spam Protection

### Honeypot Field (Required)

All forms should include a hidden field named:

```html
<input
    type="text"
    name="sec"
    tabindex="-1"
    autocomplete="off"
    style="display:none;">
```

This field acts as a honeypot.

Legitimate users should never see or complete it. Many automated spam bots will populate all available fields, allowing FormForge Mailer to silently reject those submissions.

### Form Token (Optional)

If `FORM_TOKEN` is configured, include it as a hidden field:

```html
<input
    type="hidden"
    name="formToken"
    value="your-secret-token">
```

The submitted value must match the configured environment variable.

---

## Health Checks

A simple health endpoint is provided:

```text
GET /health
```

Expected response:

```json
{
    "status": "ok"
}
```

This can be used by load balancers, uptime monitors, and hosting providers.

---

## Render Deployment

FormForge Mailer works well on Render.

### Create a Web Service

1. Create a new **Web Service**.
2. "Public Git Repository", paste: https://github.com/Eclipse-Forge/FormForge-Mailer and select the "master" branch
3. Import environment from env.example to customise on render, or upload your own .env
4. Set re-deploy policy
5. Deploy

You can also fork this repo to maintain more consistancy and ensure you have control over deploys. However, we will only push working builds to master, everything else will be placed in seperate branches, so using our repo will ensure it's updated securely.

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

Render will automatically:

- Install dependencies
- Build the service
- Start the application
- Provide HTTPS
- Restart the service if it crashes

---

## Updating

To update an existing deployment:

```bash
git pull
npm install
npm start
```

Or simply push changes to the connected Git repository and allow your hosting platform to redeploy automatically.

---

## Troubleshooting

### Form submissions are failing

Check:

- SMTP credentials
- SMTP host and port
- Firewall restrictions
- Destination email address

### Requests are rejected

Check:

- `CORS_ORIGIN`
- `POST_PATH`
- `FORM_TOKEN` configuration
- Rate limiting settings

### Emails are not received

Check:

- Spam folders
- SPF / DKIM / DMARC configuration
- SMTP provider logs

---

## Design Philosophy

FormForge Mailer is intentionally:

- Stateless
- Lightweight
- Easy to audit
- Easy to deploy
- SMTP-provider agnostic

If your deployment requires databases, queues, persistent storage, or complex infrastructure, you are probably overcomplicating the intended use case.