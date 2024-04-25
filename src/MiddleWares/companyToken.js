require('dotenv').config();
const jwt = require('jsonwebtoken');
const  CommonFunction = require("../MiddleWares/commonFunctions")

/* MiddleWare Use For Token Check */
const passport = require("passport");
require('./passport')(passport)

module.exports = function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false }, async (error, data) => {
    const TokenData = request.header('Authorization')
    const DecryptToken = await CommonFunction.TokenDecrypt(TokenData, process.env.JWT_Key)

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
          request.company = decoded.company;
        }
      });
    } catch (err) {
      console.error('Something wrong with auth middleware');
      return response.status(500).json({ msg: 'Server Error' });
    }
    next();
  })(request, response, next);
}