# Public Assets Specifications

This document outlines the specifications for all public assets used in the Northbound Studio website, including favicons, touch icons, and social sharing images.

## Overview

All public assets are stored in the `/public/` directory and are served statically by Next.js. These assets are critical for:
- Browser tab identification (favicon)
- Mobile device home screen icons (Apple Touch Icon)
- Social media sharing previews (Open Graph images)
- Progressive Web App (PWA) support

## Asset Inventory

### 1. Favicon (`favicon.ico`)

**Purpose:** Browser tab icon and bookmark representation

**Specifications:**
- **File Path:** `/public/favicon.ico`
- **Format:** ICO (Microsoft Windows Icon Resource)
- **Dimensions:** Multi-resolution (16x16, 24x24, 32x32 pixels)
- **Primary Size:** 32x32 pixels
- **Color Depth:** 32 bits/pixel (8-bit RGB with alpha channel)
- **Compression:** PNG compressed

**Browser Support:**
- All modern browsers
- Internet Explorer 5+
- Safari, Chrome, Firefox, Edge

**Implementation:**
```html
<!-- Automatically served by Next.js from /public/favicon.ico -->
<link rel="icon" href="/favicon.ico" />
```

**Testing:**
- File existence verification
- Format validation (ICO file type)
- Multi-resolution support (16x16 and 32x32)
- File readability and non-zero size

---

### 2. Apple Touch Icon (`apple-touch-icon.png`)

**Purpose:** iOS/iPadOS home screen icon when users "Add to Home Screen"

**Specifications:**
- **File Path:** `/public/apple-touch-icon.png`
- **Format:** PNG (Portable Network Graphics)
- **Dimensions:** 180x180 pixels (square)
- **Aspect Ratio:** 1:1
- **Color Depth:** 8-bit RGB
- **Compression:** Non-interlaced PNG
- **Transparency:** Supported but not required
- **Safe Area:** Entire 180x180 area (iOS applies rounded corners automatically)

**Device Coverage:**
- iPhone (all models)
- iPad (all models)
- iPod Touch

**Implementation:**
```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

**Design Guidelines:**
- iOS applies rounded corners automatically (no need to pre-round)
- iOS applies gloss effect on older versions (can be disabled with `apple-touch-icon-precomposed`)
- Keep important content away from edges (15-20px margin recommended)
- Use high contrast for visibility

**Testing:**
- File existence verification
- Format validation (PNG)
- Exact dimensions (180x180)
- Square aspect ratio (width = height)
- File readability and non-zero size

---

### 3. Open Graph Image (`og-image.png`)

**Purpose:** Social media preview image (Facebook, Twitter, LinkedIn, Slack, etc.)

**Specifications:**
- **File Path:** `/public/og-image.png`
- **Format:** PNG (Portable Network Graphics)
- **Dimensions:** 1200x630 pixels
- **Aspect Ratio:** 1.91:1 (1.9047619...)
- **Color Depth:** 8-bit RGB
- **Compression:** Non-interlaced PNG
- **File Size:** Recommended < 1MB for fast loading
- **Safe Area:** Keep important content in center 1200x600 area

**Social Platform Support:**
- Facebook Open Graph
- Twitter Cards
- LinkedIn
- WhatsApp
- Slack
- Discord
- Telegram

**Implementation:**
```html
<!-- Open Graph meta tags -->
<meta property="og:image" content="https://northboundstudios.co/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />

