# Services Pages SEO Quick Reference

## All Pages At A Glance

| Page | Title | Primary Keyword | ServiceType | Schemas |
|------|-------|-----------------|-------------|---------|
| /services | Services - AI & Digital Media Solutions | AI services | Multiple | Org, Breadcrumb, Service |
| /services/ai-apps | Custom AI Application Development | Custom AI application development | Custom AI application development | Breadcrumb, Service |
| /services/media-ai | AI Media Production & AI Content Creation | AI media production | AI media production | Breadcrumb, Service |
| /services/web-dev | AI-Native Web Development | AI web development | Modern web development | Breadcrumb, Service |

## Metadata Templates

### Main Services
```typescript
title: 'Services - AI & Digital Media Solutions | Northbound Studio'
description: 'AI-native digital media agency offering custom AI applications, modern web development, and intelligent media systems for entertainment companies.'
keywords: ['AI services', 'Digital media agency', 'AI application development', 'Web development services', 'Media AI systems', 'Enterprise AI', 'Custom AI solutions', 'AI consulting']
```

### AI Apps
```typescript
title: 'Custom AI Application Development & Enterprise AI Solutions | Northbound Studio'
description: 'Build custom AI applications with RAG systems, chatbots, and intelligent automation. Enterprise AI solutions tailored for media and entertainment companies.'
keywords: ['Custom AI application development', 'Enterprise AI solutions', 'RAG systems', 'AI chatbots', 'Intelligent automation', 'AI development']
```

### Media AI
```typescript
title: 'AI Media Production & AI Content Creation Services | Northbound Studio'
description: 'AI-powered content discovery, automated tagging, and intelligent recommendations for studios, networks, and streaming platforms.'
keywords: ['AI media production', 'AI content creation', 'Media intelligence', 'Content recommendation', 'Audience analytics', 'Video AI']
```

### Web Dev
```typescript
title: 'AI-Native Web Development | Next.js, Python & FastAPI | Northbound Studio'
description: 'AI web apps with Next.js, Python, FastAPI, PyTorch, TensorFlow, and ZeroDB. Full-stack intelligent solutions.'
keywords: ['AI web development', 'Next.js development', 'Python FastAPI', 'PyTorch development', 'TensorFlow', 'ZeroDB', 'AIKit UI', 'ML web applications', 'Full-stack AI']
```

## Schema IDs

- Organization: `https://northboundstudio.co/#organization`
- Main Services: `https://northboundstudio.co/services#professional-service`
- AI Apps: `https://northboundstudio.co/services/ai-apps#service`
- Media AI: `https://northboundstudio.co/services/media-ai#service`
- Web Dev: `https://northboundstudio.co/services/web-dev#service`

## Testing URLs

### Google Rich Results Test
```
https://search.google.com/test/rich-results?url=https://northboundstudio.co/services
https://search.google.com/test/rich-results?url=https://northboundstudio.co/services/ai-apps
https://search.google.com/test/rich-results?url=https://northboundstudio.co/services/media-ai
https://search.google.com/test/rich-results?url=https://northboundstudio.co/services/web-dev
```

### Schema Validator
```
https://validator.schema.org/#url=https://northboundstudio.co/services
https://validator.schema.org/#url=https://northboundstudio.co/services/ai-apps
https://validator.schema.org/#url=https://northboundstudio.co/services/media-ai
https://validator.schema.org/#url=https://northboundstudio.co/services/web-dev
```

## Browser Console Validation

```javascript
// Run in browser console to see all schemas
document.querySelectorAll('script[type="application/ld+json"]').forEach((s, i) => {
  console.log(`Schema ${i+1}:`, JSON.parse(s.textContent)['@type']);
});
```

## File Locations

- Main Services: `/app/services/page.tsx`
- AI Apps: `/app/services/ai-apps/page.tsx`
- Media AI: `/app/services/media-ai/page.tsx`
- Web Dev: `/app/services/web-dev/page.tsx`

## Documentation

- Full Summary: `/docs/seo/services-metadata-summary.md`
- Validation Checklist: `/docs/seo/schema-validation-checklist.md`
- Keyword Strategy: `/docs/seo/keyword-strategy.md`
- Quick Reference: `/docs/seo/quick-reference.md` (this file)

## Total Keywords by Page

- Main Services: 8 keywords
- AI Apps: 6 keywords
- Media AI: 6 keywords
- Web Dev: 9 keywords
- **Total Unique**: 29 keywords

## Schema Types Used

1. **Organization** - Company information (main services page)
2. **BreadcrumbList** - Navigation breadcrumbs (all pages)
3. **ProfessionalService** - Service details (all pages)
4. **OfferCatalog** - Service offerings (all pages)
5. **Service** - Individual service items (all pages)

## Service Offers Count

- Main Services: 3 service categories
- AI Apps: 4 specific capabilities
- Media AI: 4 specific capabilities
- Web Dev: 4 specific capabilities
- **Total**: 15 detailed service offerings

## Post-Deployment Checklist

- [ ] Test all 4 pages with Google Rich Results Test
- [ ] Verify schemas in Schema.org Validator
- [ ] Check social media previews (LinkedIn, Twitter, Facebook)
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all 4 pages
- [ ] Monitor for rich snippet appearance (2-4 weeks)
- [ ] Track keyword rankings weekly
- [ ] Set up Search Console alerts for errors

## Common Issues & Solutions

### Issue: Schema not appearing in Rich Results Test
**Solution**: Wait 24-48 hours after deployment, then retest

### Issue: Duplicate schema IDs
**Solution**: Each page has unique @id with fragment identifier

### Issue: Social media preview not showing
**Solution**: Use Facebook Debugger to clear cache

### Issue: Keywords not ranking
**Solution**: Monitor for 4-6 weeks, ensure content matches search intent

## Contact for SEO Questions

- Implementation: Check `/docs/seo/` documentation
- Testing: Follow `/docs/seo/schema-validation-checklist.md`
- Keywords: Reference `/docs/seo/keyword-strategy.md`
