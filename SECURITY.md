# Security Policy

FormForge Mailer is a lightweight, stateless mail relay that accepts structured form submissions from trusted websites and converts them into email messages using a configured SMTP service.

Security is a core design goal of the project, and we appreciate responsible disclosure of any vulnerabilities.

---

## 🔐 Reporting a Vulnerability

This project uses **GitHub's built-in private security reporting system**.

If you discover a vulnerability:

1. Go to the repository's **Security** tab.
2. Select **"Report a vulnerability"**.
3. Submit a private advisory including:
   - A clear description of the issue
   - Steps to reproduce
   - Potential impact
   - Suggested mitigations or fixes (if known)

Your report will be visible **only to project maintainers** until it has been reviewed and resolved.

Please **do not** create public issues for security-related reports.

---

## 🛠 Supported Versions

Only the **latest commit on `master`** is actively supported.

Security fixes may not be backported to older versions.

---

## 🧭 Security Model

FormForge Mailer is designed to minimise abuse while remaining simple to deploy.

Current security controls include:

- Configurable CORS origin restrictions
- Optional shared-secret form tokens
- Honeypot spam-field detection
- Request size limits
- Rate limiting per client IP
- SMTP authentication via environment variables
- Environment-based configuration for sensitive values
- HTML output sanitisation to help prevent content injection

The service is intentionally stateless and does not store submitted form data after processing.

---

## 🎯 Scope

We are primarily concerned with:

- Authentication or authorisation bypasses
- Abuse of the mail relay functionality
- SMTP credential exposure
- Email header injection
- CORS bypasses that enable unauthorised usage
- Form token bypasses
- Honeypot or rate-limiting bypasses
- Denial-of-service vectors
- Content injection vulnerabilities within generated emails
- Leakage of sensitive configuration or environment variables
- Remote code execution or arbitrary file access vulnerabilities

Out of scope:

- Misconfigured SMTP providers
- Weak or compromised SMTP credentials
- Incorrect DNS, SPF, DKIM, or DMARC configuration
- Abuse originating from trusted websites that are intentionally allowed to use the service
- Vulnerabilities within third-party dependencies that have already been disclosed upstream
- Availability failures caused by cloud providers, mail providers, or network outages

---

## ⚠ Deployment Requirements

FormForge Mailer assumes the deployment environment is configured securely.

Operators should:

- Use strong SMTP credentials
- Store all secrets in environment variables
- Enable SPF, DKIM, and DMARC where supported
- Restrict CORS origins to trusted websites only
- Configure an appropriate rate limit for expected traffic
- Keep dependencies updated
- Run behind HTTPS only

Failure to follow these recommendations may weaken the overall security of the deployment.

---

## 🤝 Responsible Disclosure

We will:

- Acknowledge valid reports promptly
- Work with researchers to understand and verify findings
- Develop and release fixes where appropriate
- Credit researchers in security advisories (optional)

We ask that researchers:

- Avoid accessing, modifying, or deleting data belonging to others
- Avoid disrupting public services
- Provide sufficient information for reproduction
- Give maintainers reasonable time to investigate and address issues before public disclosure

Thank you for helping keep FormForge Mailer secure.