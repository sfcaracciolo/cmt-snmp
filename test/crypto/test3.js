var msg = '2c5bbd423ad3d920902e08efefd6311933767567c15680b1c826ce02b92f1f1e4cf01289cc225eaa5e141e7262120e9f706beb20c96adf8cf0df1fa939fe482478e698f0560f80b144e9c90d271a29b9f45031425df66c64d3b4113830c2ce090d8dc58fa7c7dc7df625ca4709d3825e403d490b22116ac0e0da80cae2b7ff1d83d156ec780acedf479e2d190bb69477b161e725bd4f1cd0cd48492e4abdd3edf800d5c5566b86ba65c26fb6d7dde231f8a47e881cce3c4a'
var decryptionKey = Buffer.from("0c2ff9820c750c6e", 'hex') 
// var decryptionKey = Buffer.from("H98zM6i/") // 55yNJfkFsbu0HrzlFo17FtR9";
// var decryptionKey = "H98zM6i/55yNJfkFsbu0HrzlFo17FtR9";
var iv = Buffer.from('b65ba9aa210203cc', 'hex') ; // .slice(0,8)
// var iv = Buffer.from(decryptionKey); // .slice(0,8)

var enc
var rmsg 
node:
var crypto = require('crypto');

function encrypt_crypto(msg) {
  var cipher = crypto.createCipheriv ('des-cbc', decryptionKey, iv);
  var encryptedPdu = cipher.update (msg, 'utf-8', 'hex');
  encryptedPdu += cipher.final('hex');
  return encryptedPdu
}

function decrypt_crypto(hex) {
  var decipher = crypto.createDecipheriv ('des-cbc', decryptionKey, iv);
  var decryptedPdu = decipher.update (hex, 'hex', 'utf-8');
  decryptedPdu += decipher.final('utf-8');
  return decryptedPdu

}

enc = encrypt_crypto(msg)
rmsg = decrypt_crypto(enc)
console.log ("Node:      " + enc);
console.log ("Node:      " + rmsg);


var CryptoJS = require("crypto-js");

var decryptionKeyJS = CryptoJS.enc.Utf8.parse(decryptionKey);
var ivJS = CryptoJS.enc.Utf8.parse(iv);
// var ivJS = CryptoJS.enc.Hex.parse(iv.toString('hex'))

function encrypt_cryptojs(msg) {
  var cipher = CryptoJS.DES.encrypt(
    msg,
    decryptionKeyJS, 
    {
      mode: CryptoJS.mode.CBC,
      iv: ivJS
    })
  return cipher.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt_cryptojs(hex) {
  var decipher = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(hex)},
    decryptionKeyJS, 
    {
      mode: CryptoJS.mode.CBC,
      iv: ivJS
    })
      .toString(CryptoJS.enc.Utf8)
  return decipher
}


enc = encrypt_cryptojs(msg)
rmsg = decrypt_cryptojs(enc)
console.log ("Crypto.js: " + enc);
console.log ("Crypto.js: " + rmsg);


enc = encrypt_crypto(msg)
rmsg = decrypt_cryptojs(enc)
console.log ("Node:      " + enc);
console.log ("Crypto.js: " + rmsg);