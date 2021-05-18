const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

var CryptoJS = require("crypto-js");

function encodeT(user)
{
    var encrypted_token = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 123').toString();
    return encrypted_token;
}

function decodeT(token)
{
    var bytes  = CryptoJS.AES.decrypt(token, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

module.exports={encodeT,decodeT};