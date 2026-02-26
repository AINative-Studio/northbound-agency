# REST API Integration Guide for Northbound Studio

## Overview

This guide documents how to integrate with the AINative/ZeroDB REST APIs from the frontend UI. **DO NOT use MCP servers or clients** - use direct REST API calls via the `lib/zerodb.ts` client.

---

## Configuration

### Environment Variables

The following environment variables are configured in `.env`:

```bash
# Public variables (exposed to browser via NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_AINATIVE_API_URL="https://api.ainative.studio"
NEXT_PUBLIC_AINATIVE_API_KEY="kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM"
NEXT_PUBLIC_ZERODB_PROJECT_ID="northbound-studio-prod"

# Server-side only (NOT exposed to browser)
ZERODB_USERNAME="admin@ainative.studio"
ZERODB_PASSWORD="Admin2025!Secure"
ZERODB_API_TOKEN="kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM"
```

### API Client

The REST API client is available at `lib/zerodb.ts` and provides a singleton instance:

```typescript
import { zerodb } from '@/lib/zerodb';

// Client is pre-configured with:
// - Base URL: https://api.ainative.studio
// - Authentication: Bearer token (automatically added to headers)
// - Timeout: 30 seconds
// - JSON content type
```

---

## Available REST API Endpoints

### Base URL Structure

All API endpoints follow this pattern:
```
https://api.ainative.studio/v1/{category}/{endpoint}
```

**Important**: Do NOT include `/api/v1` in the base URL variable. Always use full paths:
```typescript
// ✅ CORRECT
const baseUrl = "https://api.ainative.studio";
const endpoint = "/v1/admin/zerodb/collections";

// ❌ WRONG
const baseUrl = "https://api.ainative.studio/api/v1";
```

---

## Common Operations

### 1. Table Operations (NoSQL Database)

#### Insert Data into Table

```typescript
import { zerodb } from '@/lib/zerodb';

// Insert single record
const result = await zerodb.insertTable('contacts', {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Interested in services',
  created_at: new Date().toISOString()
});

console.log('Inserted ID:', result.id);
```

**REST Endpoint:**
```
POST /v1/public/zerodb/tables/{tableName}/insert
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "rows": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "message": "Interested in services",
      "created_at": "2026-01-30T19:00:00Z"
    }
  ]
}
```

#### Query Table Data

```typescript
// Query with filter
const contacts = await zerodb.queryTable('contacts', {
  created_at: { $gte: '2026-01-01' }
});

// Query all records
const allContacts = await zerodb.queryTable('contacts');
```

**REST Endpoint:**
```
POST /v1/public/zerodb/tables/{tableName}/query
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "filter": {
    "created_at": { "$gte": "2026-01-01" }
  },
  "limit": 100
}
```

---

### 2. Vector Search Operations

#### Search Similar Text (Semantic Search)

```typescript
// Search for similar content
const results = await zerodb.searchSimilarText(
  'portfolio_projects',
  'modern web design with animations',
  10 // top 10 results
);

results.forEach(result => {
  console.log('Match:', result.text, 'Score:', result.score);
});
```

**REST Endpoint:**
```
POST /v1/public/zerodb/vectors/search/text
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "collection_name": "portfolio_projects",
  "query_text": "modern web design with animations",
  "top_k": 10
}
```

#### Upsert Vectors (Store Embeddings)

```typescript
// Store project data with embeddings
await zerodb.upsertVectors('portfolio_projects', [
  {
    id: 'project-1',
    text: 'E-commerce platform with React and Node.js',
    metadata: {
      client: 'Acme Corp',
      year: 2026,
      tech_stack: ['React', 'Node.js', 'PostgreSQL']
    }
  },
  {
    id: 'project-2',
    text: 'Mobile app for fitness tracking',
    metadata: {
      client: 'FitLife',
      year: 2025,
      tech_stack: ['React Native', 'Firebase']
    }
  }
]);
```

**REST Endpoint:**
```
POST /v1/public/zerodb/vectors/upsert
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "collection_name": "portfolio_projects",
  "vectors": [
    {
      "id": "project-1",
      "text": "E-commerce platform with React and Node.js",
      "metadata": {
        "client": "Acme Corp",
        "year": 2026,
        "tech_stack": ["React", "Node.js", "PostgreSQL"]
      }
    }
  ]
}
```

---

### 3. Memory Operations (Chatbot/AI Context)

#### Store Conversation Memory

```typescript
// Store user message and AI response
await zerodb.storeMemory({
  session_id: 'user-123-session',
  message: 'What services do you offer?',
  response: 'We offer web development, mobile apps, and AI integration.',
  message_type: 'inquiry'
});
```

**REST Endpoint:**
```
POST /projects/{projectId}/database/memory/store
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "agent_id": "blaq-chatbot",
  "session_id": "user-123-session",
  "content": "What services do you offer?",
  "role": "user",
  "metadata": {
    "response": "We offer web development, mobile apps, and AI integration.",
    "message_type": "inquiry"
  }
}
```

#### Search Conversation History

```typescript
// Search past conversations
const history = await zerodb.searchMemory(
  'user-123-session',
  'pricing',
  5 // top 5 relevant messages
);
```

