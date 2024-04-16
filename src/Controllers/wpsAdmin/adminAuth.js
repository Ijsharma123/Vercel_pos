const adminAuthCRUD = require('../../Models/wpsAdmin/adminAuth')
const Constant = require('../../MiddleWares/lib/constants')
const bcrypt = require('bcrypt')
const CommonFunction = require('../../MiddleWares/commonFunctions')
const { compareSync } = require('bcrypt')
const { response } = require('express')


/* Admin Create */
exports.adminCrudCreate = async (req, res) => {
    try {
        let msg = ''
        const { name, email, mobile_number, image, password, status } = req.body
        const findemail = await adminAuthCRUD.findOne({ $or: [{ email }, { mobile_number }] })
        if (!findemail) {
            const hashPassword = await bcrypt.hash(password, 10)
            const COMPANYID = await CommonFunction.randomCompanyId()
            const add = new adminAuthCRUD({
                name: name,
                mobile_number: mobile_number,
                companyId: COMPANYID,
                image: image,
                email: email,
                password: hashPassword,
                status: status,
            }).save()
            msg = Constant.STORED_MSG
        } else {
            msg = Constant.MOBILE_ALREADY_EXIST
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
                    email: admin.email,
                    companyId: admin.companyId
                }
            }
            const Token = await CommonFunction.TokenGenerateFunction(payload)
            return res.globalResponse(true, Token, Constant.WELCOME_MSG)
        }
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* ChangePassword */
exports.ChangePassword = async (req, res) => {
    try {
        const _id = req.admin.id
        const { existingPassword, NewPassword, ConfPassword } = req.body
        const findUser = await adminAuthCRUD.findById({ _id })
        if (compareSync(existingPassword, findUser.password)) {
            if (NewPassword == ConfPassword) {
                const PasswordSave = await CommonFunction.changePasswordFunction(NewPassword, adminAuthCRUD, _id)
                return res.globalResponse(true, PasswordSave)
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
            GENOTP = Constant.MOBILE_NUMBER_NOT_VALID
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
        const { number, otp, NewPassword, ConfPassword } = req.body
        const findNumber = await adminAuthCRUD.findOne({ mobile_number: number })
        if (findNumber) {
            if (findNumber.otp == otp) {
                if (NewPassword == ConfPassword) {
                    msg = await CommonFunction.forgetPasswordFunction(NewPassword, adminAuthCRUD, number)
                } else {
                    msg = Constant.PASSWORD_NOT_SAME
                }
            } else {
                msg = Constant.OTP_INCORRECT
            }
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