const crypto = require('crypto');
require("dotenv").config()

const algorithm = process.env.CRYPT_ALGORITHM;
const key = Buffer.from(process.env.CRYPT_KEY, "hex");
const iv = Buffer.from(process.env.CRYPT_IV, "hex");

const encryptText = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const decryptText = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptText, decryptText }