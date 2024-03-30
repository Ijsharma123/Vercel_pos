const vendorCrud = require('../../Models/Company/vendor')
const Constant = require('../../MiddleWares/lib/constants')


/* Vendor Add */
exports.vendorAdd = async (req, res) => {
    try {
        const add = new vendorCrud(req.body)
        if (add.mobile_number.toString().length != 10) {
            msg = "Please enter a valid mobile number"
        } else {
            const dataSave = await add.save()
            msg = Constant.STORED_MSG
        }
        return res.globalResponse(true, msg)
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