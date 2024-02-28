const AcessCrud = require('../../Models/wpsAdmin/access')
const Constant = require("../../MiddleWares/lib/constants")

/* Access Add */
exports.addAccess = async (req, res) => {
    try {
        const addData = new AcessCrud(req.body).save()
        return res.globalResponse(true, '', Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Access List */
exports.listAccess = async (req, res) => {
    try {
        const list = await AcessCrud.find()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Access Update */
exports.updateAccess = async (req, res) => {
    try {
        const _id = req.params._id
        const data = await AcessCrud.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, '', Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Access Delete */
exports.deleteAccess = async (req, res) => {
    try {
        const _id = req.params._id
        const data = await AcessCrud.findByIdAndDelete({ _id })
        return res.globalResponse(true, '', Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}