**REST Endpoint:**
```
POST /projects/{projectId}/database/memory/search
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "query": "pricing",
  "session_id": "user-123-session",
  "limit": 5
}
```

---

## Usage Examples

### Example 1: Contact Form Submission

```typescript
// app/contact/actions.ts
'use server'

import { zerodb } from '@/lib/zerodb';

export async function submitContactForm(formData: FormData) {
  try {
    const result = await zerodb.insertTable('contact_submissions', {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      source: 'website_contact_form',
      created_at: new Date().toISOString(),
      status: 'new'
    });

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}
```

### Example 2: Portfolio Search

```typescript
// app/portfolio/search.tsx
'use client'

import { useState } from 'react';
import { zerodb } from '@/lib/zerodb';

export default function PortfolioSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const searchResults = await zerodb.searchSimilarText(
      'portfolio_projects',
      query,
      10
    );
    setResults(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
      />
      <button onClick={handleSearch}>Search</button>

      {results.map(result => (
        <div key={result.id}>
          <h3>{result.metadata.client}</h3>
          <p>{result.text}</p>
          <span>Relevance: {result.score.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Chatbot with Memory

```typescript
// app/components/chatbot.tsx
'use client'

import { useState, useEffect } from 'react';
import { zerodb } from '@/lib/zerodb';

export default function Chatbot() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = input;
    setInput('');

    // Add to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Get AI response (from your AI service)
    const aiResponse = await getAIResponse(userMessage);

    // Store in memory
    await zerodb.storeMemory({
      session_id: sessionId,
      message: userMessage,
      response: aiResponse,
      message_type: 'conversation'
    });

    // Add AI response to UI
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
    </div>
  );
}
```

---

## Authentication

### Client-Side (Browser)

Authentication is handled automatically by the `zerodb` client using the `NEXT_PUBLIC_AINATIVE_API_KEY`:

```typescript
// Automatically added to all requests
headers: {
  'Authorization': 'Bearer kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM'
}
```

### Server-Side (API Routes/Server Actions)

For server-side operations, you can use the non-public environment variables:

```typescript
// app/api/admin/route.ts
import axios from 'axios';

export async function GET() {
  const response = await axios.get(
    'https://api.ainative.studio/v1/admin/zerodb/analytics/usage',
    {
      headers: {
        'Authorization': `Bearer ${process.env.ZERODB_API_TOKEN}`
      }
    }
  );

  return Response.json(response.data);
}
```

---

## Error Handling

```typescript
import { zerodb } from '@/lib/zerodb';

try {
  const result = await zerodb.insertTable('contacts', data);
  return { success: true, data: result };
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.status, error.response?.data);
    return {
      success: false,
      error: error.response?.data?.detail || 'API request failed'
    };
  }

  console.error('Unexpected error:', error);
  return { success: false, error: 'An unexpected error occurred' };
}
```

---

## Rate Limits

The API has rate limits per endpoint:
- **Login**: 10 requests/minute
- **Registration**: 5 requests/hour
- **Password Reset**: 3 requests/hour
- **General endpoints**: Check response headers for rate limit info

---

## Security Best Practices

1. **Never expose server-side credentials** (`ZERODB_USERNAME`, `ZERODB_PASSWORD`) to the browser
2. **Use NEXT_PUBLIC_ prefix** only for credentials safe to expose to browsers
3. **Validate user input** before sending to API
4. **Use server actions** for sensitive operations instead of client-side API calls
5. **Implement CORS properly** if deploying to multiple domains

---

## Testing REST API Calls

### Using cURL

```bash
# Test health endpoint
curl https://api.ainative.studio/health

# Test authenticated endpoint
curl https://api.ainative.studio/v1/admin/zerodb/analytics/usage \
  -H "Authorization: Bearer kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM"

# Test table insert
curl -X POST https://api.ainative.studio/v1/public/zerodb/tables/contacts/insert \
  -H "Authorization: Bearer kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM" \
  -H "Content-Type: application/json" \
  -d '{
    "rows": [{
      "name": "Test User",
      "email": "test@example.com"
    }]
  }'
```

### Using Browser DevTools

```javascript
// Open browser console on your site and run:
const response = await fetch('https://api.ainative.studio/v1/admin/zerodb/analytics/usage', {
  headers: {
    'Authorization': 'Bearer kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF2XwyUnxBEOM'
  }
});
const data = await response.json();
console.log(data);
```

---

## Additional Resources

- **API Documentation**: https://api.ainative.studio/docs
- **OpenAPI Spec**: https://api.ainative.studio/v1/openapi.json
- **Health Check**: https://api.ainative.studio/health

---

## Summary

✅ **Use REST APIs directly** via `lib/zerodb.ts`
❌ **Do NOT use MCP servers/clients** for UI integration
✅ **Environment variables configured** in `.env`
✅ **Authentication handled automatically** by the client
✅ **Examples provided** for common operations

**Next Steps:**
1. Import `zerodb` from `@/lib/zerodb` in your components
2. Use the provided methods for tables, vectors, and memory operations
3. Handle errors properly with try-catch blocks
4. Test thoroughly before deploying to production
