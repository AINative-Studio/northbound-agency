# Blaq Digital → ZeroDB + AINative Authentication Migration Plan

## Executive Summary

This document outlines the complete migration strategy for transitioning Blaq Digital from Supabase to ZeroDB with AINative authentication. The site will be deployed as a subdomain: `blaq.ainative.studio`.

**Migration Scope:**
- Remove all Supabase dependencies and operations
- Replace all mock/fake data with real database-backed data
- Implement ZeroDB REST API for database operations
- Replace fake RAG implementation with real vector search
- Integrate AINative authentication backend
- Replace UI components with AIKit Next.js components where possible

---

## Current State Analysis

### Database Operations (Supabase)
**Total Supabase operations found: 2 INSERT operations**

1. **Contact Form Submission** (`app/contact/page.tsx:42-56`)
   - Table: `contact_submissions`
   - Operation: INSERT
   - Fields: name, company, email, project_type, description

2. **Chat Log Storage** (`app/api/chat/route.ts:153-158`)
   - Table: `chat_logs`
   - Operation: INSERT
   - Fields: session_id, message, response, message_type

**Note:** No SELECT operations found - all displayed data is currently hardcoded.

### Database Schema (3 Tables)

#### 1. contact_submissions
```sql
id uuid PRIMARY KEY
name text NOT NULL
company text
email text NOT NULL
project_type text NOT NULL
description text NOT NULL
created_at timestamptz DEFAULT now()
```

#### 2. case_studies
```sql
id uuid PRIMARY KEY
title text NOT NULL
client text NOT NULL
problem text NOT NULL
solution text NOT NULL
tech_stack text[] DEFAULT '{}'
ai_used text NOT NULL
outcome text NOT NULL
image_url text
published boolean DEFAULT false
order_index integer DEFAULT 0
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()
```

#### 3. chat_logs
```sql
id uuid PRIMARY KEY
session_id text NOT NULL
message text NOT NULL
response text NOT NULL
message_type text CHECK IN ('rag', 'chatbot')
created_at timestamptz DEFAULT now()
```

### Mock Data Locations

1. **Fake RAG Implementation** (`app/api/chat/route.ts:4-103`)
   - 103 lines of hardcoded keyword-to-response dictionary
   - Must be replaced with real vector search using ZeroDB

2. **Hardcoded Services** (`app/page.tsx:7-28`)
   - 4 service objects (AI Apps, RAG Bots, Conversational Media, Web Platforms)
   - Currently static arrays, should potentially move to database

3. **Hardcoded Differentiators** (`app/page.tsx:30-51`)
   - 4 differentiator objects (AI-Native, Culture-First, Ownership-Driven, Engineering-Led)
   - Currently static arrays, should potentially move to database

### Current Dependencies

**To be removed:**
- `@supabase/supabase-js: ^2.58.0`

**To be added:**
- `axios: ^1.6.0` (for ZeroDB REST API calls)

---

## Target State Architecture

### ZeroDB REST API Integration

**Base URL:** `NEXT_PUBLIC_AINATIVE_API_URL` (from environment)

**Authentication:** Dual-mode (auto-detected)
- If API key starts with `eyJ` → JWT Bearer token: `Authorization: Bearer {token}`
- Otherwise → API key: `X-API-Key: {apiKey}`

**API Endpoints:**

#### Projects
- `GET /v1/public/zerodb/projects` - List projects
- `POST /v1/public/zerodb/projects` - Create project
- `GET /v1/public/zerodb/projects/{projectId}` - Get project
- `PUT /v1/public/zerodb/projects/{projectId}` - Update project
- `DELETE /v1/public/zerodb/projects/{projectId}` - Delete project

#### PostgreSQL Tables
- `POST /v1/public/zerodb/tables` - Create table
- `GET /v1/public/zerodb/tables` - List tables
- `POST /v1/public/zerodb/tables/{tableName}/insert` - Insert rows
- `POST /v1/public/zerodb/tables/{tableName}/query` - Query rows

