const crypto = require('crypto');

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const accessSecret = generateSecret(32);
const refreshSecret = generateSecret(32);

console.log('ACCESS_TOKEN_SECRET:', accessSecret);
console.log('REFRESH_TOKEN_SECRET:', refreshSecret);
