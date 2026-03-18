// Polyfills required before any test modules load (react-router uses TextEncoder)
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
