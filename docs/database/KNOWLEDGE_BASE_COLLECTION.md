# Blaq Knowledge Base Vector Collection

## Overview

The `blaq_knowledge_base` collection is a vector database designed for RAG (Retrieval-Augmented Generation) operations. It stores knowledge base content as embeddings for semantic search and AI-powered question answering.

## Collection Configuration

### Technical Specifications

- **Collection Name:** `blaq_knowledge_base`
- **Vector Dimensions:** 1536 (OpenAI text-embedding-3-small model)
- **Similarity Metric:** Cosine similarity
- **API Endpoint:** ZeroDB Vector Search API
- **Project ID:** `blaq-digital-prod`

### Architecture

```
User Query → Text Embedding → Vector Search → Top K Results → LLM Context → Response
```

## Schema Definition

### Vector Entry Structure

Each vector entry in the collection follows this structure:

```typescript
{
  id: string;                    // Unique identifier (kebab-case)
  text: string;                  // Source content to be embedded
  metadata: {                    // Additional searchable metadata
    topic: string;              // Main topic/subject
    category: string;           // Content category
    keywords: string[];         // Search keywords
    source?: string;            // Content source (optional)
  }
}
```

### Metadata Schema

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `topic` | string | Main subject of the content | "company overview", "chatbot development" |
| `category` | string | Content classification | "about", "services", "technical", "business" |
| `keywords` | string[] | Search optimization keywords | ["blaq digital", "services", "ai"] |
| `source` | string | Origin of content (optional) | "website", "documentation", "case study" |

## Content Categories

The knowledge base is organized into the following categories:

### 1. About (category: "about")
- Company overview
- Mission and values
- Differentiation and competitive advantages
- Team information

### 2. Services (category: "services")
- AI chatbot development
- RAG system implementation
- Web platform development
- Custom AI applications
- Conversational media systems

### 3. Technical (category: "technical")
- RAG technology explanations
- Architecture documentation
- Integration guides
- Technical capabilities

### 4. Business (category: "business")
- Pricing information
- Timeline and delivery schedules
- Process and methodology
- ROI and value propositions

### 5. Case Studies (category: "case-studies")
- Project examples
- Client success stories
- Implementation details
- Results and outcomes

### 6. Tech Documentation (category: "tech-docs")
- API documentation
- Integration guides
- Developer resources
- Technical specifications

## API Operations

### Upsert Vectors

**Endpoint:** `POST /v1/public/zerodb/vectors/upsert`

**Request:**
```json
{
  "collection_name": "blaq_knowledge_base",
  "vectors": [
    {
      "id": "unique-identifier",
      "text": "Content to be embedded",
      "metadata": {
        "topic": "topic name",
        "category": "category name",
        "keywords": ["keyword1", "keyword2"]
      }
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "inserted": 1,
  "updated": 0
}
```

### Search Similar Text

**Endpoint:** `POST /v1/public/zerodb/vectors/search/text`

**Request:**
```json
{
  "collection_name": "blaq_knowledge_base",
  "query_text": "What services does Blaq Digital offer?",
  "top_k": 5
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "full-services",
      "text": "Content...",
      "metadata": {
        "topic": "all services",
        "category": "services",
        "keywords": ["services", "offerings"]
      },
      "score": 0.92
    }
  ]
}
```

## Usage Examples

### TypeScript Client (lib/zerodb.ts)

```typescript
import { zerodb } from '@/lib/zerodb';

// Search knowledge base
const results = await zerodb.searchSimilarText(
  'blaq_knowledge_base',
  'How does RAG technology work?',
  5
);

// Add new knowledge
await zerodb.upsertVectors('blaq_knowledge_base', [
  {
    id: 'new-topic',
    text: 'Detailed content about new topic...',
    metadata: {
      topic: 'new topic',
      category: 'technical',
      keywords: ['new', 'topic', 'keywords']
    }
  }
]);
```

### Server Action

```typescript
'use server'

import { zerodb } from '@/lib/zerodb';

export async function searchKnowledge(query: string) {
  zerodb.setApiKey(process.env.NEXT_PUBLIC_AINATIVE_API_KEY!);

  const results = await zerodb.searchSimilarText(
    'blaq_knowledge_base',
    query,
    5
  );

  return results;
}
```

