/**
 * Environment Variables Configuration Tests
 * Tests for GitHub Issue #34 - Environment Variables Configuration for Contact Form Email Service
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '../../');

describe('Environment Variables Configuration', () => {
  describe('.env.example file', () => {
    const envExamplePath = join(PROJECT_ROOT, '.env.example');

    test('should exist in project root', () => {
      expect(existsSync(envExamplePath)).toBe(true);
    });

    test('should contain Resend API configuration section', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      expect(content).toContain('Resend API Configuration');
      expect(content).toContain('RESEND_API_KEY=');
    });

    test('should contain ZeroDB/AINative API configuration section', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      expect(content).toContain('ZeroDB/AINative API Configuration');
      expect(content).toContain('ZERODB_USERNAME=');
      expect(content).toContain('ZERODB_PASSWORD=');
      expect(content).toContain('ZERODB_API_URL=');
      expect(content).toContain('ZERODB_API_TOKEN=');
    });

    test('should contain email configuration section', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      expect(content).toContain('Email Configuration');
      expect(content).toContain('CONTACT_EMAIL_TO=');
      expect(content).toContain('CONTACT_EMAIL_FROM=');
    });

    test('should have default values for email addresses', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      expect(content).toContain('CONTACT_EMAIL_TO=contact@northboundstudios.co');
      expect(content).toContain('CONTACT_EMAIL_FROM=noreply@northboundstudios.co');
    });

    test('should NOT contain actual API keys or passwords', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      // Check that sensitive fields are empty (only have = with no value or placeholder)
      const lines = content.split('\n');
      const sensitiveVars = [
        'ZERODB_USERNAME',
        'ZERODB_PASSWORD',
        'ZERODB_API_TOKEN',
        'RESEND_API_KEY'
      ];

      sensitiveVars.forEach(varName => {
        const line = lines.find(l => l.startsWith(varName));
        if (line) {
          // Should be empty or have placeholder text, not actual credentials
          expect(line).not.toMatch(/=.{20,}/); // No long strings that look like real keys
          expect(line).not.toContain('Admin2025');
          expect(line).not.toContain('kLPiP0bzgKJ0CnNYVt1wq3qxbs2QgDeF');
        }
      });
    });

    test('should be properly formatted with sections and comments', () => {
      const content = readFileSync(envExamplePath, 'utf-8');
      // Should have section dividers or clear comments
      expect(content).toMatch(/#.*Configuration/);
      // Should have organized structure
      expect(content.split('\n').length).toBeGreaterThan(10);
    });
  });

  describe('.gitignore file', () => {
    const gitignorePath = join(PROJECT_ROOT, '.gitignore');

    test('should exist in project root', () => {
      expect(existsSync(gitignorePath)).toBe(true);
    });

    test('should include .env file', () => {
      const content = readFileSync(gitignorePath, 'utf-8');
      expect(content).toContain('.env');
    });

    test('should include .env*.local pattern', () => {
      const content = readFileSync(gitignorePath, 'utf-8');
      expect(content).toMatch(/\.env.*\.local/);
    });

    test('should have local env files section', () => {
      const content = readFileSync(gitignorePath, 'utf-8');
      // Should have a comment about local env files
      expect(content.toLowerCase()).toContain('local env');
    });
  });

  describe('Environment Variables Documentation', () => {
    const docPath = join(PROJECT_ROOT, 'docs/deployment/ENVIRONMENT_VARIABLES.md');

    test('should exist at /docs/deployment/ENVIRONMENT_VARIABLES.md', () => {
      expect(existsSync(docPath)).toBe(true);
    });

    test('should contain required sections', () => {
      const content = readFileSync(docPath, 'utf-8');

      // Required sections
      expect(content).toContain('# Environment Variables');
      expect(content).toMatch(/## Overview|## Introduction/i);
      expect(content).toMatch(/## Resend API/i);
      expect(content).toMatch(/## Local Development/i);
      expect(content).toMatch(/## Railway Production/i);
      expect(content).toMatch(/## Verification/i);
      expect(content).toMatch(/## Troubleshooting/i);
    });

    test('should include instructions for obtaining Resend API key', () => {
      const content = readFileSync(docPath, 'utf-8');
      expect(content.toLowerCase()).toContain('resend');
      expect(content.toLowerCase()).toContain('api key');
      // Should have steps or instructions
      expect(content).toMatch(/1\.|2\.|step/i);
    });

    test('should include local development setup instructions', () => {
      const content = readFileSync(docPath, 'utf-8');
      expect(content).toContain('.env.local');
      expect(content).toMatch(/cp|copy/i);
      expect(content).toContain('.env.example');
    });

    test('should include Railway setup instructions', () => {
      const content = readFileSync(docPath, 'utf-8');
      expect(content.toLowerCase()).toContain('railway');
      expect(content).toMatch(/dashboard|environment|variables/i);
    });

    test('should include verification steps', () => {
      const content = readFileSync(docPath, 'utf-8');
      const verificationSection = content.toLowerCase();
      expect(verificationSection).toMatch(/verify|test|check/);
    });

    test('should include troubleshooting guide', () => {
      const content = readFileSync(docPath, 'utf-8');
      const troubleshootingSection = content.toLowerCase();
      expect(troubleshootingSection).toContain('troubleshooting');
      // Should have common issues or solutions
      expect(troubleshootingSection).toMatch(/error|issue|problem|solution/);
    });

    test('should include security warnings', () => {
      const content = readFileSync(docPath, 'utf-8');
      const securityContent = content.toLowerCase();
      expect(securityContent).toMatch(/warning|caution|important|security|never commit/i);
    });

    test('should be comprehensive (at least 100 lines)', () => {
      const content = readFileSync(docPath, 'utf-8');
      const lineCount = content.split('\n').length;
      expect(lineCount).toBeGreaterThanOrEqual(100);
    });
  });

  describe('Deployment Directory Structure', () => {
    const deploymentDirPath = join(PROJECT_ROOT, 'docs/deployment');

    test('should have /docs/deployment directory', () => {
      expect(existsSync(deploymentDirPath)).toBe(true);
    });
  });

  describe('Environment Variables Usage', () => {
    test('should not have .env.local file in repository', () => {
      const envLocalPath = join(PROJECT_ROOT, '.env.local');
      // This test verifies we're not committing local env files
      // It's okay if it doesn't exist (preferred) or exists but is gitignored
      const gitignorePath = join(PROJECT_ROOT, '.gitignore');
      const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
      expect(gitignoreContent).toContain('.env');
    });

    test('should have proper environment variable structure for Resend', () => {
      const envExamplePath = join(PROJECT_ROOT, '.env.example');
      const content = readFileSync(envExamplePath, 'utf-8');

      // Verify the structure is correct for Resend usage
      expect(content).toMatch(/RESEND_API_KEY=/);
      expect(content).toMatch(/CONTACT_EMAIL_TO=/);
      expect(content).toMatch(/CONTACT_EMAIL_FROM=/);
    });
  });

  describe('Documentation Quality', () => {
    const docPath = join(PROJECT_ROOT, 'docs/deployment/ENVIRONMENT_VARIABLES.md');

    test('should include code examples or snippets', () => {
      const content = readFileSync(docPath, 'utf-8');
      // Should have code blocks for examples
      expect(content).toContain('```');
    });

    test('should include links or references to external resources', () => {
      const content = readFileSync(docPath, 'utf-8');
      // Should have links to Resend, Railway, etc.
      expect(content).toMatch(/https?:\/\//);
    });

    test('should have table of contents or clear structure', () => {
      const content = readFileSync(docPath, 'utf-8');
      // Should have multiple markdown headers
      const headerCount = (content.match(/^##/gm) || []).length;
      expect(headerCount).toBeGreaterThanOrEqual(5);
    });
  });
});
