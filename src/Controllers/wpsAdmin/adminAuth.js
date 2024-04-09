const adminAuthCRUD = require('../../Models/wpsAdmin/adminAuth')
const Constant = require('../../MiddleWares/lib/constants')
const bcrypt = require('bcrypt')
const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')


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
            jwt.sign(payload, process.env.JWT_Key, { expiresIn: 86400000 }, (err, token) => {
                if (err) {
                    res.send("Something wrong")
                } else {
                    return res.globalResponse(true, 'Bearer ' + token, Constant.WELCOME_MSG)
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
        const { OldPassword, NewPassword, ConfPassword } = req.body
        const findUser = await adminAuthCRUD.findById({ _id })
        if (compareSync(OldPassword, findUser.password)) {
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