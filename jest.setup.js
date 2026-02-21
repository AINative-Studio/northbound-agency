import '@testing-library/jest-dom'

// Add polyfills for Next.js Edge Runtime APIs using Node.js built-ins
const { ReadableStream, WritableStream, TransformStream } = require('stream/web');
const { TextEncoder, TextDecoder } = require('util');

global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add crypto for Web Crypto API
global.crypto = require('crypto').webcrypto;

// Add MessagePort and MessageChannel for undici
const { MessageChannel, MessagePort } = require('worker_threads');
global.MessageChannel = MessageChannel;
global.MessagePort = MessagePort;

// Now load undici for fetch APIs
const { fetch, Request, Response, Headers, FormData } = require('undici');
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.FormData = FormData;

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
