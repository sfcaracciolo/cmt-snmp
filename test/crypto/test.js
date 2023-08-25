var nonce = Buffer.from("my_API_nonce");
var secret = Buffer.from("aae325ff", 'hex');

// node:
var crypto = require('crypto');
var algorithm = 'md5';
var hmac = crypto.createHmac(algorithm, secret)
  .update(nonce)
  .digest();
console.log ("Node:      " + hmac.toString('hex'));

// crypto.js (npm install crypto-js):
var CryptoJS = require("crypto-js");
var hash = CryptoJS.HmacMD5(CryptoJS.enc.Utf8.parse(nonce), CryptoJS.enc.Hex.parse(secret.toString('hex')));
console.log ("Crypto.js: " + hash.toString(CryptoJS.enc.Hex));
