import '@testing-library/jest-dom';

// Polyfill TextEncoder / TextDecoder for envs that don't provide them
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch for RTK Query
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

