const UserModel = require('../../Models/wpsAdmin/user')
const Constant = require('../../MiddleWares/lib/constants')
const bcrypt = require('bcrypt')
 

/* User Add */
exports.userAdd = async (req, res) => {
    try {
        const { email, password, confPassword, mobile_number } = req.body
        const findData = await UserModel.findOne({ $or: [{ email }, { mobile_number }] })
        if (!findData) {
            if (password == confPassword) {
                const add = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    mobile_number: req.body.mobile_number,
                    role: req.body.role,
                    privilege: req.body.privilege,
                    password: await bcrypt.hash(password, 10),
                    confPassword: await bcrypt.hash(confPassword, 10),
                    status: req.body.status
                }).save()
                msg = Constant.STORED_MSG
            } else {
                msg = Constant.PASSWORD_NOT_SAME
            }
        } else {
            msg = Constant.MOBILE_ALREADY_EXIST
        }
        return res.globalResponse(true, msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* User List */
exports.userList = async (req, res) => {
    try {
        const list = await UserModel.find({}, { password: 0, confPassword: 0 })
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* User Update */
exports.userUpdate = async (req, res) => {
    try {
        const _id = req.params._id
        const updateData = await UserModel.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* User Delete */
exports.userDelete = async (req, res) => {
    try {
        const _id = req.params._id
        const deleteData = await UserModel.findByIdAndDelete({ _id })
        return res.globalResponse(true, Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}