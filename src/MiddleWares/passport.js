const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const findAdmin = require('../Models/wpsAdmin/adminAuth')

module.exports = async (passport) => {
    passport.use(
        new jwtStrategy(
            {
                secretOrKey: process.env.JWT_Key,
                jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
            },
            async function (jwt_Payload, cb) {
                const data = await findAdmin.findOne({ email: jwt_Payload.admin.email })
                if (data) {
                    return cb(null, data)
                }
            }
        )
    )
}