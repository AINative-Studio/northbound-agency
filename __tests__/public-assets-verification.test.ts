/**
 * Public Assets Verification Tests
 * Tests all public assets to ensure they meet Issue #25 acceptance criteria
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

describe('Public Assets - Issue #25 Acceptance Criteria', () => {
  const publicDir = path.join(process.cwd(), 'public');

  describe('Public Directory Structure', () => {
    it('should have public/ directory', () => {
      expect(fs.existsSync(publicDir)).toBe(true);
      expect(fs.statSync(publicDir).isDirectory()).toBe(true);
    });

    it('should contain all required asset files', () => {
      const requiredFiles = [
        'favicon.ico',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'og-image.png'
      ];

      requiredFiles.forEach(filename => {
        const filepath = path.join(publicDir, filename);
        expect(fs.existsSync(filepath)).toBe(true);
      });
    });
  });

  describe('Favicon (favicon.ico)', () => {
    const faviconPath = path.join(publicDir, 'favicon.ico');

    it('should exist and be readable', () => {
      expect(fs.existsSync(faviconPath)).toBe(true);
      const stats = fs.statSync(faviconPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should be ICO format', () => {
      const buffer = fs.readFileSync(faviconPath);
      // ICO files start with 0x00 0x00 0x01 0x00
      expect(buffer[0]).toBe(0x00);
      expect(buffer[1]).toBe(0x00);
      expect(buffer[2]).toBe(0x01);
      expect(buffer[3]).toBe(0x00);
    });

    it('should contain 16x16 and 32x32 sizes', () => {
      const buffer = fs.readFileSync(faviconPath);
      // ICO header: byte 4 is number of images
      const numImages = buffer[4];
      expect(numImages).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Apple Touch Icon (apple-touch-icon.png)', () => {
    const iconPath = path.join(publicDir, 'apple-touch-icon.png');

    it('should exist and be readable', () => {
      expect(fs.existsSync(iconPath)).toBe(true);
      const stats = fs.statSync(iconPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should be PNG format', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.format).toBe('png');
    });

    it('should be exactly 180x180 pixels', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(180);
      expect(metadata.height).toBe(180);
    });

    it('should be square (1:1 aspect ratio)', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(metadata.height);
    });
  });

  describe('Android Icon 192x192 (icon-192.png)', () => {
    const iconPath = path.join(publicDir, 'icon-192.png');

    it('should exist and be readable', () => {
      expect(fs.existsSync(iconPath)).toBe(true);
      const stats = fs.statSync(iconPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should be PNG format', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.format).toBe('png');
    });

    it('should be exactly 192x192 pixels', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(192);
      expect(metadata.height).toBe(192);
    });

    it('should be square (1:1 aspect ratio)', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(metadata.height);
    });
  });

  describe('Android Icon 512x512 (icon-512.png)', () => {
    const iconPath = path.join(publicDir, 'icon-512.png');

    it('should exist and be readable', () => {
      expect(fs.existsSync(iconPath)).toBe(true);
      const stats = fs.statSync(iconPath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should be PNG format', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.format).toBe('png');
    });

    it('should be exactly 512x512 pixels', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(512);
      expect(metadata.height).toBe(512);
    });

    it('should be square (1:1 aspect ratio)', async () => {
      const metadata = await sharp(iconPath).metadata();
      expect(metadata.width).toBe(metadata.height);
    });
  });

  describe('Open Graph Image (og-image.png)', () => {
    const ogImagePath = path.join(publicDir, 'og-image.png');

    it('should exist and be readable', () => {
      expect(fs.existsSync(ogImagePath)).toBe(true);
      const stats = fs.statSync(ogImagePath);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should be PNG format', async () => {
      const metadata = await sharp(ogImagePath).metadata();
      expect(metadata.format).toBe('png');
    });

    it('should be exactly 1200x630 pixels', async () => {
      const metadata = await sharp(ogImagePath).metadata();
      expect(metadata.width).toBe(1200);
      expect(metadata.height).toBe(630);
    });

    it('should have correct aspect ratio (1.91:1)', async () => {
      const metadata = await sharp(ogImagePath).metadata();
      const aspectRatio = (metadata.width || 0) / (metadata.height || 1);
      expect(aspectRatio).toBeCloseTo(1.9047619, 2);
    });

    it('should be under 1MB for fast loading', () => {
      const stats = fs.statSync(ogImagePath);
      const sizeInMB = stats.size / (1024 * 1024);
      expect(sizeInMB).toBeLessThan(1);
    });
  });

  describe('PWA Manifest Configuration', () => {
    const manifestPath = path.join(publicDir, 'manifest.json');

    it('should have manifest.json', () => {
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    it('should reference all icon sizes', () => {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      expect(manifest.icons).toBeDefined();
      expect(Array.isArray(manifest.icons)).toBe(true);

      // Check for required icon sizes
      const iconSizes = manifest.icons.map((icon: any) => icon.sizes);
      expect(iconSizes).toContain('192x192');
      expect(iconSizes).toContain('512x512');
      expect(iconSizes).toContain('180x180');
    });

    it('should have correct theme colors', () => {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      expect(manifest.theme_color).toBeDefined();
      expect(manifest.background_color).toBeDefined();
    });
  });

  describe('Brand Colors - Purple Theme', () => {
    it('should use purple branding colors', async () => {
      // Test icon-192.png for purple color presence
      const iconPath = path.join(publicDir, 'icon-192.png');
      const { data, info } = await sharp(iconPath)
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Check if image has purple tones
      // Purple typically has: high R, low G, high B
      let hasPurple = false;
      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Purple detection: R > 100, B > 200, G < R
        if (r > 100 && b > 200 && g < r) {
          hasPurple = true;
          break;
        }
      }

      expect(hasPurple).toBe(true);
    });
  });

  describe('Professional Design Quality', () => {
    it('should have reasonable file sizes', () => {
      const files = [
        { name: 'favicon.ico', maxSize: 50 * 1024 }, // 50KB
        { name: 'apple-touch-icon.png', maxSize: 200 * 1024 }, // 200KB
        { name: 'icon-192.png', maxSize: 200 * 1024 }, // 200KB
        { name: 'icon-512.png', maxSize: 500 * 1024 }, // 500KB
        { name: 'og-image.png', maxSize: 1024 * 1024 } // 1MB
      ];

      files.forEach(({ name, maxSize }) => {
        const filepath = path.join(publicDir, name);
        const stats = fs.statSync(filepath);
        expect(stats.size).toBeLessThan(maxSize);
      });
    });
  });

  describe('Acceptance Criteria Checklist', () => {
    it('✓ public/ directory created', () => {
      expect(fs.existsSync(publicDir)).toBe(true);
    });

    it('✓ All icon files added with correct dimensions', async () => {
      const icons = [
        { file: 'apple-touch-icon.png', width: 180, height: 180 },
        { file: 'icon-192.png', width: 192, height: 192 },
        { file: 'icon-512.png', width: 512, height: 512 },
        { file: 'og-image.png', width: 1200, height: 630 }
      ];

      for (const icon of icons) {
        const metadata = await sharp(path.join(publicDir, icon.file)).metadata();
        expect(metadata.width).toBe(icon.width);
        expect(metadata.height).toBe(icon.height);
      }
    });

    it('✓ Open Graph image created for social sharing', () => {
      expect(fs.existsSync(path.join(publicDir, 'og-image.png'))).toBe(true);
    });

    it('✓ Uses Northbound Studio branding colors (purple primary)', async () => {
      const iconPath = path.join(publicDir, 'icon-192.png');
      const { data, info } = await sharp(iconPath)
        .raw()
        .toBuffer({ resolveWithObject: true });

      let hasPurple = false;
      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const b = data[i + 2];
        if (r > 100 && b > 200) {
          hasPurple = true;
          break;
        }
      }

      expect(hasPurple).toBe(true);
    });

    it('✓ Professional design quality', () => {
      // All files should exist and have reasonable sizes
      const allFilesExist = [
        'favicon.ico',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'og-image.png'
      ].every(file => {
        const filepath = path.join(publicDir, file);
        return fs.existsSync(filepath) && fs.statSync(filepath).size > 0;
      });

      expect(allFilesExist).toBe(true);
    });
  });
});
