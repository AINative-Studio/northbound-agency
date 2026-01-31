# Blaq Digital - AINative Reseller Platform

A Next.js-based reseller platform for AINative services, targeting the Black entertainment industry. This platform enables resellers to offer AI-powered services including RAG chatbots, semantic search, multimodal AI APIs, and analytics to their clients.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Setup

Create a `.env.local` file with the following variables:

```bash
# AINative API Configuration
NEXT_PUBLIC_AINATIVE_API_URL="https://api.ainative.studio"
AINATIVE_API_KEY="your_api_key_here"

# ZeroDB Configuration
NEXT_PUBLIC_ZERODB_PROJECT_ID="blaq-digital-prod"
ZERODB_API_KEY="your_zerodb_api_key"

# Authentication
NEXTAUTH_SECRET="generate_random_secret_32_chars_min"
NEXTAUTH_URL="http://localhost:3000"  # Update for production

# Optional: Analytics
NEXT_PUBLIC_GA_ID="your_google_analytics_id"
```

### Required Environment Variables for Production

For Railway deployment, ensure these are set:
- `NEXT_PUBLIC_AINATIVE_API_URL` - AINative API base URL
- `AINATIVE_API_KEY` - Your AINative API key (contact AINative support)
- `NEXT_PUBLIC_ZERODB_PROJECT_ID` - ZeroDB project ID
- `NEXTAUTH_SECRET` - Random secret for session encryption
- `NEXTAUTH_URL` - Your production URL (e.g., `https://blaq.ainative.studio`)

## REST API Integration

✅ **Use REST APIs** - All integrations use `lib/zerodb.ts` REST client
❌ **No MCP servers** - Direct REST calls only for UI integration

### Quick Example

```typescript
import { zerodb } from '@/lib/zerodb';

// Store contact form submission
await zerodb.insertTable('contacts', {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in services'
});

// Search similar content
const results = await zerodb.searchSimilarText(
  'portfolio',
  'web design',
  10
);
```

## Documentation

- **REST API Guide**: `docs/api/REST_API_INTEGRATION.md`
- **Quick Reference**: `docs/api/QUICK_REFERENCE.md`
- **Coding Standards**: `.ainative/RULES.MD`
- **Git Workflow**: `.ainative/git-rules.md`
- **File Placement**: `.ainative/CRITICAL_FILE_PLACEMENT_RULES.md`

## Key Features

- Next.js 14 with App Router
- TypeScript
- TailwindCSS
- ZeroDB integration for:
  - Contact form storage
  - Semantic search
  - Chat memory
  - Analytics

## Project Structure

```
blaq_digital/
├── app/              # Next.js pages
├── components/       # React components
├── lib/              # Utilities
│   ├── zerodb.ts    # REST API client ✅
│   └── utils.ts     # Helpers
├── docs/             # Documentation
│   └── api/         # API guides
├── .ainative/        # AI coding rules
└── .claude/          # Claude Code config
```

## Deployment

### Railway Deployment (Recommended)

This project is configured for Railway deployment with custom subdomain support.

**Production URL**: `https://blaq.ainative.studio`

#### Railway Setup Steps

1. **Connect Repository**:
   - Link GitHub repo: `https://github.com/urbantech/blaq_digital`
   - Select main branch for deployment

2. **Configure Environment Variables**:
   ```bash
   NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
   AINATIVE_API_KEY=<obtain_from_ainative_team>
   NEXT_PUBLIC_ZERODB_PROJECT_ID=blaq-digital-prod
   ZERODB_API_KEY=<obtain_from_ainative_team>
   NEXTAUTH_SECRET=<generate_random_32_char_secret>
   NEXTAUTH_URL=https://blaq.ainative.studio
   NODE_ENV=production
   ```

3. **Custom Domain Setup**:
   - Add custom domain: `blaq.ainative.studio`
   - Configure CNAME record in AINative DNS:
     ```
     Type: CNAME
     Name: blaq
     Value: <railway_generated_domain>
     ```

4. **Build Configuration**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Port: 3000 (auto-detected)

5. **Health Check**:
   - Path: `/api/health`
   - Expected: 200 OK response

#### Alternative Deployment Options

- **Vercel**: One-click deployment with GitHub integration
- **Netlify**: Supports Next.js with automatic builds
- **Docker**: Dockerfile included for containerized deployment

## Architecture

### Core Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Database**: ZeroDB (vector database via REST API)
- **Authentication**: AINative API authentication (username/password)
- **Payments**: AINative Wallet API (ACH transfers, digital payments)

