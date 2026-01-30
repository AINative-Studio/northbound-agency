# Blaq Digital - Digital Marketing Agency Website

A modern Next.js website for Blaq Digital marketing agency with ZeroDB integration for data management.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Setup

Copy `.env` file with the following variables:

```bash
NEXT_PUBLIC_AINATIVE_API_URL="https://api.ainative.studio"
NEXT_PUBLIC_AINATIVE_API_KEY="your_api_key"
NEXT_PUBLIC_ZERODB_PROJECT_ID="blaq-digital-prod"
```

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

Deploy to Vercel, Railway, or any Next.js hosting platform.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: ZeroDB (via REST API)
- **Auth**: JWT tokens
- **API**: AINative Studio REST APIs

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/public/zerodb/tables/{table}/insert` | POST | Insert data |
| `/v1/public/zerodb/tables/{table}/query` | POST | Query data |
| `/v1/public/zerodb/vectors/search/text` | POST | Semantic search |
| `/v1/admin/zerodb/analytics/usage` | GET | Usage stats |

Full documentation: https://api.ainative.studio/docs

## Support

For issues or questions, refer to project documentation in `docs/` folder.

---

Built by AINative Dev Team
All Data Services Built on ZeroDB
