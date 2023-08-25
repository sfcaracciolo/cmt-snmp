var encryptedMsg = Buffer.from('b378c63a5ff0aae96cbd28b4e064be39fb97fafcfe7bdb79e05f6adf13e2d56b140d5b9628a2e4aed47e39dbb5e547758968c9c43d6e86231f95ddef61c23f4d2929bacd7332a827c2fdfae6b45694c5ba272a200e40511222f370be03618348edf296eaf9e39a1a323ecc34cd6f9d68f5bca88298c479135d659fba9c7fe542ef558c4f299cdb22106bdf02dc7a730b97018cae325eda07dffac4df509dff3aeaa78cdf080fa1a21bbba33fb19e395f7ce71f5fd934bee3', 'hex')
// var encryptedMsg = Buffer.from('b378c63a5ff0aae96cbd28b4e064be39fb97fafcfe7bdb79e05f6adf13e2d56b140d5b9628a2e4aed47e39dbb5e547758968c9c43d6e86231f95ddef61c23f4d2929bacd7332a827c2fdfae6b45694c5ba272a200e40511222f370be03618348edf296eaf9e39a1a323ecc34cd6f9d68f5bca88298c479135d659fba9c7fe542ef558c4f299cdb22106bdf02dc7a730b97018cae325eda07dffac4df509dff3aeaa78cdf080fa1a21bbba33fb19e395f7ce71f5fd934bee3', 'hex')
var decryptionKey = Buffer.from("0c2ff9820c750c6e", 'hex') 
var iv = Buffer.from('b65ba9aa210203cc', 'hex') ; // .slice(0,8)

var enc
var rmsg 
var crypto = require('crypto');

function decrypt_crypto(hex) {
  var decipher = crypto.createDecipheriv ('des-cbc', decryptionKey, iv);
	decipher.setAutoPadding(false);
  var decryptedPdu = decipher.update (hex, 'hex', 'hex');
  decryptedPdu += decipher.final('hex');
  return decryptedPdu

}

rmsg = decrypt_crypto(encryptedMsg)
console.log ("Node:      " + rmsg);


var CryptoJS = require("crypto-js");

var decryptionKeyJS = CryptoJS.enc.Hex.parse(decryptionKey.toString('hex'));
var ivJS = CryptoJS.enc.Hex.parse(iv.toString('hex'));
// var ivJS = CryptoJS.enc.Hex.parse(iv.toString('hex'))

function decrypt_cryptojs(hex) {
  var decipher = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Hex.parse(hex.toString('hex'))},
    decryptionKeyJS, 
    {
      padding: CryptoJS.pad.NoPadding,
      mode: CryptoJS.mode.CBC,
      iv: ivJS
    })
  return decipher.toString(CryptoJS.enc.Hex)
}


rmsg = decrypt_cryptojs(encryptedMsg)
console.log ("Crypto.js: " + rmsg);
