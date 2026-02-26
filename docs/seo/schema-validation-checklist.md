# Schema.org Validation Checklist

## Testing URLs

### Google Rich Results Test
Test each page URL:
```
https://search.google.com/test/rich-results
```

Pages to test:
- https://northboundstudio.co/services
- https://northboundstudio.co/services/ai-apps
- https://northboundstudio.co/services/media-ai
- https://northboundstudio.co/services/web-dev

### Schema Markup Validator
```
https://validator.schema.org/
```

### Structured Data Testing Tool
```
https://search.google.com/structured-data/testing-tool
```

---

## Validation Checklist

### Main Services Page (`/services`)

- [ ] Organization Schema validates
  - [ ] Has valid @context
  - [ ] Has @type: Organization
  - [ ] Has @id with #organization fragment
  - [ ] Has name, url, description
  - [ ] Has valid PostalAddress

- [ ] Breadcrumb Schema validates
  - [ ] Has valid @context
  - [ ] Has @type: BreadcrumbList
  - [ ] Has itemListElement array
  - [ ] Each item has position, name, item

- [ ] ProfessionalService Schema validates
  - [ ] Has valid @context
  - [ ] Has @type: ProfessionalService
  - [ ] Has @id with #professional-service fragment
  - [ ] Has name, provider reference
  - [ ] Has serviceType array
  - [ ] Has hasOfferCatalog with services

- [ ] Metadata validates
  - [ ] Has unique title
  - [ ] Has description
  - [ ] Has keywords array
  - [ ] Has Open Graph tags
  - [ ] Has Twitter Card tags

### AI Apps Page (`/services/ai-apps`)

- [ ] Breadcrumb Schema validates
  - [ ] Has 3 levels (Home → Services → AI Apps)
  - [ ] All positions are sequential
  - [ ] All items have valid URLs

- [ ] ProfessionalService Schema validates
  - [ ] Has @id: /services/ai-apps#service
  - [ ] Has serviceType: "Custom AI application development"
  - [ ] Provider references #organization
  - [ ] Has 4 service offers in catalog

- [ ] Metadata validates
  - [ ] Title includes "Custom AI Application Development"
  - [ ] Description includes "RAG systems"
  - [ ] Keywords include target terms
  - [ ] URL matches /services/ai-apps

### Media AI Page (`/services/media-ai`)

- [ ] Breadcrumb Schema validates
  - [ ] Has 3 levels (Home → Services → Media + AI Systems)
  - [ ] All positions are sequential
  - [ ] All items have valid URLs

- [ ] ProfessionalService Schema validates
  - [ ] Has @id: /services/media-ai#service
  - [ ] Has serviceType: "AI media production"
  - [ ] Provider references #organization
  - [ ] Has 4 service offers in catalog

- [ ] Metadata validates
  - [ ] Title includes "AI Media Production"
  - [ ] Description targets media/entertainment
  - [ ] Keywords include "Content recommendation"
  - [ ] URL matches /services/media-ai

### Web Dev Page (`/services/web-dev`)

- [ ] Breadcrumb Schema validates
  - [ ] Has 3 levels (Home → Services → Web Development)
  - [ ] All positions are sequential
  - [ ] All items have valid URLs

- [ ] ProfessionalService Schema validates
  - [ ] Has @id: /services/web-dev#service
  - [ ] Has serviceType: "Modern web development"
  - [ ] Provider references #organization
  - [ ] Has 4 service offers in catalog

- [ ] Metadata validates
  - [ ] Title includes "Next.js, Python & FastAPI"
  - [ ] Description includes tech stack
  - [ ] Keywords include "PyTorch", "TensorFlow"
  - [ ] URL matches /services/web-dev

---

## Browser Console Testing

For each page, open browser console and run:

```javascript
// Extract and validate JSON-LD
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach((script, index) => {
  try {
    const data = JSON.parse(script.textContent);
    console.log(`Schema ${index + 1}:`, data['@type'], '✅');
    console.log(data);
  } catch (e) {
    console.error(`Schema ${index + 1}: Invalid JSON ❌`, e);
  }
});
```

Expected output per page:
- **Services**: 3 schemas (Organization, BreadcrumbList, ProfessionalService)
- **AI Apps**: 2 schemas (BreadcrumbList, ProfessionalService)
- **Media AI**: 2 schemas (BreadcrumbList, ProfessionalService)
- **Web Dev**: 2 schemas (BreadcrumbList, ProfessionalService)

---

## Manual Visual Inspection

### Check Meta Tags in Page Source

For each page, view source and verify:

```html
<!-- Title tag -->
<title>Expected Title | Northbound Studio</title>

<!-- Meta description -->
<meta name="description" content="Expected description">

<!-- Keywords -->
<meta name="keywords" content="keyword1, keyword2, ...">

<!-- Open Graph -->
<meta property="og:title" content="Expected Title">
<meta property="og:description" content="Expected description">
<meta property="og:url" content="https://northboundstudio.co/services/...">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Expected Title">
<meta name="twitter:description" content="Expected description">

<!-- JSON-LD scripts -->
<script type="application/ld+json">{...}</script>
```

---

## SEO Performance Monitoring

### Google Search Console
1. Submit sitemap with service pages
2. Request indexing for all 4 service pages
3. Monitor coverage reports
4. Check for rich result eligibility
5. Track impressions/clicks for target keywords

### Target Keywords to Monitor

**Main Services Page:**
- AI services
- Digital media agency
- AI application development
- Enterprise AI

**AI Apps Page:**
- Custom AI application development
- Enterprise AI solutions
- RAG systems
- AI chatbots

**Media AI Page:**
- AI media production
- AI content creation
- Content recommendation
- Audience analytics

**Web Dev Page:**
- AI web development
- Next.js development
- Python FastAPI
- Full-stack AI

---

## Common Issues to Check

- [ ] All URLs use HTTPS
- [ ] All URLs match actual page paths
- [ ] No duplicate @id values across pages
- [ ] Provider references point to #organization
- [ ] All JSON-LD is valid JSON (no syntax errors)
- [ ] serviceType values are descriptive and unique
- [ ] Breadcrumbs have sequential positions
- [ ] Meta descriptions are under 160 characters
- [ ] Titles are under 60 characters
- [ ] No broken internal links in schemas

---

## Testing Tools

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Tests: Mobile and desktop rendering
   - Validates: ProfessionalService schema

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Tests: All Schema.org types
   - Validates: JSON-LD syntax

3. **Lighthouse SEO Audit**
   ```bash
   npm run lighthouse -- --only-categories=seo
   ```
   - Checks: Meta tags, structured data
   - Score target: 100/100

4. **Browser DevTools**
   - Network tab: Check meta tags load
   - Console: Validate JSON-LD parsing
   - Elements: Inspect rendered markup

---

## Post-Deployment Verification

After deploying to production:

1. [ ] Test all 4 pages with Google Rich Results Test
2. [ ] Verify schemas in Google Search Console
3. [ ] Check meta tags render correctly in social media preview tools
4. [ ] Monitor crawl errors in Search Console
5. [ ] Request re-indexing if needed
6. [ ] Track keyword rankings for target terms
7. [ ] Monitor click-through rates from search results

---

## Success Metrics

- ✅ All pages pass Google Rich Results Test
- ✅ No structured data errors in Search Console
- ✅ Rich snippets appear in search results within 2-4 weeks
- ✅ Improved click-through rates for target keywords
- ✅ Higher rankings for service-specific queries
- ✅ Social media previews show correct metadata