#### Vector Operations (RAG)
- `POST /v1/public/zerodb/vectors/search/text` - Text similarity search
- `POST /v1/public/zerodb/vectors/upsert` - Upsert vectors
- `POST /v1/public/zerodb/zeroml/models/{modelId}/embed` - Generate embeddings

#### Memory (Chat History)
- `POST /projects/{projectId}/database/memory/store` - Store memory
- `POST /projects/{projectId}/database/memory/search` - Search memory
- `GET /projects/{projectId}/database/memory` - List memory

---

## Migration Tasks

### Phase 1: Foundation Setup

#### Task 1.1: Environment Configuration
**File:** `.env`

**Changes:**
```bash
# REMOVE these lines:
NEXT_PUBLIC_SUPABASE_URL=https://oqvvdouxxhhksltulget.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ADD these lines:
NEXT_PUBLIC_AINATIVE_API_URL=https://api.ainative.studio
NEXT_PUBLIC_AINATIVE_API_KEY=<your_api_key_or_jwt_token>
NEXT_PUBLIC_ZERODB_PROJECT_ID=<your_project_id>
```

**Acceptance Criteria:**
- [ ] Supabase environment variables removed
- [ ] AINative API URL configured
- [ ] API key/JWT token configured
- [ ] ZeroDB project ID configured
- [ ] Environment variables accessible via `process.env.NEXT_PUBLIC_*`

---

#### Task 1.2: Update Dependencies
**File:** `package.json`

**Changes:**
```json
// REMOVE:
"@supabase/supabase-js": "^2.58.0"

// ADD:
"axios": "^1.6.0"
```

**Commands:**
```bash
npm uninstall @supabase/supabase-js
npm install axios@^1.6.0
```

**Acceptance Criteria:**
- [ ] Supabase package removed from package.json
- [ ] Axios package added to dependencies
- [ ] `npm install` runs without errors
- [ ] No broken imports in codebase

---

#### Task 1.3: Create ZeroDB Client
**File:** `lib/zerodb.ts` (replaces `lib/supabase.ts`)

**Implementation:**
```typescript
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ZeroDBClient {
  private client: AxiosInstance;
  private apiKey: string | null = null;
  private projectId: string;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_AINATIVE_API_URL!;
    this.projectId = process.env.NEXT_PUBLIC_ZERODB_PROJECT_ID!;

    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (this.apiKey) {
        // Auto-detect JWT vs API key
        if (this.apiKey.startsWith('eyJ')) {
          config.headers.Authorization = `Bearer ${this.apiKey}`;
        } else {
          config.headers['X-API-Key'] = this.apiKey;
        }
      }
      return config;
    });
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Table Operations
  async insertTable<T>(tableName: string, data: T): Promise<any> {
    const response = await this.client.post(
      `/v1/public/zerodb/tables/${tableName}/insert`,
      { rows: [data] }
    );
    return response.data;
  }

  async queryTable(tableName: string, filter?: any): Promise<any> {
    const response = await this.client.post(
      `/v1/public/zerodb/tables/${tableName}/query`,
      { filter, limit: 100 }
    );
    return response.data;
  }

  // Vector Operations
  async searchSimilarText(
    collectionName: string,
    queryText: string,
    topK: number = 10
  ): Promise<any> {
    const response = await this.client.post(
      '/v1/public/zerodb/vectors/search/text',
      {
        collection_name: collectionName,
        query_text: queryText,
        top_k: topK,
      }
    );
    return response.data;
  }

  async upsertVectors(
    collectionName: string,
    vectors: Array<{
      id: string;
      vector?: number[];
      text?: string;
      metadata?: Record<string, any>;
    }>
  ): Promise<any> {
    const response = await this.client.post(
      '/v1/public/zerodb/vectors/upsert',
      {
        collection_name: collectionName,
        vectors,
      }
    );
    return response.data;
  }

  // Memory Operations
  async storeMemory(data: {
    session_id: string;
    message: string;
    response: string;
    message_type: string;
  }): Promise<any> {
    const response = await this.client.post(
      `/projects/${this.projectId}/database/memory/store`,
      {
        agent_id: 'blaq-chatbot',
        session_id: data.session_id,
        content: data.message,
        role: 'user',
        metadata: {
          response: data.response,
          message_type: data.message_type,
        },
      }
    );
    return response.data;
  }

  async searchMemory(sessionId: string, query: string, limit: number = 10): Promise<any> {
    const response = await this.client.post(
      `/projects/${this.projectId}/database/memory/search`,
      {
        query,
        session_id: sessionId,
        limit,
      }
    );
    return response.data;
  }
}

// Singleton instance
export const zerodb = new ZeroDBClient();

// Initialize with API key from environment
if (typeof window !== 'undefined') {
  // Client-side: use public API key
  zerodb.setApiKey(process.env.NEXT_PUBLIC_AINATIVE_API_KEY!);
}
```

