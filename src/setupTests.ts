import '@testing-library/jest-dom';
import 'whatwg-fetch';

import fetchPolyfill, {
  Request as RequestPolyfill,
  Headers,
  Response,
} from 'node-fetch';

Object.defineProperty(global, 'fetch', {
  writable: true,
  value: fetchPolyfill,
});

Object.defineProperty(global, 'Request', {
  writable: true,
  value: RequestPolyfill,
});

Object.defineProperty(global, 'Headers', {
  writable: true,
  value: Headers,
});

Object.defineProperty(global, 'Response', {
  writable: true,
  value: Response,
});