### AI Services Integration

#### Chat Completion API
- **Provider**: AINative Chat Completion API
- **Model**: Meta Llama 3.1 (70B/405B)
- **Endpoint**: `POST /v1/chat/completions`
- **Features**: Streaming responses, tool calling, RAG support
- **Use Cases**: AI chatbot, customer support, content generation

#### Vector Search (ZeroDB)
- **Service**: ZeroDB Semantic Search
- **Embedding Model**: HuggingFace BGE (via AINative)
- **Dimension**: 1536 dimensions
- **Features**: Hybrid search, metadata filtering, quantum-enhanced search
- **Use Cases**: Semantic search, RAG retrieval, content discovery

#### Multimodal APIs
- **Text-to-Speech**: AINative TTS API (multiple voices)
- **Image Generation**: Stable Diffusion via AINative
- **Video AI**: CogVideoX integration
- **Use Cases**: Media generation, content creation

### Reseller Platform Features

#### Dashboard (`/admin`)
- **Authentication**: JWT token-based (HTTP-only cookies)
- **Wallet Integration**: AINative Wallet API for payments
  - ACH bank transfers (deposits and withdrawals)
  - Digital payment processing
  - Transaction history tracking
  - Real-time balance updates
- **Analytics**: Client metrics, API usage, earnings tracking
- **Quick Actions**: Demo access, analytics, ZeroDB console, settings

#### Payment System (AINative Wallet API)
- **API Base**: `https://api.ainative.studio/v1/payments`
- **Key Endpoints**:
  - `GET /wallets/me` - Get wallet balance and details
  - `POST /deposit` - Receive payments (ACH, digital)
  - `POST /withdraw` - Withdraw to bank account (ACH)
  - `GET /transactions` - Complete transaction history
  - `POST /bank-accounts` - Link bank account for ACH
- **Payment Methods**: ACH bank transfers, digital payments
- **Processing Time**: 3-5 business days for ACH transfers
- **Security**: Bank-level encryption, secure authentication

### Data Flow

```
User Request
    ↓
Next.js App Router
    ↓
API Routes (/app/api/*)
    ↓
AINative REST APIs
    ├── Chat Completion API (Llama 3.1)
    ├── ZeroDB Vector Search
    ├── Multimodal APIs (TTS, Image, Video)
    └── Payment APIs (Sila Money)
    ↓
Response to Client
```

### Authentication Flow

```
1. User Login (/login)
    ↓
2. POST /api/auth/login
    ↓
3. Authenticate against AINative API
    ↓
4. Set ainative_token cookie (HTTP-only)
    ↓
5. Redirect to /admin dashboard
    ↓
6. Protected routes verify token via /api/auth/verify
```

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: ZeroDB (vector database via REST API)
- **Auth**: AINative API authentication (JWT tokens)
- **Payments**: AINative Wallet API (ACH transfers, digital payments)
- **AI Provider**: AINative Studio APIs
- **LLM**: Meta Llama 3.1 (70B/405B parameters)
- **Embeddings**: HuggingFace BGE (1536 dimensions)

## API Endpoints

### Authentication APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/auth/login` | POST | Authenticate user and get access token |
| `/v1/auth/logout` | POST | Invalidate session and clear tokens |
| `/v1/auth/refresh` | POST | Refresh expired access token |
| `/v1/auth/verify` | GET | Verify token validity |

### Chat Completion API (Meta Llama 3.1)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/chat/completions` | POST | Generate AI chat completions |
| `/v1/chat/completions` (streaming) | POST | Stream AI responses in real-time |

**Model**: Meta Llama 3.1 (70B/405B parameters)

**Features**: Streaming, function calling, RAG support, context window up to 128K tokens

### ZeroDB Vector Database APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/public/zerodb/tables/{table}/insert` | POST | Insert data into NoSQL table |
| `/v1/public/zerodb/tables/{table}/query` | POST | Query data from table |
| `/v1/public/zerodb/tables/{table}/update` | PUT | Update existing records |
| `/v1/public/zerodb/tables/{table}/delete` | DELETE | Delete records |
| `/v1/public/zerodb/vectors/upsert` | POST | Store vector embeddings |
| `/v1/public/zerodb/vectors/search/text` | POST | Semantic text search |
| `/v1/public/zerodb/vectors/search/vector` | POST | Vector similarity search |
| `/v1/public/zerodb/vectors/search/hybrid` | POST | Hybrid semantic + keyword search |
| `/v1/admin/zerodb/analytics/usage` | GET | Usage statistics and metrics |

