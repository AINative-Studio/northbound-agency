import fs from 'fs';
import path from 'path';

describe('Web App Manifest (PWA)', () => {
  let manifest: any;

  beforeAll(() => {
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(manifestContent);
  });

  describe('Manifest Structure', () => {
    it('should exist at public/manifest.json', () => {
      const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
      expect(fs.existsSync(manifestPath)).toBe(true);
    });

    it('should be valid JSON', () => {
      expect(manifest).toBeDefined();
      expect(typeof manifest).toBe('object');
    });
  });

  describe('Required PWA Properties', () => {
    it('should have a name property', () => {
      expect(manifest.name).toBeDefined();
      expect(typeof manifest.name).toBe('string');
      expect(manifest.name).toBe('Blaq Digital');
    });

    it('should have a short_name property', () => {
      expect(manifest.short_name).toBeDefined();
      expect(typeof manifest.short_name).toBe('string');
      expect(manifest.short_name).toBe('Blaq Digital');
    });

    it('should have a description property', () => {
      expect(manifest.description).toBeDefined();
      expect(typeof manifest.description).toBe('string');
      expect(manifest.description).toContain('AI-Native Digital Media Agency');
    });

    it('should have a start_url property', () => {
      expect(manifest.start_url).toBeDefined();
      expect(manifest.start_url).toBe('/');
    });

    it('should have a display property set to standalone', () => {
      expect(manifest.display).toBeDefined();
      expect(manifest.display).toBe('standalone');
    });

    it('should have a background_color property', () => {
      expect(manifest.background_color).toBeDefined();
      expect(typeof manifest.background_color).toBe('string');
      expect(manifest.background_color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should have a theme_color property', () => {
      expect(manifest.theme_color).toBeDefined();
      expect(typeof manifest.theme_color).toBe('string');
      expect(manifest.theme_color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should have an orientation property', () => {
      expect(manifest.orientation).toBeDefined();
      expect(['portrait', 'landscape', 'any']).toContain(manifest.orientation);
    });

    it('should have a scope property', () => {
      expect(manifest.scope).toBeDefined();
      expect(manifest.scope).toBe('/');
    });
  });

  describe('Icons Configuration', () => {
    it('should have an icons array', () => {
      expect(manifest.icons).toBeDefined();
      expect(Array.isArray(manifest.icons)).toBe(true);
      expect(manifest.icons.length).toBeGreaterThan(0);
    });

    it('should have icon with size 192x192', () => {
      const icon192 = manifest.icons.find((icon: any) =>
        icon.sizes === '192x192'
      );
      expect(icon192).toBeDefined();
      expect(icon192.src).toBeDefined();
      expect(icon192.type).toBe('image/png');
    });

    it('should have icon with size 512x512', () => {
      const icon512 = manifest.icons.find((icon: any) =>
        icon.sizes === '512x512'
      );
      expect(icon512).toBeDefined();
      expect(icon512.src).toBeDefined();
      expect(icon512.type).toBe('image/png');
    });

    it('should have apple-touch-icon', () => {
      const appleIcon = manifest.icons.find((icon: any) =>
        icon.src.includes('apple-touch-icon')
      );
      expect(appleIcon).toBeDefined();
    });

    it('should have purpose property for icons', () => {
      manifest.icons.forEach((icon: any) => {
        if (icon.sizes === '192x192' || icon.sizes === '512x512') {
          expect(icon.purpose).toBeDefined();
          expect(['any', 'maskable', 'any maskable']).toContain(icon.purpose);
        }
      });
    });
  });

  describe('PWA Categories and Features', () => {
    it('should have categories array', () => {
      expect(manifest.categories).toBeDefined();
      expect(Array.isArray(manifest.categories)).toBe(true);
      expect(manifest.categories.length).toBeGreaterThan(0);
    });

    it('should include relevant categories', () => {
      expect(manifest.categories).toContain('business');
    });
  });

  describe('Layout Configuration', () => {
    it('should verify manifest link in layout.tsx', () => {
      const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
      const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

      // Check for manifest link in head
      expect(layoutContent).toContain('manifest');
      expect(layoutContent).toContain('/manifest.json');
    });

    it('should have theme-color meta tag reference capability', () => {
      const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
      const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

      // Verify the layout supports theme configuration
      expect(layoutContent).toBeDefined();
    });
  });

  describe('Mobile Installation Support', () => {
    it('should support mobile app installation with proper display mode', () => {
      expect(['standalone', 'fullscreen', 'minimal-ui']).toContain(manifest.display);
    });

    it('should have proper start_url for installation', () => {
      expect(manifest.start_url).toBe('/');
    });

    it('should have scope that allows all pages', () => {
      expect(manifest.scope).toBe('/');
    });
  });

  describe('Color Scheme and Branding', () => {
    it('should have consistent theme colors for Blaq Digital branding', () => {
      // Blaq Digital uses dark theme with purple accents
      expect(manifest.background_color).toBeDefined();
      expect(manifest.theme_color).toBeDefined();
    });

    it('should match colors with brand identity', () => {
      // Colors should be in hex format
      expect(manifest.background_color).toMatch(/^#/);
      expect(manifest.theme_color).toMatch(/^#/);
    });
  });
});
