# Admin API Documentation

## Overview

This document provides comprehensive documentation for the protected admin API routes in the Blaq Digital application. All endpoints require authentication via AINative Auth and implement security best practices including rate limiting, input validation, and XSS prevention.

---

## Table of Contents

1. [Authentication](#authentication)
2. [Case Studies API](#case-studies-api)
3. [Contacts API](#contacts-api)
4. [Chat Logs API](#chat-logs-api)
5. [Error Handling](#error-handling)
6. [Security Features](#security-features)
7. [Testing](#testing)
8. [Usage Examples](#usage-examples)

---

## Authentication

All admin API routes are protected by the authentication middleware located at `/middleware.ts`. The middleware checks for the presence of a valid authentication token before allowing access to protected routes.

### Authentication Methods

#### 1. Cookie-based Authentication (Recommended for Web Apps)
```
Cookie: ainative_token=<JWT_TOKEN_OR_API_KEY>
```

#### 2. Bearer Token Authentication (For API Clients)
```
Authorization: Bearer <JWT_TOKEN>
```

#### 3. API Key Authentication
```
X-API-Key: <API_KEY>
```

### Token Verification

Tokens are verified against the AINative API endpoint:
```
GET https://api.ainative.studio/v1/admin/auth/me
```

The authentication flow:
1. Extract token from request (cookie, Authorization header, or X-API-Key header)
2. Verify token with AINative API
3. Return user information if valid
4. Return 401 error if invalid or missing

---

## Case Studies API

### Base Endpoint
```
/api/admin/case-studies
```

### GET - Query Case Studies

Retrieve case studies with optional filtering and pagination.

**Request:**
```http
GET /api/admin/case-studies?published=true&limit=10&offset=0
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 100 | Number of results to return (max: 500) |
| `offset` | number | 0 | Number of results to skip |
| `published` | boolean | - | Filter by published status |
| `sort_by` | string | order_index | Field to sort by |
| `sort_order` | string | asc | Sort direction (asc/desc) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "case_studies": [
      {
        "id": "uuid",
        "title": "AI Chatbot Platform",
        "client": "Tech Startup Inc",
        "problem": "Need for 24/7 customer support",
        "solution": "RAG-powered AI chatbot",
        "tech_stack": ["React", "Node.js", "OpenAI"],
        "ai_used": "GPT-4 with RAG",
        "outcome": "Reduced support costs by 60%",
        "image_url": "https://example.com/image.jpg",
        "published": true,
        "order_index": 1,
        "created_at": "2026-01-30T10:00:00Z",
        "updated_at": "2026-01-30T10:00:00Z"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  },
  "message": "Retrieved 1 case studies"
}
```

### POST - Create Case Study

Create a new case study entry.

**Request:**
```http
POST /api/admin/case-studies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "AI Chatbot Platform",
  "client": "Tech Startup Inc",
  "problem": "Need for 24/7 customer support",
  "solution": "RAG-powered AI chatbot",
  "tech_stack": ["React", "Node.js", "OpenAI"],
  "ai_used": "GPT-4 with custom RAG implementation",
  "outcome": "Reduced support costs by 60%",
  "image_url": "https://example.com/chatbot.jpg",
  "published": true,
  "order_index": 1
}
```

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Case study title |
| `client` | string | Yes | Client name |
| `problem` | string | Yes | Problem description |
| `solution` | string | Yes | Solution description |
| `tech_stack` | string[] | Yes | Array of technologies used |
| `ai_used` | string | Yes | AI technologies used |
| `outcome` | string | Yes | Project outcomes |
| `image_url` | string | No | URL to case study image |
| `published` | boolean | No | Published status (default: false) |
| `order_index` | number | No | Display order (default: 0) |

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "title": "AI Chatbot Platform",
    ...
  },
  "message": "Case study created successfully"
}
```

**Rate Limits:**
- GET: 100 requests/minute
- POST: 50 requests/minute

---

## Contacts API

### Base Endpoint
```
/api/admin/contacts
```

### GET - Query Contact Submissions

Retrieve contact form submissions with filtering and pagination.

**Request:**
```http
GET /api/admin/contacts?status=new&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 100 | Number of results to return (max: 500) |
| `offset` | number | 0 | Number of results to skip |
| `status` | string | - | Filter by status (new/contacted/in_progress/completed/archived) |
| `email` | string | - | Filter by exact email match |
| `project_type` | string | - | Filter by project type |
| `sort_by` | string | created_at | Field to sort by |
| `sort_order` | string | desc | Sort direction (asc/desc) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "uuid",
        "name": "John Doe",
        "company": "Acme Corp",
        "email": "john@example.com",
        "phone": "+1234567890",
        "project_type": "Web Development",
        "description": "Need a new website",
        "status": "new",
        "created_at": "2026-01-30T10:00:00Z"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  },
  "message": "Retrieved 1 contact submissions"
}
```

### POST - Create Contact Submission

Create a new contact submission (typically used for testing or manual entry).

**Request:**
```http
POST /api/admin/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "company": "Tech Innovations Inc",
  "email": "jane@techinnovations.com",
  "phone": "+1-555-0123",
  "project_type": "AI Development",
  "description": "Looking to build a RAG-powered chatbot",
  "status": "new"
}
```

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Contact name |
| `email` | string | Yes | Valid email address |
| `project_type` | string | Yes | Type of project |
| `description` | string | Yes | Project description |
| `company` | string | No | Company name |
| `phone` | string | No | Phone number |
| `status` | string | No | Status (default: "new") |

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "name": "Jane Smith",
    ...
  },
  "message": "Contact submission created successfully"
}
```

**Rate Limits:**
- GET: 100 requests/minute
- POST: 50 requests/minute

---

## Chat Logs API

### Base Endpoint
```
/api/admin/chat-logs
```

### GET - Query Chat Logs

Retrieve chatbot conversation logs with filtering and session statistics.

**Request:**
```http
GET /api/admin/chat-logs?session_id=session-123&limit=50
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 100 | Number of results to return (max: 500) |
| `offset` | number | 0 | Number of results to skip |
| `session_id` | string | - | Filter by session ID |
| `message_type` | string | - | Filter by type (rag/chatbot) |
| `search` | string | - | Search in message and response text |
| `sort_by` | string | created_at | Field to sort by |
| `sort_order` | string | desc | Sort direction (asc/desc) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "chat_logs": [
      {
        "id": "uuid",
        "session_id": "session-123",
        "message": "What services do you offer?",
        "response": "We offer AI development services...",
        "message_type": "rag",
        "created_at": "2026-01-30T10:00:00Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0,
    "stats": {
      "total_sessions": 5,
      "total_messages": 23,
      "message_types": {
        "rag": 15,
        "chatbot": 8
      },
      "avg_messages_per_session": 4.6
    }
  },
  "message": "Retrieved 1 chat logs"
}
```

### POST - Create Chat Log

Create a new chat log entry.

**Request:**
```http
POST /api/admin/chat-logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "session_id": "session-abc123",
  "message": "How does RAG work?",
  "response": "RAG combines retrieval with generation...",
  "message_type": "rag"
}
```

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `session_id` | string | Yes | Session identifier |
| `message` | string | Yes | User message |
| `response` | string | Yes | Chatbot response |
| `message_type` | string | Yes | Type: "rag" or "chatbot" |

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "session_id": "session-abc123",
    ...
  },
  "message": "Chat log created successfully"
}
```

**Rate Limits:**
- GET: 100 requests/minute
- POST: 50 requests/minute

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": {} // Optional, only in development mode
}
```

### HTTP Status Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request body or validation error |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Insufficient permissions |
| 429 | Rate Limit Exceeded | Too many requests in time window |
| 500 | Internal Server Error | Server-side error |

### Validation Errors

Validation errors return a 400 status with detailed error messages:

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid case study data",
  "details": [
    "Title is required and must be a non-empty string",
    "Tech stack must contain at least one technology"
  ]
}
```

---

## Security Features

### 1. Authentication
- All routes protected by authentication middleware
- Supports multiple auth methods (cookie, bearer token, API key)
- Token verification against AINative API

### 2. Rate Limiting
- Configurable per-endpoint rate limits
- IP-based rate limiting
- Different limits for read (100/min) vs write (50/min) operations

### 3. Input Validation
- Comprehensive validation of all request bodies
- Type checking and format validation
- Required field enforcement

### 4. Input Sanitization
- XSS prevention through HTML tag removal
- Email format validation
- String trimming and normalization

### 5. Error Handling
- Graceful error handling for all operations
- Detailed error messages in development
- Safe error messages in production

### 6. Database Security
- All database operations through ZeroDB REST API
- No direct database access from client
- Query parameter validation

---

## Testing

### Test Coverage

All admin API routes have comprehensive test coverage:

- **Case Studies API:** 14 tests
- **Contacts API:** 16 tests
- **Chat Logs API:** 14 tests

**Total: 44 tests passing with 83%+ code coverage**

### Running Tests

```bash
# Run all admin API tests
npm test -- __tests__/api/admin

