const adminAuthCRUD = require('../../Models/wpsAdmin/adminAuth')
const Constant = require('../../MiddleWares/lib/constants')
const bcrypt = require('bcrypt')
const cryptoJS = require('crypto-js')

const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')


/* Admin Create */
exports.adminCrudCreate = async (req, res) => {
    try {
        // console.log(req.session)
        let msg = ''
        const { email, password, status, type } = req.body
        const findemail = await adminAuthCRUD.findOne({ email: email })
        if (!findemail) {
            const hashPassword = await bcrypt.hash(password, 10)
            const add = new adminAuthCRUD({
                email: email,
                password: hashPassword,
                status: status,
                type: type
            }).save()
            msg = Constant.STORED_MSG
        } else {
            msg = Constant.ALREADY_EXIST
        }
        return res.globalResponse(true, '', msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Admin Login */
exports.adminCrudLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await adminAuthCRUD.findOne({ email })
        if (!admin) {
            return res.globalResponse(false, '', Constant.EMAIL_INCORRECT)
        } else if (!compareSync(password, admin.password)) {
            return res.globalResponse(false, '', Constant.PASSWORD_INCORRECT)
        } else {
            const payload = {
                admin: {
                    id: admin._id,
                    email: admin.email
                }
            }
            jwt.sign(payload, process.env.JWT_Key, { expiresIn: 86400 }, async (err, token) => {     // 86400 seconds means 24 hours
                if (err) {
                    res.send("Something wrong")
                } else {
                    const TokenGenerate = `Bearer ${token}`
                    const Token = await TokenEncrypt(TokenGenerate, process.env.JWT_Key)
                    return res.globalResponse(true, Token, Constant.WELCOME_MSG)
                }
            })
        }
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Admin ChangePassword */
exports.adminChangePassword = async (req, res) => {
    try {
        const _id = req.admin.id
        const { existingPassword, NewPassword, ConfPassword } = req.body
        const findUser = await adminAuthCRUD.findById({ _id })
        if (compareSync(existingPassword, findUser.password)) {
            if (NewPassword == ConfPassword) {
                const newPassSave = await bcrypt.hash(NewPassword, 10)
                const dataSave = await adminAuthCRUD.findByIdAndUpdate({ _id }, { password: newPassSave })
                return res.globalResponse(true, Constant.PASSWORD_MSG)
            } else {
                return res.globalResponse(false, Constant.PASSWORD_NOT_SAME)
            }
        } else {
            return res.globalResponse(false, Constant.PASSWORD_INCORRECT)
        }
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Admin List */
exports.adminCrudList = async (req, res) => {
    try {
        const findData = await adminAuthCRUD.find()
        return res.globalResponse(true, findData)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/*---------------------------------- Forget Password Module Start ---------------------------------*/

/* Forget Password Mobile Verify */
exports.findMobileNumber = async (req, res) => {
    try {
        const mobile_number = req.body.number
        const findData = await adminAuthCRUD.findOne({ mobile_number })
        if (findData) {
            GENOTP = (Math.floor(100000 + Math.random() * 999999))
            await adminAuthCRUD.findByIdAndUpdate({ _id: findData._id }, { otp: GENOTP })
        } else {
            OTP = Constant.MOBILE_NUMBER_NOT_VALID
        }
        return res.globalResponse(true, GENOTP)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Forget Password OTP Verify */
exports.otpVerify = async (req, res) => {
    try {
        let msg = ''
        const { number, otp } = req.body
        const findNumber = await adminAuthCRUD.findOne({ mobile_number: number })
        if (findNumber) {
            if (findNumber.otp == otp) {
                msg = Constant.OTP_CORRECT
            } else {
                msg = Constant.OTP_INCORRECT
            }
        }
        return res.globalResponse(true, msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Forget Password */
exports.forgetPassword = async (req, res) => {
    try {
        let msg = ''
        const { number, NewPassword, ConfPassword } = req.body
        if (NewPassword == ConfPassword) {
            const datachange = await adminAuthCRUD.findOne({ mobile_number: number })
            if (datachange) {
                const passwordChange = await bcrypt.hash(NewPassword, 10)
                await adminAuthCRUD.findOneAndUpdate({ mobile_number: datachange.mobile_number }, { password: passwordChange })
                msg = Constant.PASSWORD_MSG
            }
        } else {
            msg = Constant.PASSWORD_NOT_SAME
        }
        return res.globalResponse(true, msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/*---------------------------------- Forget Password Module End ---------------------------------*/

/* Upload Profile Photo */
exports.profilePhoto = async (req, res) => {
    try {
        const _id = req.admin.id
        const addImage = await adminAuthCRUD.findByIdAndUpdate({ _id }, {
            image: `http://localhost:3000/${req.file.path.replace(/\\/g, '/')}`
        })
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Token Encrypt Using CryptoJS */
const TokenEncrypt = async (data, key) => {
    try {
        const encrypt = cryptoJS.AES.encrypt(data, key).toString()
        return encrypt
    } catch (error) {
        console.log("error", error);
        return error
    }
}