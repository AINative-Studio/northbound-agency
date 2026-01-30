# ZeroDB REST API Quick Reference

## Import

```typescript
import { zerodb } from '@/lib/zerodb';
```

---

## Tables (NoSQL)

### Insert
```typescript
await zerodb.insertTable('tableName', { field: 'value' });
```

### Query
```typescript
await zerodb.queryTable('tableName', { field: { $gte: 'value' } });
```

---

## Vectors (Semantic Search)

### Search
```typescript
await zerodb.searchSimilarText('collection', 'query text', 10);
```

### Upsert
```typescript
await zerodb.upsertVectors('collection', [
  { id: 'id1', text: 'content', metadata: {} }
]);
```

---

## Memory (Chat/AI)

### Store
```typescript
await zerodb.storeMemory({
  session_id: 'session-id',
  message: 'user message',
  response: 'ai response',
  message_type: 'type'
});
```

### Search
```typescript
await zerodb.searchMemory('session-id', 'query', 10);
```

---

## Environment Variables

```bash
NEXT_PUBLIC_AINATIVE_API_URL="https://api.ainative.studio"
NEXT_PUBLIC_AINATIVE_API_KEY="token"
NEXT_PUBLIC_ZERODB_PROJECT_ID="project-id"
```

---

## Common Endpoints

```
POST /v1/public/zerodb/tables/{table}/insert
POST /v1/public/zerodb/tables/{table}/query
POST /v1/public/zerodb/vectors/search/text
POST /v1/public/zerodb/vectors/upsert
POST /projects/{id}/database/memory/store
POST /projects/{id}/database/memory/search
GET  /v1/admin/zerodb/analytics/usage
GET  /health
```

---

## Test Command

```bash
curl https://api.ainative.studio/v1/admin/zerodb/analytics/usage \
  -H "Authorization: Bearer token"
```
