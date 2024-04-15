
const bcrypt = require('bcrypt');
const Constant = require('../MiddleWares/lib/constants')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


/* Token Generate Function */
exports.TokenGenerateFunction = async (payload) => {
    try {
        let Token = ''
        const TokenData = jwt.sign(payload, process.env.JWT_Key, { expiresIn: 86400 })                  // 86400 seconds means 24 hours
        if (TokenData) {
            const TokenGenerate = `Bearer ${TokenData}`
            Token = await TokenEncrypt(TokenGenerate, process.env.JWT_Key)
            return Token
        } else {
            return msg = "Something went wrong in Token Generate Function"
        }
    } catch (error) {
        return error
    }
}


/* Change Password Function */
exports.changePasswordFunction = async (hashField, model, Id) => {
    try {
        const newPassSave = await bcrypt.hash(hashField, 10)
        const dataSave = await model.findByIdAndUpdate(Id, { password: newPassSave })
        return msg = Constant.PASSWORD_MSG
    } catch (error) {
        return error
    }
}


/* Forget Password Function */
exports.forgetPasswordFunction = async (hashField, model, number) => {
    try {
        const passwordChange = await bcrypt.hash(hashField, 10)
        const dataSave = await model.findOneAndUpdate({ mobile_number: number }, { password: passwordChange })
        return msg = Constant.PASSWORD_MSG
    } catch (error) {
        return error
    }
}


/* Token Encrypt Function Using CryptoJS */
const TokenEncrypt = async (data, key) => {
    try {
        const encrypt = cryptoJS.AES.encrypt(data, key).toString()
        return encrypt
    } catch (error) {
        console.log("error", error);
        return error
    }
}


/* Token Decrypt Function Using CryptoJS */
exports.TokenDecrypt = async (data, key) => {
    try {
        if (data && key) {
            const decrypt = cryptoJS.AES.decrypt(data, key)
            const decryptedData = decrypt.toString(cryptoJS.enc.Utf8);
            return decryptedData
        } else {
            return decryptedData = "Something went wrong in Token Decrypt Function"
        }
    } catch (error) {
        console.log("error", error);
        return error
    }
}


/* Company Id Generate Function */
exports.randomCompanyId = async (name) => {
    try {
        const RANNUM = Math.floor(1000000000000 + Math.random() * 999999999999)
        const GENID = `COMP_ID${RANNUM}`
        return GENID
    } catch (error) {
        return error
    }
}


/* Company Id Generate Function For Admin */
exports.randomCompanyId = async (name) => {
    try {
        const RANNUM = Math.floor(100000000000000000 + Math.random() * 99999999999999999)
        const GENID = `COMP_ID${RANNUM}`
        return GENID
    } catch (error) {
        return error
    }
}