# Run with coverage report
npm test -- __tests__/api/admin --coverage

# Run specific test file
npm test -- __tests__/api/admin/case-studies.test.ts

# Run in watch mode
npm test -- __tests__/api/admin --watch
```

### Test Categories

Each endpoint includes tests for:
- ✅ Authentication (401 responses)
- ✅ Rate limiting (429 responses)
- ✅ Input validation (400 responses)
- ✅ Successful operations (200/201 responses)
- ✅ Filtering and pagination
- ✅ XSS prevention
- ✅ Default values
- ✅ Error handling

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Query case studies
async function getCaseStudies() {
  const response = await fetch('/api/admin/case-studies?published=true', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.case_studies;
}

// Create contact submission
async function createContact(contactData) {
  const response = await fetch('/api/admin/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  });

  const result = await response.json();

  if (!result.success) {
    console.error('Error:', result.message, result.details);
    throw new Error(result.message);
  }

  return result.data;
}

// Search chat logs
async function searchChatLogs(searchTerm) {
  const params = new URLSearchParams({
    search: searchTerm,
    limit: '20',
    sort_order: 'desc'
  });

  const response = await fetch(`/api/admin/chat-logs?${params}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  const data = await response.json();
  return {
    logs: data.data.chat_logs,
    stats: data.data.stats
  };
}
```

### cURL Examples

```bash
# Get all case studies
curl -X GET 'http://localhost:3456/api/admin/case-studies' \
  -H 'Authorization: Bearer YOUR_TOKEN'

