# Northbound Studio Database Documentation

## Overview

This directory contains comprehensive documentation for all database systems used in the Northbound Studio project, including vector collections for RAG (Retrieval-Augmented Generation) and NoSQL tables for application data.

## Documentation Files

### 1. KNOWLEDGE_BASE_COLLECTION.md
**Purpose:** Complete technical specification for the `blaq_knowledge_base` vector collection

**Contents:**
- Collection configuration and architecture
- Schema definition and metadata structure
- API operations (upsert, search)
- Content categories and organization
- Usage examples in TypeScript
- Performance considerations
- Security and access control
- Troubleshooting guide

**Use When:**
- Implementing vector search features
- Adding new knowledge base content
- Understanding RAG system architecture
- Debugging search issues
- Planning capacity and scaling

### 2. RAG_IMPLEMENTATION_GUIDE.md
**Purpose:** Step-by-step implementation guide for the RAG vector collection

**Contents:**
- Current implementation status
- Complete file inventory
- Acceptance criteria checklist
- API integration status and challenges
- Next steps and options
- Usage examples and commands
- Content quality metrics
- Maintenance procedures

**Use When:**
- Getting started with RAG implementation
- Understanding project status
- Planning next development steps
- Training new team members
- Reviewing implementation progress

### 3. README.md (This File)
**Purpose:** Navigation and quick reference for database documentation

## Quick Start

### Seed the Knowledge Base

```bash
# Enhanced version with 16 entries
npm run seed:kb:enhanced

# Original version with 7 entries
npm run seed:kb
```

### Test Vector Search

```bash
# Run full test suite (10 queries)
npm run test:vectors

# Test single query
npm run test:vectors -- --query "What services do you offer?"

# Custom top-k results
npm run test:vectors -- --query "pricing" --top-k 3
```

### Use in Your Code

```typescript
import { zerodb } from '@/lib/zerodb';

// Search knowledge base
const results = await zerodb.searchSimilarText(
  'blaq_knowledge_base',
  'How does RAG work?',
  5
);

// Add new content
await zerodb.upsertVectors('blaq_knowledge_base', [
  {
    id: 'unique-id',
    text: 'Your content here...',
    metadata: {
      topic: 'topic name',
      category: 'services',
      keywords: ['keyword1', 'keyword2'],
      source: 'documentation'
    }
  }
]);
```

## Database Systems

### 1. Vector Database (ZeroDB)
**Collection:** `blaq_knowledge_base`
**Purpose:** Semantic search and RAG for AI chatbot
**Technology:** OpenAI embeddings (text-embedding-3-small)
**Dimensions:** 1536
**Metric:** Cosine similarity

**Key Features:**
- Semantic search (meaning-based, not keyword-based)
- Fast retrieval (< 100ms query time)
- Scalable to 10,000+ documents
- No retraining required for updates

**Use Cases:**
- AI chatbot knowledge retrieval
- Documentation search
- FAQ systems
- Content recommendations

### 2. NoSQL Tables (ZeroDB)
**Purpose:** Application data storage
**Technology:** Document-based NoSQL

**Tables:**
- `contact_submissions` - Contact form data
- Additional tables as needed

**Use Cases:**
- Form submissions
- User data
- Application state
- Analytics and metrics

## Content Organization

### Knowledge Base Categories

1. **About** (3 entries)
   - Company overview
   - Differentiation and competitive advantages
   - Team expertise and background

2. **Services** (5 entries)
   - AI chatbot development
   - Web platform development
   - Conversational media
   - AI integration and consulting
   - Full service overview

3. **Technical** (1 entry)
   - RAG technology explanation

4. **Tech Docs** (2 entries)
   - Vector database concepts
   - Security and compliance

5. **Business** (4 entries)
   - Pricing models
   - Timeline and delivery
   - Contact and onboarding process
   - ROI and business value

6. **Case Studies** (1 entry)
   - Enterprise RAG chatbot implementation

## File Structure