**Embedding Model**: HuggingFace BGE (1536 dimensions)

### AINative Wallet API (Payment System)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/payments/wallets` | POST | Create new wallet for user |
| `/v1/payments/wallets/me` | GET | Get current user's wallet and balance |
| `/v1/payments/wallets/me/balance` | GET | Get current wallet balance |
| `/v1/payments/bank-accounts` | POST | Link bank account for ACH transfers |
| `/v1/payments/bank-accounts` | GET | List all linked bank accounts |
| `/v1/payments/bank-accounts/{id}` | DELETE | Remove bank account |
| `/v1/payments/deposit` | POST | Deposit funds (ACH or digital) |
| `/v1/payments/withdraw` | POST | Withdraw to bank account (ACH) |
| `/v1/payments/transfer` | POST | Transfer funds to another user |
| `/v1/payments/transactions` | GET | Get transaction history |
| `/v1/payments/transactions/export` | GET | Export transactions to CSV |

**Payment Methods**: ACH bank transfers (3-5 business days), digital payments

**Security**: Bank-level encryption, KYC verification, secure authentication

### Multimodal AI APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/multimodal/text-to-speech` | POST | Convert text to speech (multiple voices) |
| `/v1/multimodal/speech-to-text` | POST | Transcribe audio to text |
| `/v1/multimodal/image/generate` | POST | Generate images (Stable Diffusion) |
| `/v1/multimodal/image/edit` | POST | Edit existing images |
| `/v1/multimodal/video/generate` | POST | Generate video (CogVideoX) |
| `/v1/multimodal/embeddings` | POST | Generate embeddings for text/images |

### Analytics & Monitoring APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/analytics/usage` | GET | Get API usage statistics |
| `/v1/analytics/costs` | GET | Get cost breakdown by service |
| `/v1/analytics/tokens` | GET | Token usage by model |
| `/v1/monitoring/health` | GET | System health check |
| `/v1/monitoring/status` | GET | Service status |

---

**Full API Documentation**: https://api.ainative.studio/docs

**API Base URL**: `https://api.ainative.studio`

**Authentication**: All API requests require Bearer token authentication via `Authorization` header

---

## Application Routes

### Public Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero video and service overview |
| `/about` | About Blaq Digital and team |
| `/services` | Services landing page |
| `/services/ai-apps` | AI application development services |
| `/work` | Portfolio and case studies |
| `/contact` | Contact form |
| `/demos` | Live AI demos and chatbot |
| `/login` | AINative authentication login page |

### Protected Pages (Requires Authentication)

| Route | Purpose |
|-------|---------|
| `/admin` | Reseller dashboard (main control panel) |
| `/admin/wallet/deposit` | Receive payments interface |
| `/admin/wallet/withdraw` | Withdraw funds (ACH) interface |
| `/admin/wallet/transactions` | Full transaction history |
| `/admin/wallet/setup` | Initial wallet setup |
| `/admin/analytics` | Usage analytics and metrics |
| `/admin/zerodb` | ZeroDB management console |
| `/admin/settings` | Reseller site configuration |

### Internal API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/login` | POST | Login with AINative credentials |
| `/api/auth/logout` | POST | Logout and clear session |
| `/api/auth/verify` | GET | Verify authentication status |
| `/api/chat` | POST | AI chat completion proxy |
| `/api/health` | GET | Application health check |

---

## Features by Page

### Homepage (`/`)
- Hero video background with audio controls
- Service overview cards
- Call-to-action buttons
- Responsive design

### Reseller Dashboard (`/admin`)
- **Authentication**: Secure login with AINative credentials
- **Stats Dashboard**:
  - Active Clients count
  - AI Conversations metrics
  - ZeroDB Queries tracking
  - API Credits usage
- **Wallet Integration**:
  - Real-time balance display
  - Receive Payment (ACH, digital)
  - Withdraw to Bank (ACH transfers)
  - Transaction history with status tracking
- **Quick Actions**:
  - Test RAG Chatbot
  - View Analytics
  - ZeroDB Console
  - Site Settings
- **Services Overview**: All AINative services with status badges

### Demos Page (`/demos`)
- Live AI chatbot with RAG
- Streaming message responses
- Markdown rendering
- Code syntax highlighting
- Interactive examples

### Contact Page (`/contact`)
- Contact form with validation
- Form submissions stored in ZeroDB
- Email notifications (optional)
- Location information

## Support

For issues or questions, refer to project documentation in `docs/` folder.

---

Built by AINative Dev Team
All Data Services Built on ZeroDB
