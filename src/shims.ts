import 'react-native-url-polyfill/auto';

// Polyfills for Node.js APIs
if (typeof __dirname === 'undefined') {
  global.__dirname = '/';
}
if (typeof __filename === 'undefined') {
  global.__filename = '';
}
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (const p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

// Crypto polyfill
if (typeof crypto === 'undefined') {
  global.crypto = require('@react-native-community/hooks').crypto;
}
