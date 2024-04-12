const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const cryptoJS = require('crypto-js')

const findAdmin = require('../Models/wpsAdmin/adminAuth')


/* JWT options */
// let token = ''
// let DecryptToken = ''
// const jwtOptions = {
//     jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
//     jwtFromRequest: async function (req) {
//         token = req.headers.authorization
//         DecryptToken = await TokenDecrypt(token, process.env.JWT_Key)
//         console.log(DecryptToken)
//         return token
//     },
//     secretOrKey: process.env.JWT_Key,
// };

const jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_Key,
};

module.exports = async (passport) => {
    passport.use(
        new jwtStrategy(
            jwtOptions,
            async function (jwt_Payload, cb) {
                const data = await findAdmin.findOne({ email: jwt_Payload.admin.email })
                if (data) {
                    return cb(null, data)
                }
            }
        )
    )
}

/* Token Decrypt Using CryptoJS */
// const TokenDecrypt = async (data, key) => {
//     try {
//         const decrypt = cryptoJS.AES.decrypt(data, key)
//         const decryptedData = decrypt.toString(cryptoJS.enc.Utf8);
//         return decryptedData
//     } catch (error) {
//         console.log("error", error);
//         return error
//     }
// }