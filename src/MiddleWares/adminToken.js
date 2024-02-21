require('dotenv').config(); //get env variables
const jwt = require('jsonwebtoken');
// const User = require('../Models/Admin/adminAuth')


/* MiddleWare Use For Token Check */
const passport = require("passport");
require('../MiddleWares/passport')(passport)

module.exports = function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false, }, async (error, data) => {

    const token = request.header('Authorization') ? request.header('Authorization').slice(7) : '';

    if (!token) {
      return response.status(401).json({ success: false, message: 'Unauthorized Message' });
    }
    try {
      jwt.verify(token, process.env.JWT_Key, (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' });
        } else {
          request.admin = decoded.admin;
        }
      });
    } catch (err) {
      // next(err)
      console.error('Something wrong with auth middleware');
      return response.status(500).json({ msg: 'Server Error' });
    }
    next();
  })(request, response, next);
}