**Acceptance Criteria:**
- [ ] `lib/zerodb.ts` created with complete implementation
- [ ] `lib/supabase.ts` deleted
- [ ] Dual authentication (JWT/API key) implemented
- [ ] Table insert/query methods implemented
- [ ] Vector search methods implemented
- [ ] Memory operations implemented
- [ ] Singleton pattern with environment-based initialization

---

### Phase 2: Database Schema Migration

#### Task 2.1: Create ZeroDB Tables
**Implementation:** Create migration script or manual setup

**Tables to create:**

1. **contact_submissions**
```json
{
  "name": "contact_submissions",
  "schema": {
    "id": "uuid",
    "name": "text",
    "company": "text",
    "email": "text",
    "project_type": "text",
    "description": "text",
    "created_at": "timestamptz"
  }
}
```

2. **case_studies**
```json
{
  "name": "case_studies",
  "schema": {
    "id": "uuid",
    "title": "text",
    "client": "text",
    "problem": "text",
    "solution": "text",
    "tech_stack": "text[]",
    "ai_used": "text",
    "outcome": "text",
    "image_url": "text",
    "published": "boolean",
    "order_index": "integer",
    "created_at": "timestamptz",
    "updated_at": "timestamptz"
  }
}
```

3. **chat_logs**
```json
{
  "name": "chat_logs",
  "schema": {
    "id": "uuid",
    "session_id": "text",
    "message": "text",
    "response": "text",
    "message_type": "text",
    "created_at": "timestamptz"
  }
}
```

**Acceptance Criteria:**
- [ ] All 3 tables created in ZeroDB
- [ ] Schema matches Supabase structure
- [ ] Default values configured where applicable
- [ ] Indexes created for frequently queried fields

---

#### Task 2.2: Create RAG Vector Collection
**Collection:** `blaq_knowledge_base`

**Purpose:** Store vectorized knowledge for RAG chatbot

**Implementation:**
```typescript
// One-time setup script or admin function
import { zerodb } from '@/lib/zerodb';

async function setupRAGCollection() {
  await zerodb.client.post('/v1/public/zerodb/collections', {
    name: 'blaq_knowledge_base',
    dimension: 1536, // OpenAI text-embedding-3-small
    metric: 'cosine',
    metadata_schema: {
      source: 'text',
      category: 'text',
      topic: 'text',
    },
  });
}
```

**Initial Data to Vectorize:**

Topics to include in knowledge base:
- Blaq Digital services (AI Apps, RAG Bots, Conversational Media, Web Platforms)
- Company differentiators (AI-Native, Culture-First, Ownership-Driven, Engineering-Led)
- AI and Black media industry knowledge
- Technical capabilities (Next.js, React, TypeScript, AI/ML)
- Contact and engagement processes

**Acceptance Criteria:**
- [ ] `blaq_knowledge_base` collection created
- [ ] Vector dimension set to 1536 (OpenAI embeddings)
- [ ] Cosine similarity metric configured
- [ ] Metadata schema defined
- [ ] Initial knowledge base content vectorized and uploaded

---

### Phase 3: Replace Database Operations

#### Task 3.1: Replace Contact Form Submission
**File:** `app/contact/page.tsx`

**Current code (lines 42-56):**
```typescript
const { error: submitError } = await supabase
  .from('contact_submissions')
  .insert([
    {
      name: formData.name,
      company: formData.company || null,
      email: formData.email,
      project_type: formData.projectType,
      description: formData.description,
    },
  ]);
```

