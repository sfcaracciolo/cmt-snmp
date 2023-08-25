var nonce = Buffer.alloc(40, "my_API_nonce");
var secret = "my_API_secret";

// node:
var crypto = require('crypto');
var algorithm = 'md5';
var hmac = crypto.createHash(algorithm)
  .update(nonce)
  .digest();
console.log ("Node:      " + hmac.toString('hex'));

// crypto.js (npm install crypto-js):
var CryptoJS = require("crypto-js");
var hash = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(nonce));
console.log ("Crypto.js: " + hash.toString(CryptoJS.enc.Hex));
