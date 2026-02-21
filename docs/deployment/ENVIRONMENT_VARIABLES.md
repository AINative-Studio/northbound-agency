# Environment Variables Configuration

## Overview

This guide provides comprehensive instructions for configuring environment variables for the Blaq Digital platform, with a focus on the Resend API integration for the contact form email service and other critical services.

**IMPORTANT SECURITY WARNING**: Never commit actual API keys, passwords, or sensitive credentials to version control. Always use `.env.local` for local development and secure environment variable management in production.

## Table of Contents

1. [Overview](#overview)
2. [Environment Files Structure](#environment-files-structure)
3. [Resend API Configuration](#resend-api-configuration)
4. [ZeroDB/AINative API Configuration](#zerodbainative-api-configuration)
5. [Local Development Setup](#local-development-setup)
6. [Railway Production Setup](#railway-production-setup)
7. [Verification Steps](#verification-steps)
8. [Troubleshooting](#troubleshooting)
9. [Security Best Practices](#security-best-practices)
10. [Environment Variables Reference](#environment-variables-reference)

---

## Environment Files Structure

The project uses the following environment file structure:

- **`.env.example`**: Template file with all required variables (committed to git)
- **`.env`**: Default environment variables (currently committed, contains defaults)
- **`.env.local`**: Local development overrides (gitignored, NOT committed)
- **`.env.production`**: Production-specific variables (optional, gitignored)

### File Priority

Next.js loads environment variables in the following order (later files override earlier ones):

1. `.env`
2. `.env.local`
3. `.env.development` or `.env.production` (based on NODE_ENV)
4. `.env.development.local` or `.env.production.local`

---

## Resend API Configuration

### What is Resend?

[Resend](https://resend.com) is a modern email API service designed for developers. It provides a simple, reliable way to send transactional emails with excellent deliverability.

### Obtaining a Resend API Key

1. **Sign Up for Resend**
   - Navigate to [https://resend.com](https://resend.com)
   - Click "Sign Up" or "Get Started"
   - Create an account using your email address or GitHub

2. **Create an API Key**
   - Log into the Resend dashboard
   - Navigate to "API Keys" in the sidebar
   - Click "Create API Key"
   - Enter a name for your key (e.g., "Blaq Digital Development" or "Blaq Digital Production")
   - Select appropriate permissions:
     - **Development**: Full access (for testing)
     - **Production**: Sending access (recommended for security)
   - Click "Create"

3. **Copy and Securely Store the API Key**
   - **IMPORTANT**: The API key is only displayed once
   - Copy it immediately to a secure location
   - Add it to your `.env.local` file (local) or Railway dashboard (production)

### Resend Environment Variables

```bash
# Required for email sending functionality
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email configuration (optional - has defaults)
CONTACT_EMAIL_TO=contact@blaqdigital.com
CONTACT_EMAIL_FROM=noreply@blaqdigital.com
```

### Domain Verification (Production)

For production use, you should verify your domain with Resend:

1. Go to the Resend dashboard → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `blaqdigital.com`)
4. Add the provided DNS records to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (recommended)
5. Wait for verification (usually 15-30 minutes)
6. Update `CONTACT_EMAIL_FROM` to use your verified domain

**Example with verified domain**:
```bash
CONTACT_EMAIL_FROM=noreply@blaqdigital.com
```

---

## ZeroDB/AINative API Configuration

### Overview

ZeroDB (AINative) is the backend API service providing database, authentication, and AI capabilities for the platform.

### Required Variables

```bash
# Server-side authentication (never exposed to browser)
ZERODB_USERNAME=your_admin_email@example.com
ZERODB_PASSWORD=your_secure_password
ZERODB_API_URL=https://api.ainative.studio/
ZERODB_API_TOKEN=your_api_token

# Legacy compatibility aliases
AINATIVE_USERNAME=your_admin_email@example.com
AINATIVE_PASSWORD=your_secure_password
AINATIVE_API_URL=https://api.ainative.studio/
AINATIVE_API_TOKEN=your_api_token

# Client-side public variables (exposed to browser)
NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
NEXT_PUBLIC_AINATIVE_API_KEY=your_public_api_key
NEXT_PUBLIC_ZERODB_PROJECT_ID=blaq-digital-prod
```

### Obtaining ZeroDB Credentials

1. Contact your ZeroDB/AINative administrator
2. Request project credentials for Blaq Digital
3. Receive:
   - Username/email
   - Password
   - API token
   - Project ID

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd blaq_digital
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create `.env.local` File

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Step 4: Configure Environment Variables

Edit `.env.local` and add your actual credentials:

```bash
# ZeroDB/AINative Configuration
ZERODB_USERNAME=your_admin_email@example.com
ZERODB_PASSWORD=your_secure_password
ZERODB_API_URL=https://api.ainative.studio/
ZERODB_API_TOKEN=your_actual_token_here

# Resend API (Development)
RESEND_API_KEY=re_your_development_api_key_here

# Email Configuration
CONTACT_EMAIL_TO=your_email@example.com
CONTACT_EMAIL_FROM=noreply@blaqdigital.com
```

### Step 5: Verify Configuration

Check that your `.env.local` file is properly gitignored:

```bash
git status
```

You should NOT see `.env.local` in the list of untracked files.

### Step 6: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and test the contact form to verify email functionality.

---

## Railway Production Setup

### Prerequisites

- Railway account ([https://railway.app](https://railway.app))
- Project deployed to Railway
- Production Resend API key
- Production ZeroDB credentials

### Step 1: Access Railway Dashboard

1. Log into Railway at [https://railway.app](https://railway.app)
2. Navigate to your Blaq Digital project
3. Click on the service/deployment

### Step 2: Add Environment Variables

1. Click the "Variables" tab
2. Click "New Variable" or "Add Variable"
3. Add each variable one by one:

#### ZeroDB/AINative Variables

```
ZERODB_USERNAME=admin@ainative.studio
ZERODB_PASSWORD=your_production_password
ZERODB_API_URL=https://api.ainative.studio/
ZERODB_API_TOKEN=your_production_token

AINATIVE_USERNAME=admin@ainative.studio
AINATIVE_PASSWORD=your_production_password
AINATIVE_API_URL=https://api.ainative.studio/
AINATIVE_API_TOKEN=your_production_token

NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
NEXT_PUBLIC_AINATIVE_API_KEY=your_production_public_key
NEXT_PUBLIC_ZERODB_PROJECT_ID=blaq-digital-prod
```

#### Resend API Variables

```
RESEND_API_KEY=re_your_production_api_key
CONTACT_EMAIL_TO=contact@blaqdigital.com
CONTACT_EMAIL_FROM=noreply@blaqdigital.com
```

#### Other Variables

```
OPENAI_API_KEY=your_openai_key_if_needed
NODE_ENV=production
```

### Step 3: Deploy Changes

1. Click "Deploy" or wait for auto-deploy
2. Railway will rebuild with new environment variables
3. Monitor deployment logs for any errors

### Alternative: Railway CLI

You can also set variables using the Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set variables
railway variables set RESEND_API_KEY=re_xxxxx
railway variables set CONTACT_EMAIL_TO=contact@blaqdigital.com
```

---

## Verification Steps

### Local Development Verification

1. **Check Environment Variables are Loaded**

Create a test file `test-env.js`:

```javascript
console.log('Environment Variables Check:');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✓ Set' : '✗ Not Set');
console.log('ZERODB_API_URL:', process.env.ZERODB_API_URL ? '✓ Set' : '✗ Not Set');
console.log('CONTACT_EMAIL_TO:', process.env.CONTACT_EMAIL_TO);
```

Run it:

```bash
node -r dotenv/config test-env.js
```

2. **Test Contact Form**

- Navigate to your contact page
- Fill out the form
- Submit and check for errors in browser console
- Verify email is received at `CONTACT_EMAIL_TO` address

3. **Check API Connectivity**

```bash
npm run dev
```

Check the server logs for any API connection errors.

### Production Verification

1. **Check Railway Logs**

```bash
railway logs
```

Look for:
- No environment variable errors
- Successful API connections
- No authentication failures

2. **Test Production Contact Form**

- Visit your production URL
- Submit a test contact form
- Verify email delivery

3. **Monitor Railway Dashboard**

- Check "Metrics" tab for errors
- Review "Deployments" for successful builds
- Verify "Variables" are all set correctly

---

## Troubleshooting

### Issue: "RESEND_API_KEY is not defined"

**Symptoms**:
- Contact form fails to send
- Error in logs: `RESEND_API_KEY is not defined`

**Solutions**:

1. **Local Development**:
   ```bash
   # Verify .env.local exists and contains RESEND_API_KEY
   cat .env.local | grep RESEND_API_KEY

   # Restart dev server
   npm run dev
   ```

2. **Production (Railway)**:
   - Check Railway dashboard → Variables
   - Ensure `RESEND_API_KEY` is set
   - Redeploy if variable was just added

### Issue: "Invalid API Key" from Resend

**Symptoms**:
- HTTP 401 error from Resend
- Error message: "Invalid API key"

**Solutions**:

1. Verify the API key is correct (no extra spaces or quotes)
2. Check if the API key has been revoked in Resend dashboard
3. Create a new API key and update your environment variables
4. Ensure you're using the correct key for the environment (dev vs prod)

### Issue: Email Not Delivered

**Symptoms**:
- No error in logs
- Email not received

**Solutions**:

1. **Check Spam Folder**: Unverified domains may trigger spam filters
2. **Verify Domain**: For production, ensure domain is verified in Resend
3. **Check Resend Logs**:
   - Log into Resend dashboard
   - Navigate to "Logs"
   - Check for delivery status and errors
4. **Verify Email Addresses**:
   ```bash
   # Check configuration
   echo $CONTACT_EMAIL_TO
   echo $CONTACT_EMAIL_FROM
   ```

### Issue: "Cannot find module 'resend'"

**Symptoms**:
- Module not found error
- Import errors for Resend

**Solutions**:

```bash
# Install Resend package
npm install resend

# Verify installation
npm list resend
```

### Issue: ZeroDB Connection Failures

**Symptoms**:
- 401 Unauthorized errors
- Authentication failures
- API timeout errors

**Solutions**:

1. **Verify Credentials**:
   ```bash
   # Check if variables are set
   echo $ZERODB_USERNAME
   echo $ZERODB_API_URL
   ```

2. **Check API URL**:
   - Ensure it ends with `/` if required
   - Verify the URL is reachable: `curl https://api.ainative.studio/`

3. **Token Expiration**:
   - Contact AINative support to verify token is still valid
   - Request a new token if expired

### Issue: Variables Not Loading in Production

**Symptoms**:
- Works locally but fails in production
- "undefined" values in production logs

**Solutions**:

1. **Check Railway Variables**:
   - All variables must be set in Railway dashboard
   - No typos in variable names
   - No extra quotes around values

2. **Redeploy**:
   ```bash
   railway up --detach
   ```

3. **Check Build Logs**:
   - Look for environment variable warnings during build
   - Verify Next.js is picking up `NEXT_PUBLIC_*` variables

### Issue: CORS Errors with Public API Variables

**Symptoms**:
- CORS errors in browser console
- Failed to fetch from API

**Solutions**:

1. Verify `NEXT_PUBLIC_AINATIVE_API_URL` matches the API's CORS configuration
2. Ensure the API URL doesn't have trailing slashes where not needed
3. Check that the API key has proper permissions

---

## Security Best Practices

### 1. Never Commit Secrets

**DO NOT commit**:
- `.env.local`
- `.env.production`
- Any file containing actual API keys or passwords

**Verify `.gitignore` includes**:
```
.env
.env*.local
.env.production
```

### 2. Use Different Keys for Different Environments

- **Development**: Use a separate Resend API key with test mode enabled
- **Production**: Use a production API key with sending limits configured

### 3. Rotate Keys Regularly

- Change API keys every 90 days
- Immediately rotate if a key is exposed
- Update keys in both local and Railway environments

### 4. Limit API Key Permissions

- Use the minimum required permissions
- For production Resend keys: "Sending access" only (not "Full access")
- For ZeroDB: Use role-based access control where available

### 5. Monitor API Usage

- Set up alerts in Resend dashboard for unusual activity
- Monitor Railway logs for failed authentication attempts
- Review API usage regularly

### 6. Use Environment-Specific Configurations

```bash
# Development
CONTACT_EMAIL_TO=developer@example.com
RESEND_API_KEY=re_dev_key

# Production
CONTACT_EMAIL_TO=contact@blaqdigital.com
RESEND_API_KEY=re_prod_key
```

### 7. Secure Storage

- Store production credentials in a password manager (1Password, LastPass)
- Document who has access to production credentials
- Use Railway's secure variable storage (encrypted at rest)

---

## Environment Variables Reference

### Complete Variable List

| Variable | Required | Environment | Description |
|----------|----------|-------------|-------------|
| `RESEND_API_KEY` | Yes | All | Resend API key for email sending |
| `CONTACT_EMAIL_TO` | No | All | Recipient email for contact form (default: contact@blaqdigital.com) |
| `CONTACT_EMAIL_FROM` | No | All | Sender email address (default: noreply@blaqdigital.com) |
| `ZERODB_USERNAME` | Yes | Server | ZeroDB admin username |
| `ZERODB_PASSWORD` | Yes | Server | ZeroDB admin password |
| `ZERODB_API_URL` | Yes | Server | ZeroDB API base URL |
| `ZERODB_API_TOKEN` | Yes | Server | ZeroDB authentication token |
| `AINATIVE_USERNAME` | Yes | Server | Legacy alias for ZERODB_USERNAME |
| `AINATIVE_PASSWORD` | Yes | Server | Legacy alias for ZERODB_PASSWORD |
| `AINATIVE_API_URL` | Yes | Server | Legacy alias for ZERODB_API_URL |
| `AINATIVE_API_TOKEN` | Yes | Server | Legacy alias for ZERODB_API_TOKEN |
| `NEXT_PUBLIC_AINATIVE_API_URL` | Yes | Client | Public API URL (exposed to browser) |
| `NEXT_PUBLIC_AINATIVE_API_KEY` | Yes | Client | Public API key (exposed to browser) |
| `NEXT_PUBLIC_ZERODB_PROJECT_ID` | Yes | Client | Project identifier |
| `OPENAI_API_KEY` | No | Server | OpenAI API key (if using AI features) |
| `NODE_ENV` | No | All | Environment mode (development/production) |

### Variable Exposure

**Server-side only** (NOT exposed to browser):
- `ZERODB_*`
- `AINATIVE_*` (without `NEXT_PUBLIC_` prefix)
- `RESEND_API_KEY`
- `OPENAI_API_KEY`

**Client-side** (exposed to browser):
- `NEXT_PUBLIC_*` variables only

---

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Railway Documentation](https://docs.railway.app/)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)

---

## Support

If you encounter issues not covered in this guide:

1. Check the troubleshooting section above
2. Review Railway deployment logs
3. Check Resend dashboard logs
4. Contact the development team
5. Create a GitHub issue with:
   - Error messages (redact sensitive info)
   - Steps to reproduce
   - Environment (local/production)

---

**Last Updated**: 2026-02-20
**Maintained by**: Blaq Digital Development Team
**Related Issues**: GitHub Issue #34
