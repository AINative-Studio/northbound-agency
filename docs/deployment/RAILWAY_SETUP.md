# Railway Production Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Northbound Studio platform to Railway with proper environment variable configuration, including Resend API integration for the contact form email service.

## Prerequisites

- [Railway account](https://railway.app) (free or paid)
- GitHub repository access
- Production Resend API key
- Production ZeroDB/AINative credentials
- Domain configuration access (for custom domain setup)

## Quick Start

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login to Railway
railway login

# 3. Link to your project
railway link

# 4. Deploy
railway up
```

## Detailed Setup Instructions

### Step 1: Create Railway Project

1. **Sign up/Login to Railway**
   - Navigate to [https://railway.app](https://railway.app)
   - Sign up or login with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub account
   - Select your repository: `urbantech/blaq_digital`
   - Choose the `main` branch for production deployment

3. **Configure Build Settings**
   - Railway will auto-detect Next.js configuration
   - Verify settings:
     - Build Command: `npm run build`
     - Start Command: `npm start`
     - Port: `3000` (auto-detected)

### Step 2: Configure Environment Variables

#### Method 1: Railway Dashboard (Recommended)

1. **Navigate to Variables Tab**
   - Open your Railway project
   - Click on your service
   - Select the "Variables" tab
   - Click "New Variable"

2. **Add Required Variables**

Copy and paste these variables one by one:

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_production_api_key_here
CONTACT_EMAIL_TO=contact@northboundstudios.co
CONTACT_EMAIL_FROM=noreply@northboundstudios.co

# ZeroDB/AINative API Configuration (Server-side)
ZERODB_USERNAME=your_production_username
ZERODB_PASSWORD=your_production_password
ZERODB_API_URL=https://api.ainative.studio/
ZERODB_API_TOKEN=your_production_token

# Legacy Aliases (for compatibility)
AINATIVE_USERNAME=your_production_username
AINATIVE_PASSWORD=your_production_password
AINATIVE_API_URL=https://api.ainative.studio/
AINATIVE_API_TOKEN=your_production_token

# Public API Configuration (Client-side)
NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
NEXT_PUBLIC_AINATIVE_API_KEY=your_production_public_key
NEXT_PUBLIC_ZERODB_PROJECT_ID=northbound-studio-prod

# Optional: AI Features
OPENAI_API_KEY=your_openai_key_if_needed

# Environment
NODE_ENV=production
```

3. **Verify All Variables Are Set**
   - Scroll through the variables list
   - Ensure no typos in variable names
   - Verify no extra quotes or spaces

#### Method 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Set variables
railway variables set RESEND_API_KEY=re_xxxxx
railway variables set CONTACT_EMAIL_TO=contact@northboundstudios.co
railway variables set CONTACT_EMAIL_FROM=noreply@northboundstudios.co
railway variables set ZERODB_USERNAME=your_username
railway variables set ZERODB_PASSWORD=your_password
railway variables set ZERODB_API_URL=https://api.ainative.studio/
railway variables set ZERODB_API_TOKEN=your_token
railway variables set NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
railway variables set NEXT_PUBLIC_AINATIVE_API_KEY=your_public_key
railway variables set NEXT_PUBLIC_ZERODB_PROJECT_ID=northbound-studio-prod
railway variables set NODE_ENV=production

# Verify variables are set
railway variables
```

### Step 3: Obtain Production Credentials

#### Resend API Key

1. **Sign up for Resend**
   - Go to [https://resend.com](https://resend.com)
   - Create a production account
   - Verify your email

2. **Add and Verify Domain**
   - Navigate to "Domains" in Resend dashboard
   - Click "Add Domain"
   - Enter: `northboundstudios.co`
   - Add DNS records to your domain registrar:
     ```
     Type: TXT
     Name: _resend
     Value: [provided by Resend]

     Type: CNAME
     Name: [provided by Resend]
     Value: [provided by Resend]
     ```
   - Wait for verification (15-30 minutes)

3. **Create Production API Key**
   - Go to "API Keys" in Resend dashboard
   - Click "Create API Key"
   - Name: "Northbound Studio Production"
   - Permission: "Sending access" (recommended for security)
   - Copy the API key immediately (shown only once)
   - Add to Railway: `RESEND_API_KEY=re_xxxxx`

#### ZeroDB/AINative Credentials

1. **Contact AINative Support**
   - Email: support@ainative.studio
   - Request production credentials for Northbound Studio project
   - Specify: "Production environment for northbound-studio-prod"

2. **Receive Credentials**
   - Username/email
   - Password
   - API token
   - Project ID
   - Public API key

3. **Add to Railway**
   - Use variables listed in Step 2 above

### Step 4: Custom Domain Configuration

1. **Add Custom Domain in Railway**
   - Navigate to your service settings
   - Click "Networking" or "Domains"
   - Click "Custom Domain"
   - Enter: `northboundstudio.co`
   - Railway will provide a CNAME target

2. **Configure DNS**
   - Log into your DNS provider (for ainative.studio domain)
   - Add CNAME record:
     ```
     Type: CNAME
     Name: blaq
     Value: [railway-provided-domain].railway.app
     TTL: 3600 (or default)
     ```
   - Save changes

3. **Wait for SSL Certificate**
   - Railway automatically provisions SSL via Let's Encrypt
   - Usually takes 5-15 minutes
   - Verify HTTPS is working: `https://northboundstudio.co`

### Step 5: Deploy and Verify

1. **Trigger Deployment**
   - Push to `main` branch, or
   - Click "Deploy" in Railway dashboard
   - Monitor build logs in real-time

2. **Check Build Logs**
   ```bash
   # Using Railway CLI
   railway logs

   # Or watch in dashboard
   # Navigate to Deployments > Latest Deployment > View Logs
   ```

3. **Verify Deployment**
   - Check for successful build: "Build succeeded"
   - Check for successful start: "Server listening on port 3000"
   - No environment variable errors

4. **Test Production Site**
   - Visit: `https://northboundstudio.co`
   - Test contact form:
     - Fill out all fields
     - Submit form
     - Verify success message
     - Check email delivery to `CONTACT_EMAIL_TO`

### Step 6: Health Monitoring

1. **Set Up Health Checks**
   - Railway auto-monitors your app
   - Custom health endpoint: `/api/health`
   - Expected response: 200 OK

2. **Enable Notifications**
   - Railway dashboard → Settings → Notifications
   - Enable:
     - Deployment failures
     - Service crashes
     - Health check failures

3. **Monitor Logs**
   ```bash
   # Watch logs in real-time
   railway logs --follow

   # Filter logs
   railway logs --filter "error"
   railway logs --filter "Contact API"
   ```

## Environment Variables Reference

### Critical Variables (Must Be Set)

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for email sending | `re_abc123...` |
| `ZERODB_USERNAME` | ZeroDB admin username | `admin@ainative.studio` |
| `ZERODB_PASSWORD` | ZeroDB admin password | (secure password) |
| `ZERODB_API_TOKEN` | ZeroDB authentication token | (long token string) |
| `NEXT_PUBLIC_ZERODB_PROJECT_ID` | Project identifier | `northbound-studio-prod` |

### Optional Variables (Have Defaults)

| Variable | Default | Description |
|----------|---------|-------------|
| `CONTACT_EMAIL_TO` | `contact@northboundstudios.co` | Contact form recipient |
| `CONTACT_EMAIL_FROM` | `noreply@northboundstudios.co` | Email sender address |
| `NODE_ENV` | `production` | Environment mode |

### Variable Security

**Server-side only** (NOT exposed to browser):
- `RESEND_API_KEY`
- `ZERODB_*` (without NEXT_PUBLIC prefix)
- `AINATIVE_*` (without NEXT_PUBLIC prefix)
- `OPENAI_API_KEY`

**Client-side** (exposed to browser):
- `NEXT_PUBLIC_AINATIVE_API_URL`
- `NEXT_PUBLIC_AINATIVE_API_KEY`
- `NEXT_PUBLIC_ZERODB_PROJECT_ID`

## Troubleshooting

### Issue: Build Fails

**Symptoms**:
- "Build failed" in Railway logs
- npm install errors

**Solutions**:
1. Check `package.json` dependencies
2. Verify Node.js version compatibility
3. Clear build cache:
   ```bash
   railway run npm cache clean --force
   ```
4. Redeploy:
   ```bash
   railway up --detach
   ```

### Issue: Environment Variables Not Loading

**Symptoms**:
- "undefined" values in production logs
- Contact form fails silently

**Solutions**:
1. Verify all variables are set in Railway dashboard
2. Check for typos in variable names (case-sensitive)
3. Ensure no extra quotes around values
4. Redeploy after adding variables:
   ```bash
   railway up --detach
   ```

### Issue: Email Not Sending

**Symptoms**:
- Contact form submits but no email received
- "Email sending failed" in logs

**Solutions**:

1. **Check Resend API Key**:
   ```bash
   railway variables | grep RESEND
   ```

2. **Verify Domain**:
   - Log into Resend dashboard
   - Check domain verification status
   - Ensure DNS records are correct

3. **Check Logs**:
   ```bash
   railway logs --filter "Contact API"
   railway logs --filter "Email"
   ```

4. **Test Resend API Directly**:
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "noreply@northboundstudios.co",
       "to": "test@example.com",
       "subject": "Test Email",
       "html": "<p>Test</p>"
     }'
   ```

5. **Check Spam Folder**: Emails may be filtered

### Issue: 401 Unauthorized from ZeroDB

**Symptoms**:
- API calls fail with 401 status
- "Authentication failed" errors

**Solutions**:
1. Verify credentials with AINative team
2. Check token hasn't expired
3. Ensure API URL has trailing slash: `https://api.ainative.studio/`
4. Test API connectivity:
   ```bash
   railway run curl -H "Authorization: Bearer $ZERODB_API_TOKEN" \
     https://api.ainative.studio/v1/auth/verify
   ```

