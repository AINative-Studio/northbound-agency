#!/usr/bin/env node

/**
 * Asset Generation Script for Northbound Studio
 * Generates all required public assets (favicons, icons, OG images) with purple branding
 */

const fs = require('fs');
const path = require('path');

// Brand colors - Purple theme
const COLORS = {
  primary: '#8B5CF6',      // Purple-500
  primaryDark: '#7C3AED',  // Purple-600
  primaryLight: '#A78BFA', // Purple-400
  background: '#1F2937',   // Gray-800 (dark background)
  white: '#FFFFFF',
  black: '#000000'
};

const PUBLIC_DIR = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

/**
 * Generate SVG icon with "BD" monogram
 */
function generateIconSVG(size) {
  const fontSize = size * 0.5;
  const strokeWidth = size * 0.05;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with gradient -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primaryDark};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background rounded rectangle -->
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>

  <!-- "BD" monogram -->
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="bold"
    font-size="${fontSize}px"
    fill="${COLORS.white}"
    filter="url(#shadow)">BD</text>
</svg>`;
}

/**
 * Generate OG Image SVG with full branding
 */
function generateOGImageSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.background};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.primaryLight};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${COLORS.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primaryDark};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Accent line at top -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accentGrad)"/>

  <!-- Main content -->
  <g>
    <!-- Logo/Icon -->
    <rect x="80" y="180" width="120" height="120" rx="18" fill="url(#accentGrad)"/>
    <text
      x="140"
      y="240"
      dominant-baseline="central"
      text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif"
      font-weight="bold"
      font-size="60px"
      fill="${COLORS.white}">BD</text>

    <!-- Company name -->
    <text
      x="230"
      y="220"
      font-family="Arial, Helvetica, sans-serif"
      font-weight="bold"
      font-size="72px"
      fill="${COLORS.white}">Northbound Studio</text>

    <!-- Tagline -->
    <text
      x="230"
      y="280"
      font-family="Arial, Helvetica, sans-serif"
      font-size="36px"
      fill="${COLORS.primaryLight}">AI-Native Digital Media Agency</text>
  </g>

  <!-- Bottom accent -->
  <g>
    <text
      x="80"
      y="520"
      font-family="Arial, Helvetica, sans-serif"
      font-size="28px"
      fill="#9CA3AF">Building Intelligent Media Systems</text>

    <circle cx="80" cy="570" r="6" fill="${COLORS.primary}"/>
    <text
      x="95"
      y="575"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">AI Applications</text>

    <circle cx="280" cy="570" r="6" fill="${COLORS.primary}"/>
    <text
      x="295"
      y="575"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">Web Development</text>

    <circle cx="520" cy="570" r="6" fill="${COLORS.primary}"/>
    <text
      x="535"
      y="575"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">Media AI</text>
  </g>
</svg>`;
}

/**
 * Convert SVG to PNG using simple data URI approach
 * For production, this would typically use a library like sharp or canvas
 */
function saveSVGFile(svgContent, filename) {
  const filepath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filepath, svgContent);
  console.log(`✓ Generated: ${filename}`);
  return filepath;
}

/**
 * Create a simple ICO file from SVG
 * For a real implementation, you'd use a proper library
 * This creates a simple placeholder that browsers will accept
 */
function generateFaviconICO() {
  // For this demo, we'll create a simple 32x32 icon
  // In production, use a library like to-ico or sharp
  const svg = generateIconSVG(32);
  const filepath = path.join(PUBLIC_DIR, 'favicon.svg');
  fs.writeFileSync(filepath, svg);
  console.log('✓ Generated: favicon.svg (browsers support SVG favicons)');

  // Also note about .ico file
  console.log('ℹ For .ico format, use online converter or sharp library');
  console.log('  Modern browsers support SVG favicons natively');
}

/**
 * Main generation function
 */
function generateAllAssets() {
  console.log('🎨 Generating Northbound Studio assets with purple branding...\n');

  // Generate icons at various sizes
  saveSVGFile(generateIconSVG(16), 'icon-16.svg');
  saveSVGFile(generateIconSVG(32), 'icon-32.svg');
  saveSVGFile(generateIconSVG(180), 'apple-touch-icon.svg');
  saveSVGFile(generateIconSVG(192), 'icon-192.svg');
  saveSVGFile(generateIconSVG(512), 'icon-512.svg');

  // Generate OG image
  saveSVGFile(generateOGImageSVG(), 'og-image.svg');

  // Generate favicon
  generateFaviconICO();

  console.log('\n✅ Asset generation complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Convert SVG files to PNG using:');
  console.log('   - Online tool: https://cloudconvert.com/svg-to-png');
  console.log('   - Or install sharp: npm install sharp');
  console.log('   - Or use ImageMagick: convert file.svg file.png');
  console.log('\n2. For favicon.ico, use:');
  console.log('   - https://realfavicongenerator.net/');
  console.log('   - Or use to-ico package: npm install to-ico');
  console.log('\n3. Verify dimensions match requirements:');
  console.log('   - favicon.ico: 32x32, 16x16');
  console.log('   - apple-touch-icon.png: 180x180');
  console.log('   - icon-192.png: 192x192');
  console.log('   - icon-512.png: 512x512');
  console.log('   - og-image.png: 1200x630');
}

// Run the generator
if (require.main === module) {
  generateAllAssets();
}

module.exports = { generateAllAssets, COLORS };