# Get filtered contacts
curl -X GET 'http://localhost:3456/api/admin/contacts?status=new&limit=10' \
  -H 'Authorization: Bearer YOUR_TOKEN'

# Create case study
curl -X POST 'http://localhost:3456/api/admin/case-studies' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "AI Chatbot",
    "client": "Acme Corp",
    "problem": "Customer support scaling",
    "solution": "RAG-powered chatbot",
    "tech_stack": ["React", "Node.js"],
    "ai_used": "GPT-4",
    "outcome": "50% cost reduction"
  }'

# Search chat logs
curl -X GET 'http://localhost:3456/api/admin/chat-logs?search=pricing' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

### Python Examples

```python
import requests

BASE_URL = "http://localhost:3456"
AUTH_TOKEN = "your_token_here"

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

# Get case studies
response = requests.get(
    f"{BASE_URL}/api/admin/case-studies",
    headers=headers,
    params={"published": "true", "limit": 10}
)
case_studies = response.json()["data"]["case_studies"]

# Create contact
contact_data = {
    "name": "John Doe",
    "email": "john@example.com",
    "project_type": "Web Development",
    "description": "Need a new website"
}
response = requests.post(
    f"{BASE_URL}/api/admin/contacts",
    headers=headers,
    json=contact_data
)
result = response.json()
```

---

## File Structure

```
/Users/aideveloper/Desktop/blaq_digital/
├── app/
│   └── api/
│       └── admin/
│           ├── case-studies/
│           │   └── route.ts          # Case studies endpoint
│           ├── contacts/
│           │   └── route.ts          # Contacts endpoint
│           └── chat-logs/
│               └── route.ts          # Chat logs endpoint
├── lib/
│   └── auth.ts                       # Authentication utilities
├── types/
│   └── admin.ts                      # TypeScript types and validation
├── __tests__/
│   └── api/
│       └── admin/
│           ├── case-studies.test.ts  # Case studies tests
│           ├── contacts.test.ts      # Contacts tests
│           └── chat-logs.test.ts     # Chat logs tests
└── middleware.ts                     # Authentication middleware
```

---

## Next Steps

1. **Admin Dashboard UI**: Build React components to consume these APIs
2. **Advanced Filtering**: Add more complex query capabilities
3. **Bulk Operations**: Support batch create/update/delete
4. **Export Functionality**: Add CSV/Excel export for data
5. **Audit Logging**: Track all admin actions for compliance
6. **Analytics**: Add aggregation endpoints for dashboard metrics

---

## Support

For issues or questions regarding the admin API:
- GitHub Issues: https://github.com/urbantech/blaq_digital/issues
- Documentation: /docs/api/REST_API_INTEGRATION.md
- Migration Plan: /MIGRATION_PLAN.md

---

**Last Updated:** 2026-01-30
**API Version:** 1.0.0
**Status:** Production Ready ✅