### Issue: Custom Domain Not Working

**Symptoms**:
- Domain doesn't resolve
- SSL certificate errors

**Solutions**:
1. Verify DNS propagation:
   ```bash
   dig northboundstudio.co CNAME
   ```
2. Wait 30-60 minutes for DNS propagation
3. Check CNAME target matches Railway's provided value
4. Clear browser cache
5. Try incognito/private browsing mode

### Issue: High Memory Usage

**Symptoms**:
- App crashes randomly
- "Out of memory" errors

**Solutions**:
1. Upgrade Railway plan for more resources
2. Optimize Next.js build:
   ```json
   // next.config.js
   module.exports = {
     swcMinify: true,
     compress: true
   }
   ```
3. Monitor memory usage in Railway dashboard

## Best Practices

### 1. Environment Separation

- Use different Railway projects for staging and production
- Use different API keys for each environment
- Never use production credentials in development

### 2. Secret Rotation

- Rotate API keys every 90 days
- Update Railway variables when rotating
- Test thoroughly after rotation

### 3. Monitoring and Alerts

- Set up error tracking (Sentry, LogRocket)
- Monitor email deliverability in Resend dashboard
- Review Railway logs weekly

### 4. Backup Strategy

- Export environment variables regularly:
  ```bash
  railway variables > backup.env
  ```
