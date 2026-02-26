#!/usr/bin/env node

/**
 * Asset Generation Script for Northbound Studio
 * Generates all required public assets with purple branding using Sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

// Brand colors - Purple theme
const COLORS = {
  primary: '#8B5CF6',      // Purple-500
  primaryDark: '#7C3AED',  // Purple-600
  primaryLight: '#A78BFA', // Purple-400
  background: '#1F2937',   // Gray-800
  white: '#FFFFFF'
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
  const fontSize = size * 0.45;
  const cornerRadius = size * 0.15;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.primaryLight};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${COLORS.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primaryDark};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#grad${size})"/>
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="bold"
    font-size="${fontSize}px"
    fill="${COLORS.white}">BD</text>
</svg>`);
}

/**
 * Generate OG Image SVG
 */
function generateOGImageSVG() {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1F2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.primaryLight};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${COLORS.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primaryDark};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.primaryLight};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.primaryDark};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accentGrad)"/>

  <!-- Logo icon -->
  <rect x="80" y="180" width="120" height="120" rx="18" fill="url(#logoGrad)"/>
  <text
    x="140"
    y="240"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="bold"
    font-size="58px"
    fill="${COLORS.white}">BD</text>

  <!-- Company name -->
  <text
    x="230"
    y="215"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="bold"
    font-size="68px"
    fill="${COLORS.white}">Northbound Studio</text>

  <!-- Tagline -->
  <text
    x="230"
    y="270"
    font-family="Arial, Helvetica, sans-serif"
    font-size="32px"
    fill="${COLORS.primaryLight}">AI-Native Digital Media Agency</text>

  <!-- Bottom section -->
  <text
    x="80"
    y="480"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="600"
    font-size="26px"
    fill="#D1D5DB">Building Intelligent Media Systems</text>

  <!-- Service badges -->
  <g>
    <circle cx="80" cy="540" r="5" fill="${COLORS.primary}"/>
    <text
      x="95"
      y="545"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">AI Applications</text>

    <circle cx="280" cy="540" r="5" fill="${COLORS.primary}"/>
    <text
      x="295"
      y="545"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">Web Development</text>

    <circle cx="520" cy="540" r="5" fill="${COLORS.primary}"/>
    <text
      x="535"
      y="545"
      font-family="Arial, Helvetica, sans-serif"
      font-size="20px"
      fill="#9CA3AF">Media Production</text>
  </g>
</svg>`);
}

/**
 * Generate and save an icon at specified size
 */
async function generateIcon(size, filename) {
  const svg = generateIconSVG(size);
  const outputPath = path.join(PUBLIC_DIR, filename);

  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(outputPath);

  console.log(`✓ Generated: ${filename} (${size}x${size})`);
  return outputPath;
}

/**
 * Generate favicon.ico with multiple sizes
 */
async function generateFavicon() {
  console.log('Generating favicon.ico...');

  // Generate 16x16 and 32x32 PNGs
  const icon16 = await sharp(generateIconSVG(16))
    .resize(16, 16)
    .png()
    .toBuffer();

  const icon32 = await sharp(generateIconSVG(32))
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create ICO file
  const icoBuffer = await toIco([icon16, icon32]);
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');

  fs.writeFileSync(icoPath, icoBuffer);
  console.log('✓ Generated: favicon.ico (16x16, 32x32)');
}

/**
 * Generate OG image
 */
async function generateOGImage() {
  const svg = generateOGImageSVG();
  const outputPath = path.join(PUBLIC_DIR, 'og-image.png');

  await sharp(svg)
    .resize(1200, 630)
    .png()
    .toFile(outputPath);

  console.log('✓ Generated: og-image.png (1200x630)');
}

/**
 * Main generation function
 */
async function generateAllAssets() {
  console.log('🎨 Generating Northbound Studio assets with purple branding...\n');

  try {
    // Generate all icon sizes
    await generateIcon(180, 'apple-touch-icon.png');
    await generateIcon(192, 'icon-192.png');
    await generateIcon(512, 'icon-512.png');

    // Generate favicon
    await generateFavicon();

    // Generate OG image
    await generateOGImage();

    console.log('\n✅ All assets generated successfully!');
    console.log('\n📦 Generated files:');
    console.log('  - favicon.ico (16x16, 32x32)');
    console.log('  - apple-touch-icon.png (180x180)');
    console.log('  - icon-192.png (192x192)');
    console.log('  - icon-512.png (512x512)');
    console.log('  - og-image.png (1200x630)');
    console.log('\n📍 Location: /public/');
    console.log('\n🎨 Brand colors used:');
    console.log(`  - Primary: ${COLORS.primary}`);
    console.log(`  - Primary Dark: ${COLORS.primaryDark}`);
    console.log(`  - Primary Light: ${COLORS.primaryLight}`);

  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateAllAssets();
}

module.exports = { generateAllAssets, COLORS };