**Replace with:**
```typescript
import { zerodb } from '@/lib/zerodb';

try {
  await zerodb.insertTable('contact_submissions', {
    name: formData.name,
    company: formData.company || null,
    email: formData.email,
    project_type: formData.projectType,
    description: formData.description,
    created_at: new Date().toISOString(),
  });
} catch (error: any) {
  const submitError = error;
  // Handle error...
}
```

**Additional changes:**
- Update import statement: remove `import { supabase }`, add `import { zerodb }`
- Update error handling to work with axios errors
- Test form submission end-to-end

**Acceptance Criteria:**
- [ ] Import statement updated
- [ ] Supabase insert replaced with ZeroDB insert
- [ ] Error handling updated for axios errors
- [ ] Form submission tested successfully
- [ ] Data visible in ZeroDB table

---

#### Task 3.2: Replace Chat Log Storage
**File:** `app/api/chat/route.ts`

**Current code (lines 153-158):**
```typescript
await supabase.from('chat_logs').insert({
  session_id: sessionId,
  message,
  response,
  message_type: type,
});
```

**Replace with:**
```typescript
import { zerodb } from '@/lib/zerodb';

await zerodb.storeMemory({
  session_id: sessionId,
  message,
  response,
  message_type: type,
});
```

**Note:** Using `storeMemory()` instead of `insertTable()` because:
- Chat history benefits from semantic search capabilities
- Memory API provides session-based querying
- Enables future conversation context retrieval

**Acceptance Criteria:**
- [ ] Import statement updated
- [ ] Chat log storage replaced with memory API
- [ ] Session ID properly tracked
- [ ] Chat logs retrievable via `searchMemory()`

---

### Phase 4: Replace Fake RAG Implementation

#### Task 4.1: Remove Fake Keyword Matching
**File:** `app/api/chat/route.ts`

**Current implementation (lines 4-103):**
103 lines of hardcoded keyword dictionary - **DELETE ENTIRELY**

**Acceptance Criteria:**
- [ ] All 103 lines of fake RAG dictionary removed
- [ ] No references to hardcoded responses remain

---

#### Task 4.2: Implement Real Vector Search RAG
**File:** `app/api/chat/route.ts`

**New implementation:**
```typescript
import { zerodb } from '@/lib/zerodb';

export async function POST(request: Request) {
  try {
    const { message, sessionId = crypto.randomUUID() } = await request.json();

    if (!message?.trim()) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Step 1: Vector search for relevant context
    const searchResults = await zerodb.searchSimilarText(
      'blaq_knowledge_base',
      message,
      5 // top 5 results
    );

    // Step 2: Build context from search results
    const context = searchResults.results
      .map((result: any) => result.metadata.text || result.document)
      .join('\n\n');

    // Step 3: Generate response using AI (placeholder for future AI integration)
    // For now, return the most relevant context
    const response = searchResults.results.length > 0
      ? `Based on our knowledge: ${searchResults.results[0].metadata.text || searchResults.results[0].document}`
      : "I'd be happy to help! Please tell me more about what you're looking for.";

    // Step 4: Store chat interaction in memory
    await zerodb.storeMemory({
      session_id: sessionId,
      message,
      response,
      message_type: 'rag',
    });

    return Response.json({
      response,
      sessionId,
      sources: searchResults.results.map((r: any) => ({
        text: r.metadata.text,
        similarity: r.score,
      })),
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return Response.json(
      { error: 'Failed to process message', details: error.message },
      { status: 500 }
    );
  }
}
```

**Future Enhancement:**
- Integrate with Claude API or other LLM to generate natural responses
- Use retrieved context as RAG context for AI generation
- Implement conversation history retrieval from memory API

**Acceptance Criteria:**
- [ ] Fake RAG dictionary completely removed
- [ ] Real vector search implemented using `searchSimilarText()`
- [ ] Top K results retrieved (K=5)
- [ ] Context built from search results
- [ ] Response generated from relevant context
- [ ] Chat interaction stored in memory API
- [ ] Sources/similarity scores returned to frontend
- [ ] Error handling for failed searches