- Store backups in secure password manager
- Document who has access to production credentials

### 5. Deployment Strategy

- Use feature branches for development
- Deploy to staging before production
- Use Railway's deployment rollback if needed:
  ```bash
  railway deployment list
  railway deployment rollback [deployment-id]
  ```

### 6. Cost Optimization

- Monitor Railway usage in dashboard
- Set up billing alerts
- Consider usage-based optimizations:
  - Enable Next.js caching
  - Optimize image sizes
  - Use CDN for static assets

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Resend Documentation](https://resend.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)

## Support

If you encounter issues not covered in this guide:

1. Check Railway status: [https://status.railway.app](https://status.railway.app)
2. Check Resend status: [https://status.resend.com](https://status.resend.com)
3. Review full environment variables documentation: `docs/deployment/ENVIRONMENT_VARIABLES.md`
4. Contact development team
5. Create GitHub issue with:
   - Error messages (redact sensitive info)
   - Railway logs excerpt
   - Steps to reproduce

## Quick Commands Reference

```bash
# Railway CLI Commands
railway login              # Login to Railway
railway link               # Link to project
railway up                 # Deploy current directory
railway logs               # View logs
railway logs --follow      # Watch logs in real-time
railway variables          # List all variables
railway variables set KEY=VALUE  # Set variable
railway status             # Check deployment status
railway open               # Open project in browser

# Deployment
railway up --detach        # Deploy without watching
railway deployment list    # List deployments
railway deployment rollback [id]  # Rollback to previous deployment

# Environment Variables
railway variables set RESEND_API_KEY=re_xxxxx
railway variables get RESEND_API_KEY
railway variables delete RESEND_API_KEY

# Debugging
railway logs --filter "error"
railway logs --filter "Contact API"
railway run npm test
railway shell              # SSH into container
```

---

**Last Updated**: 2026-02-25
**Maintained by**: Northbound Studio Development Team
**Related Issues**: GitHub Issue #34
**Related Documentation**: [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)
