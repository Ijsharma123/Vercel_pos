const vendorCrud = require('../../Models/wpsAdmin/vendor')
const Constant = require('../../MiddleWares/lib/constants')


/* Vendor Add */
exports.vendorAdd = async (req, res) => {
    try {
        const add = new vendorCrud(req.body).save()
        return res.globalResponse(true, Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Vendor List */
exports.vendorList = async (req, res) => {
    try {
        const list = await vendorCrud.find()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Vendor Update */
exports.vendorUpdate = async (req, res) => {
    try {
        const _id = req.params._id
        const dataUpdate = await vendorCrud.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Vendor Delete */
exports.vendorDelete = async (req, res) => {
    try {
        const _id = req.params._id
        const deleteData = await vendorCrud.findByIdAndDelete({ _id })
        return res.globalResponse(true, Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}