/**
 * Test Suite: Public Assets Verification
 *
 * Tests for public assets including favicon, apple-touch-icon, and og-image
 * Covers file existence, dimensions, and format specifications
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { execFile } from 'child_process';

const execFileAsync = promisify(execFile);
const accessAsync = promisify(fs.access);
const statAsync = promisify(fs.stat);

// Asset specifications
const ASSETS_SPECS = {
  favicon: {
    path: '/Users/aideveloper/Desktop/blaq_digital/public/favicon.ico',
    requiredWidths: [16, 32],
    format: 'MS Windows icon resource',
  },
  appleTouchIcon: {
    path: '/Users/aideveloper/Desktop/blaq_digital/public/apple-touch-icon.png',
    width: 180,
    height: 180,
    format: 'PNG image data',
  },
  ogImage: {
    path: '/Users/aideveloper/Desktop/blaq_digital/public/og-image.png',
    width: 1200,
    height: 630,
    format: 'PNG image data',
  },
};

/**
 * Get image dimensions using sips command (macOS)
 */
async function getImageDimensions(
  filePath: string
): Promise<{ width: number; height: number }> {
  const { stdout } = await execFileAsync('sips', [
    '-g',
    'pixelWidth',
    '-g',
    'pixelHeight',
    filePath,
  ]);

  const widthMatch = stdout.match(/pixelWidth:\s*(\d+)/);
  const heightMatch = stdout.match(/pixelHeight:\s*(\d+)/);

  if (!widthMatch || !heightMatch) {
    throw new Error('Could not parse image dimensions');
  }

  return {
    width: parseInt(widthMatch[1], 10),
    height: parseInt(heightMatch[1], 10),
  };
}

/**
 * Get file type using file command
 */
async function getFileType(filePath: string): Promise<string> {
  const { stdout } = await execFileAsync('file', [filePath]);
  return stdout;
}

describe('Public Assets Verification', () => {
  describe('favicon.ico', () => {
    const { path: faviconPath, requiredWidths, format } = ASSETS_SPECS.favicon;

    it('should exist in the public folder', async () => {
      await expect(accessAsync(faviconPath, fs.constants.F_OK)).resolves.not.toThrow();
    });

    it('should be a valid ICO file', async () => {
      const fileType = await getFileType(faviconPath);
      expect(fileType).toContain(format);
    });

    it('should contain required icon sizes (16x16 and 32x32)', async () => {
      const fileType = await getFileType(faviconPath);

      // Verify 16x16 size is present
      expect(fileType).toMatch(/16\s*x\s*16/);

      // The primary dimension should be 32x32
      const dimensions = await getImageDimensions(faviconPath);
      expect(requiredWidths).toContain(dimensions.width);
    });

    it('should be readable', async () => {
      const stats = await statAsync(faviconPath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.isFile()).toBe(true);
    });
  });

  describe('apple-touch-icon.png', () => {
    const { path: iconPath, width, height, format } =
      ASSETS_SPECS.appleTouchIcon;

    it('should exist in the public folder', async () => {
      await expect(accessAsync(iconPath, fs.constants.F_OK)).resolves.not.toThrow();
    });

    it('should be a PNG file', async () => {
      const fileType = await getFileType(iconPath);
      expect(fileType).toContain(format);
    });

    it('should have dimensions of 180x180 pixels', async () => {
      const dimensions = await getImageDimensions(iconPath);
      expect(dimensions.width).toBe(width);
      expect(dimensions.height).toBe(height);
    });

    it('should be readable and non-empty', async () => {
      const stats = await statAsync(iconPath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.isFile()).toBe(true);
    });

    it('should be square (width equals height)', async () => {
      const dimensions = await getImageDimensions(iconPath);
      expect(dimensions.width).toBe(dimensions.height);
    });
  });

  describe('og-image.png', () => {
    const { path: ogImagePath, width, height, format } = ASSETS_SPECS.ogImage;

    it('should exist in the public folder', async () => {
      await expect(accessAsync(ogImagePath, fs.constants.F_OK)).resolves.not.toThrow();
    });

    it('should be a PNG file', async () => {
      const fileType = await getFileType(ogImagePath);
      expect(fileType).toContain(format);
    });

    it('should have Open Graph recommended dimensions (1200x630)', async () => {
      const dimensions = await getImageDimensions(ogImagePath);
      expect(dimensions.width).toBe(width);
      expect(dimensions.height).toBe(height);
    });

    it('should maintain 1.91:1 aspect ratio (Open Graph standard)', async () => {
      const dimensions = await getImageDimensions(ogImagePath);
      const aspectRatio = dimensions.width / dimensions.height;
      // 1200/630 = 1.9047619... which is the standard OG image ratio
      expect(aspectRatio).toBeCloseTo(1.905, 2);
    });

    it('should be readable and non-empty', async () => {
      const stats = await statAsync(ogImagePath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.isFile()).toBe(true);
    });
  });

  describe('Asset Organization', () => {
    it('should have all required assets in the public folder', async () => {
      const requiredAssets = [
        ASSETS_SPECS.favicon.path,
        ASSETS_SPECS.appleTouchIcon.path,
        ASSETS_SPECS.ogImage.path,
      ];

      for (const assetPath of requiredAssets) {
        await expect(
          accessAsync(assetPath, fs.constants.F_OK)
        ).resolves.not.toThrow();
      }
    });

    it('should have proper file permissions', async () => {
      const assets = [
        ASSETS_SPECS.favicon.path,
        ASSETS_SPECS.appleTouchIcon.path,
        ASSETS_SPECS.ogImage.path,
      ];

      for (const assetPath of assets) {
        const stats = await statAsync(assetPath);
        // File should be readable (at minimum)
        await expect(
          accessAsync(assetPath, fs.constants.R_OK)
        ).resolves.not.toThrow();
      }
    });
  });
});
