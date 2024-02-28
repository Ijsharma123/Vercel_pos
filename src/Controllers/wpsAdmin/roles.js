const rolesCrud = require('../../Models/wpsAdmin/roleCrud')
const Constant = require("../../MiddleWares/lib/constants")

/* RolesCrud Add */
exports.addRoleCrud = async (req, res) => {
    try {
        const add = new rolesCrud(req.body).save();
        return res.globalResponse(true, '', Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* RolesCrud List */
exports.listRoleCrud = async (req, res) => {
    try {
        const list = await rolesCrud.find()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* RolesCrud Update */
exports.updateRoleCrud = async (req, res) => {
    try {
        const _id = req.params._id
        const dataUpdate = await rolesCrud.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, '', Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* RolesCrud Delete */
exports.deleteRoleCrud = async (req, res) => {
    try {
        const _id = req.params._id
        const dataDelete = await rolesCrud.findByIdAndDelete({ _id })
        return res.globalResponse(true, '', Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}