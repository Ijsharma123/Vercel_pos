require('dotenv').config();
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js')

/* MiddleWare Use For Token Check */
const passport = require("passport");
require('./passport')(passport)

module.exports = function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false }, async (error, data) => {
    const TokenData = request.header('Authorization')
    const DecryptToken = await TokenDecrypt(TokenData, process.env.JWT_Key)
    if (DecryptToken) {
      const TokenMatch = DecryptToken.match(/\Bearer/g)

      if (!TokenMatch) {
        return response.status(401).json({ success: false, message: 'Unauthorized Token !!' });
      }
    }

    const token = DecryptToken ? DecryptToken.slice(7) : '';
    try {
      jwt.verify(token, process.env.JWT_Key, (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' });
        } else {
          request.admin = decoded.admin;
        }
      });
    } catch (err) {
      console.error('Something wrong with auth middleware');
      return response.status(500).json({ msg: 'Server Error' });
    }
    next();
  })(request, response, next);
}

/* Token Decrypt Using CryptoJS */
const TokenDecrypt = async (data, key) => {
  try {
    const decrypt = cryptoJS.AES.decrypt(data, key)
    const decryptedData = decrypt.toString(cryptoJS.enc.Utf8);
    return decryptedData
  } catch (error) {
    console.log("error", error);
    return error
  }
}