---

### Phase 5: Authentication Integration

#### Task 5.1: Install AINative Auth Middleware
**File:** `middleware.ts` (create new file)

**Implementation:**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get auth cookie
  const authCookie = request.cookies.get('ainative_token');

  // Protected routes that require authentication
  const protectedPaths = ['/admin', '/api/admin'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !authCookie) {
    // Redirect to login or return 401
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
```

**Acceptance Criteria:**
- [ ] Middleware created for route protection
- [ ] Auth cookie detection implemented
- [ ] Protected routes defined
- [ ] Redirect to login for unauthorized access

---

#### Task 5.2: Create Protected API Routes
**File:** `app/api/admin/case-studies/route.ts` (example)

**Implementation:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { zerodb } from '@/lib/zerodb';

function getAuthFromRequest(request: NextRequest): string | null {
  const authCookie = request.cookies.get('ainative_token');
  return authCookie?.value || null;
}

export async function GET(request: NextRequest) {
  const apiKey = getAuthFromRequest(request);

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Set API key for this request
  zerodb.setApiKey(apiKey);

  // Query case studies
  const caseStudies = await zerodb.queryTable('case_studies');

  return NextResponse.json(caseStudies);
}
```

**Routes to protect:**
- `/api/admin/case-studies` - Manage case studies
- `/api/admin/contacts` - View contact submissions
- `/api/admin/chat-logs` - View chat logs

**Acceptance Criteria:**
- [ ] Admin API routes created
- [ ] Auth cookie extraction implemented
- [ ] 401 responses for unauthorized requests
- [ ] API key passed to ZeroDB client per request

---

### Phase 6: Component Replacement

#### Task 6.1: Replace with AIKit Components (Direct 1:1)
**Components with direct replacements (9 total):**

| Current Component | AIKit Replacement | File Location |
|------------------|-------------------|---------------|
| `@/components/ui/button` | `@/core/components/ui/button` | Multiple files |
| `@/components/ui/card` | `@/core/components/ui/card` | `app/page.tsx`, etc. |
| `@/components/ui/input` | `@/core/components/ui/input` | `app/contact/page.tsx` |
| `@/components/ui/label` | `@/core/components/ui/label` | `app/contact/page.tsx` |
| `@/components/ui/textarea` | `@/core/components/ui/textarea` | `app/contact/page.tsx` |
| `@/components/ui/dialog` | `@/core/components/ui/dialog` | Chat components |
| `@/components/ui/tabs` | `@/core/components/ui/tabs` | Demo pages |
| `@/components/ui/toast` | `@/core/components/ui/toast` | Form handlers |
| `@/components/ui/badge` | `@/core/components/ui/badge` | Status indicators |

**Implementation:** Find and replace imports globally

**Example:**
```typescript
// OLD:
import { Button } from '@/components/ui/button';

// NEW:
import { Button } from '@/core/components/ui/button';
```

**Acceptance Criteria:**
- [ ] All 9 component imports updated
- [ ] No broken imports
- [ ] Component props compatible (same API)
- [ ] Visual regression testing passed

---

#### Task 6.2: Adapt Navigation Component
**Component:** Navigation header/navbar

**Current:** `@/components/navigation`
**Target:** `@/core/components/navigation`

**Issue:** AIKit Navigation uses React Router, Blaq Digital uses Next.js

**Adaptation required:**
```typescript
// AIKit Navigation uses:
import { Link } from 'react-router-dom';

// Must convert to Next.js:
import Link from 'next/link';

// Convert <Link to="/path"> to <Link href="/path">
```

**Acceptance Criteria:**
- [ ] AIKit Navigation component copied to Blaq Digital
- [ ] All React Router Links converted to Next.js Links
- [ ] `to` prop replaced with `href` prop
- [ ] Navigation functionality tested
- [ ] Active link states work correctly

---

#### Task 6.3: Adapt Footer Component
**Component:** Footer

**Current:** `@/components/footer`
**Target:** `@