const companyCRUD = require('../../Models/wpsAdmin/company')
const bcrypt = require('bcrypt')
const Constant = require('../../MiddleWares/lib/constants')
const CommonFunction = require("../../MiddleWares/commonFunctions")

/* Company Add */
exports.companyAdd = async (req, res) => {
    try {
        const { email, password, confPassword, mobile_number } = req.body
        const findData = await companyCRUD.findOne({ $or: [{ email }, { mobile_number }] })
        if (!findData) {
            if (password == confPassword) {
                const COMPANYID = await CommonFunction.randomCompanyId()
                const add = new companyCRUD({
                    name: req.body.name,
                    email: req.body.email,
                    mobile_number: req.body.mobile_number,
                    privilege: req.body.privilege,
                    companyId: COMPANYID,
                    noOfVendor: req.body.noOfVendor,
                    password: await bcrypt.hash(password, 10),
                    confPassword: await bcrypt.hash(confPassword, 10),
                    subscription_id: req.body.subscription_id,
                    status: req.body.status
                })
                const addExpiryDate = await CommonFunction.updateSubscription(add.date, add.subscription_id)
                add.subscription_expiry_date = addExpiryDate
                const addData = add.save()
                success = true
                msg = Constant.STORED_MSG
            } else {
                success = false
                msg = Constant.PASSWORD_NOT_SAME
            }
        } else {
            success = false
            msg = Constant.MOBILE_ALREADY_EXIST
        }
        return res.globalResponse(success, msg)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company List */
exports.companyList = async (req, res) => {
    try {
        const list = await companyCRUD.aggregate([
            {
                $lookup: {
                    from: "privileges",
                    localField: "privilege",
                    foreignField: "_id",
                    as: "Privilege"
                }
            },
            { $unwind: { path: "$Privilege" } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile_number: 1,
                    role: 1,
                    privilege: 1,
                    companyId: 1,
                    noOfVendor: 1,
                    subscription_id: 1,
                    status: 1,
                    date: 1,
                    subscription_expiry_date: 1,
                    privilegeName: "$Privilege.name",
                    privilegeOptions: "$Privilege.access"
                }
            }
        ])
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company Update */
exports.companyUpdate = async (req, res) => {
    try {
        const _id = req.params._id
        const updateData = await companyCRUD.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Company Delete */
exports.companyDelete = async (req, res) => {
    try {
        const _id = req.params._id
        const deleteData = await companyCRUD.findByIdAndDelete({ _id })
        return res.globalResponse(true, Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}