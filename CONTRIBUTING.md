# Contributing to FormForge Mailer

Thank you for your interest in contributing.

FormForge Mailer is intentionally lightweight, stateless, and easy to audit. Contributions that improve security, reliability, maintainability, documentation, or usability are especially welcome.

---

## 🧭 How to Contribute

### 1. Fork & Branch

- Fork the repository to your own GitHub account.
- Create a feature branch with a clear and descriptive name.

Examples:

```text
feat/html-email-templates
feat/custom-response-messages
feat/multi-recipient-support

fix/token-validation
fix/email-escaping
fix/rate-limit-behaviour

docs/readme-improvements
docs/security-clarifications
```

### 2. Make Your Changes

Please keep contributions focused and easy to review.

When contributing:

- Keep changes small and atomic.
- Update documentation when behaviour changes.
- Add comments where logic may not be immediately obvious.
- Avoid introducing unnecessary dependencies.
- Ensure no secrets, passwords, tokens, or credentials appear in commits.

### 3. Submit a Pull Request

To maintain project integrity and contributor authenticity, all pull requests must contain verified commits.

Your PR must be signed using one of the following methods:

- **Verified SSH-signed commits**
- **GitHub Web UI commits** (automatically verified by GitHub)

Unverified commits may be rejected.

### 4. Pull Request Requirements

Please include:

- A clear description of the change
- The reason for the change
- Any associated issue numbers
- Reproduction steps for bug fixes
- Testing notes where applicable

Keep pull requests focused. Large changes may be requested to be split into smaller contributions.

---

## 🧩 Coding Standards

### JavaScript / Node.js

This project uses modern JavaScript and ES Modules.

Example:

```js
import express from 'express';
import nodemailer from 'nodemailer';
```

General guidelines:

- Prefer ES Module syntax (`import` / `export`)
- Prefer async/await over Promise chains
- Keep functions concise and readable
- Prioritise clarity over cleverness
- Avoid unnecessary abstractions
- Avoid unnecessary dependencies
- Use descriptive variable and function names

### Error Handling

- Fail clearly and predictably.
- Return appropriate HTTP status codes.
- Log useful diagnostic information.
- Never expose credentials, tokens, secrets, or sensitive configuration values.

### Security

Security is a primary concern for this project.

Contributions should:

- Validate user-controlled input where appropriate.
- Preserve anti-spam protections.
- Protect SMTP credentials and configuration.
- Avoid introducing open relay behaviour.
- Prevent email header injection vulnerabilities.
- Avoid exposing environment variables or internal configuration data.

Please review SECURITY.md before submitting security-related changes.

---

## 🏗 Project Philosophy

FormForge Mailer is intentionally:

- **Stateless**
- **Simple**
- **Auditable**
- **Easy to Deploy**
- **SMTP-Provider Agnostic**

Please avoid introducing:

- Databases
- Persistent storage requirements
- Heavy frameworks
- Complex infrastructure dependencies
- Features that significantly increase deployment complexity

The goal is simple:

> Receive trusted form submissions, transform them into well-formatted emails, and deliver them securely with minimal infrastructure.

---

## 🧪 Testing

Changes affecting any of the following should be tested thoroughly:

- Email generation
- HTML rendering
- Form processing
- SMTP communication
- Rate limiting
- Token validation
- Honeypot behaviour
- Request validation
- Security controls

Where practical, include testing or reproduction steps in your pull request.

---

## 📄 Licensing

By contributing to FormForge Mailer, you agree that your contributions will be licensed under the same Apache-2.0 License as the rest of the project.

---

## 🤝 Thank You

Whether you're fixing a typo, reporting an issue, or contributing a new feature, your time and effort help keep FormForge Mailer secure, reliable, and easy for others to deploy.