<!-- Twitter Card meta tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://northboundstudios.co/og-image.png" />
```

**Design Guidelines:**
- Use 1200x630px for optimal display across all platforms
- Place text in the center 1200x600px area (avoid top/bottom 15px)
- Use readable fonts (minimum 60px for headlines)
- High contrast between text and background
- Test on multiple platforms before finalizing

**Testing:**
- File existence verification
- Format validation (PNG)
- Exact dimensions (1200x630)
- Aspect ratio validation (1.91:1)
- File readability and non-zero size

---

## Additional Assets

### 4. Icon 192x192 (`icon-192.png`)

**Purpose:** PWA manifest icon (standard size)

**Specifications:**
- **File Path:** `/public/icon-192.png`
- **Format:** PNG
- **Dimensions:** 192x192 pixels
- **Usage:** PWA app icon, Android home screen

### 5. Icon 512x512 (`icon-512.png`)

**Purpose:** PWA manifest icon (high resolution)

**Specifications:**
- **File Path:** `/public/icon-512.png`
- **Format:** PNG
- **Dimensions:** 512x512 pixels
- **Usage:** PWA splash screen, high-DPI displays

### 6. Logo (`logo.png`)

**Purpose:** General branding and in-app usage

**Specifications:**
- **File Path:** `/public/logo.png`
- **Format:** PNG
- **Usage:** Email signatures, print materials, general branding

---

## Asset Generation Workflow

### Tools Used
- **Design Software:** Figma, Adobe Illustrator, or Photoshop
- **Favicon Generation:** Online tools like realfavicongenerator.net
- **Image Optimization:** ImageOptim, TinyPNG, or similar

### Best Practices

1. **Start with High Resolution**
   - Create master assets at 2x or 3x final size
   - Scale down for optimal quality

2. **Optimize File Sizes**
   - Compress PNG files without visible quality loss
   - Target < 50KB for favicon
   - Target < 200KB for touch icons
   - Target < 1MB for OG images

3. **Test Across Platforms**
   - Verify on iOS Safari (light and dark mode)
   - Test Facebook sharing debugger
   - Test Twitter card validator
   - Check on Android devices

4. **Version Control**
   - Keep source files (SVG, AI, PSD) in `/design/` directory
   - Document any changes in git commits
   - Update this specification document when assets change

---

## Testing & Validation

### Automated Tests

The project includes comprehensive automated tests for all public assets:

**Test File:** `__tests__/public-assets.test.ts`

**Test Coverage:**
- File existence checks
- Format validation (ICO, PNG)
- Dimension verification
- Aspect ratio validation
- File readability
- Proper permissions

**Running Tests:**
```bash
# Run asset tests only
npm test -- __tests__/public-assets.test.ts

# Run all tests with coverage
npm test:coverage
```

### Manual Testing

#### Favicon Testing
1. Open website in browser
2. Check browser tab for icon
3. Add bookmark and verify icon appears
4. Test in multiple browsers

#### Apple Touch Icon Testing
1. Open website on iOS device (Safari)
2. Tap Share > Add to Home Screen
3. Verify icon appears correctly on home screen
4. Test in both light and dark mode

#### Open Graph Image Testing
1. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
2. Twitter Card Validator: https://cards-dev.twitter.com/validator
3. LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
4. Share on actual platforms to verify

---

## Troubleshooting

### Common Issues

**Favicon not updating:**
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Hard refresh the page
- Check file permissions
- Verify file is actually in `/public/` directory

**Apple Touch Icon not showing:**
- Ensure file is exactly 180x180px
- Verify PNG format (not JPG)
- Check if icon is being served at `/apple-touch-icon.png`
- Remove and re-add to home screen

**OG Image not appearing:**
- Verify image is publicly accessible (not localhost)
- Check absolute URL in meta tags
- Use Facebook/Twitter debuggers to refresh cache
- Ensure file size is reasonable (< 1MB)
- Verify dimensions are exactly 1200x630

---

## Maintenance

### When to Update Assets

- Rebranding or logo changes
- Significant design system updates
- Adding new platform support
- Fixing accessibility issues
- Optimizing file sizes

### Update Checklist

- [ ] Update source design files
- [ ] Export all required sizes
- [ ] Optimize file sizes
- [ ] Run automated tests
- [ ] Test on actual devices
- [ ] Validate social sharing
- [ ] Update this documentation
- [ ] Commit changes with descriptive message
- [ ] Verify in production deployment

---

## References

### Standards & Documentation
- [Apple Touch Icon Specifications](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Favicon Best Practices](https://github.com/audreyfeldroy/favicon-cheat-sheet)
- [PWA Icon Guidelines](https://web.dev/add-manifest/)

### Online Tools
- [Favicon Generator](https://realfavicongenerator.net/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Image Optimization Tools](https://imageoptim.com/)

---

**Last Updated:** 2026-02-20
**Maintained By:** Northbound Studio Development Team
**Version:** 1.0.0
