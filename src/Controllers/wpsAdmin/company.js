const adminAuthCRUD = require('../../Models/wpsAdmin/adminAuth')
const bcrypt = require('bcrypt')
const Constant = require('../../MiddleWares/lib/constants')

/* Company Add */
exports.companyAdd = async (req, res) => {
    try {
        const { email, password, mobile_number } = req.body
        const findData = await adminAuthCRUD.findOne({ $or: [{ email }, { mobile_number }] })
        if (!findData) {
            const add = new adminAuthCRUD({
                title: req.body.title,
                ownerName: req.body.ownerName,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                password: await bcrypt.hash(password, 10),
                vendor: req.body.vendor,
                status: req.body.status
            }).save()
            msg = Constant.STORED_MSG
        } else {
            msg = Constant.MOBILE_ALREADY_EXIST
        }
        return res.globalResponse(true, msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company List */
exports.companyList = async (req, res) => {
    try {
        const list = await adminAuthCRUD.find({}, { password: 0 })
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company Update */
exports.companyUpdate = async (req, res) => {
    try {
        const _id = req.params._id
        const updateData = await adminAuthCRUD.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company Delete */
exports.companyDelete = async (req, res) => {
    try {
        const _id = req.params._id
        const deleteData = await adminAuthCRUD.findByIdAndDelete({ _id })
        return res.globalResponse(true, Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}