```
/docs/database/
├── README.md                           # This file
├── KNOWLEDGE_BASE_COLLECTION.md        # Collection specification
└── RAG_IMPLEMENTATION_GUIDE.md         # Implementation guide

/scripts/
├── seed-knowledge-base.ts              # Original seed script (7 entries)
├── seed-knowledge-base-enhanced.ts     # Enhanced seed script (16 entries)
└── test-vector-search.ts               # Test framework

/lib/
└── zerodb.ts                           # ZeroDB client library
```

## API Endpoints

### Vector Operations

```typescript
// Search similar text
POST /v1/public/zerodb/vectors/search/text
{
  "collection_name": "blaq_knowledge_base",
  "query_text": "your question",
  "top_k": 5
}

// Upsert vectors
POST /v1/public/zerodb/vectors/upsert
{
  "collection_name": "blaq_knowledge_base",
  "vectors": [...]
}
```

### Table Operations

```typescript
// Insert data
POST /v1/public/zerodb/tables/{tableName}/insert
{
  "rows": [...]
}

// Query data
POST /v1/public/zerodb/tables/{tableName}/query
{
  "filter": {...},
  "limit": 100
}
```

## Environment Variables

```bash
# Public (exposed to browser)
NEXT_PUBLIC_AINATIVE_API_URL="https://api.ainative.studio"
NEXT_PUBLIC_AINATIVE_API_KEY="..."
NEXT_PUBLIC_ZERODB_PROJECT_ID="northbound-studio-prod"

# Server-side only
ZERODB_API_TOKEN="..."
ZERODB_USERNAME="..."
ZERODB_PASSWORD="..."
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Query Response Time | < 100ms | ✅ Designed for |
| Similarity Threshold | > 0.7 | ✅ Configured |
| Collection Size | 10,000+ entries | ✅ Scalable |
| Concurrent Users | 100+ | ✅ Supported |
| Update Frequency | Real-time | ✅ No retraining |

## Maintenance Schedule

### Weekly
- Review search analytics
- Monitor query patterns
- Check for common failed queries

### Monthly
- Add new knowledge base content
- Update existing entries
- Review similarity scores

### Quarterly
- Audit and refresh outdated content
- Performance optimization
- Capacity planning

### As Needed
- Add new services and capabilities
- Update for product changes
- Respond to user feedback

## Troubleshooting

### Common Issues

**Low similarity scores:**
- Add more context to content
- Include more keywords in metadata
- Ensure content completeness

**Wrong results returned:**
- Review category assignments
- Add more specific keywords
- Refine topic descriptions

**Missing results:**
- Verify content coverage
- Add missing topics
- Check for typos in queries

**API errors:**
- Verify authentication
- Check endpoint URLs
- Review API documentation

## Support Resources

### Documentation
- [REST API Integration Guide](/docs/api/REST_API_INTEGRATION.md)
- [ZeroDB API Docs](https://api.ainative.studio/docs)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)

### Health Checks
- API Health: https://api.ainative.studio/health
- OpenAPI Spec: https://api.ainative.studio/v1/openapi.json

### Contact
For ZeroDB/AINative API support:
- Email: admin@ainative.studio
- API URL: https://api.ainative.studio

## Best Practices

### Content Writing
1. Write in clear, natural language
2. Include comprehensive context
3. Use relevant keywords naturally
4. Keep entries focused (100-500 words)
5. Avoid duplication

### Search Optimization
1. Test common user queries
2. Monitor similarity scores
3. Iterate on low-performing content
4. Add examples and use cases
5. Update regularly

### System Integration
1. Implement proper error handling
2. Cache frequent queries
3. Monitor performance metrics
4. Log search analytics
5. Plan for scaling

## Future Enhancements

### Short Term
- Multi-language support
- Advanced metadata filtering
- Search analytics dashboard
- A/B testing for content

### Long Term
- Hybrid search (semantic + keyword)
- Automatic content updates
- User feedback integration
- ML-based relevance tuning

## Version History

- **v1.0** (2026-01-30): Initial implementation
  - 16 knowledge base entries
  - 6 content categories
  - Complete documentation
  - Test framework
  - Seed scripts

---

**Last Updated:** 2026-01-30
**Status:** Infrastructure Complete - Ready for Deployment
**Maintained By:** Northbound Studio Engineering Team
