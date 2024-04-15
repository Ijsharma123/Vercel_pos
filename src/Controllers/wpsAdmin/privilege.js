const PrivilegeCrud = require('../../Models/wpsAdmin/privilege')
const Constant = require("../../MiddleWares/lib/constants")

/* Privilege Add */
exports.addPrivilege = async (req, res) => {
    try {
        const addData = new PrivilegeCrud(req.body).save()
        return res.globalResponse(true, '', Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Privilege List */
exports.listPrivilege = async (req, res) => {
    try {
        const list = await PrivilegeCrud.find()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Privilege Update */
exports.updatePrivilege  = async (req, res) => {
    try {
        const _id = req.params._id
        const data = await PrivilegeCrud.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, '', Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Privilege Delete */
exports.deletePrivilege = async (req, res) => {
    try {
        const _id = req.params._id
        const data = await PrivilegeCrud.findByIdAndDelete({ _id })
        return res.globalResponse(true, '', Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}