## Content Guidelines

### Writing Effective Knowledge Base Entries

1. **Clarity:** Write in clear, concise language
2. **Completeness:** Include all relevant details in each entry
3. **Context:** Provide sufficient context for standalone understanding
4. **Keywords:** Include natural variations of search terms
5. **Length:** Aim for 100-500 words per entry for optimal embedding

### Best Practices

- **Avoid Duplication:** Each entry should cover a unique topic
- **Use Natural Language:** Write as you would explain to a human
- **Include Examples:** Concrete examples improve understanding
- **Update Regularly:** Keep content current and accurate
- **Test Searches:** Verify that common queries return relevant results

## Seeding the Collection

### Using the Seed Script

```bash
# Run the knowledge base seeding script
npm run seed:kb
```

The script (`scripts/seed-knowledge-base.ts`) will:
1. Connect to ZeroDB using API credentials
2. Prepare all knowledge base entries
3. Upload vectors with metadata
4. Verify successful insertion

### Adding New Content

1. Edit `scripts/seed-knowledge-base.ts`
2. Add new entries to the `knowledgeBase` array
3. Follow the schema structure
4. Run `npm run seed:kb` to update the collection

## Testing

### Manual Testing

```bash
# Test vector search
npm run test:vectors
```

### Validation Checklist

- [ ] All vectors have unique IDs
- [ ] Text content is meaningful and complete
- [ ] Metadata follows schema
- [ ] Categories are consistent
- [ ] Keywords are relevant
- [ ] Search returns expected results
- [ ] Similarity scores are reasonable (>0.7 for relevant matches)

## Performance Considerations

### Vector Search Performance

- **Top K:** Default to 5-10 results for optimal response time
- **Threshold:** Filter results with score < 0.7 to reduce irrelevant matches
- **Caching:** Consider caching frequent queries
- **Batch Updates:** Use batch upsert for bulk operations

### Scaling

- **Collection Size:** Optimized for up to 10,000 entries
- **Query Latency:** < 100ms for typical searches
- **Concurrent Users:** Supports multiple simultaneous queries
- **Update Frequency:** Can handle real-time updates

## Monitoring and Maintenance

### Key Metrics

- Query response time
- Search result relevance (user feedback)
- Collection size and growth
- Most/least searched topics
- Update frequency

### Regular Tasks

- **Weekly:** Review search analytics
- **Monthly:** Update content based on common queries
- **Quarterly:** Audit and refresh outdated information
- **As Needed:** Add new topics and services

## Security and Access Control

### Authentication

All API requests require:
- **API Key:** Set in environment variables
- **Project ID:** Scoped to `blaq-digital-prod`
- **HTTPS:** All connections encrypted

### Data Privacy

- No personally identifiable information (PII) in vectors
- Public knowledge base content only
- Audit logs for all modifications
- Secure credential management

## Troubleshooting

### Common Issues

**Problem:** Low similarity scores for relevant queries
**Solution:** Review and enhance text content, add more context

**Problem:** Missing results for expected queries
**Solution:** Add keywords to metadata, verify content coverage

**Problem:** Duplicate results
**Solution:** Review IDs for uniqueness, consolidate similar content

**Problem:** Slow search performance
**Solution:** Reduce top_k value, check network latency

## Integration Points

### Chatbot Integration

The collection is primarily used by the AI chatbot (`app/api/chat/route.ts`) to:
1. Receive user questions
2. Search for relevant knowledge
3. Generate context-aware responses
4. Maintain conversation quality

### Future Extensions

- Multi-language support
- Advanced filtering by metadata
- Hybrid search (keyword + semantic)
- A/B testing for content variations
- Analytics dashboard

## References

- [REST API Integration Guide](/docs/api/REST_API_INTEGRATION.md)
- [ZeroDB Documentation](https://api.ainative.studio/docs)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)

---

**Last Updated:** 2026-01-30
**Version:** 1.0
**Maintained By:** Blaq Digital Engineering Team
