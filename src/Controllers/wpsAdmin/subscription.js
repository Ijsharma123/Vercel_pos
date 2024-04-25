const SubscriptionCrud = require('../../Models/wpsAdmin/subscription')
const RenewCrud = require('../../Models/wpsAdmin/renew')
const Constant = require('../../MiddleWares/lib/constants')


/* Subscription Add */
exports.addSubscription = async (req, res) => {
    try {
        const add = new SubscriptionCrud(req.body).save();
        return res.globalResponse(true, '', Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Subscription List */
exports.listSubscription = async (req, res) => {
    try {
        const list = await SubscriptionCrud.find()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Subscription Update */
exports.updateSubscription = async (req, res) => {
    try {
        const _id = req.params._id
        const dataUpdate = await SubscriptionCrud.findByIdAndUpdate({ _id }, req.body)
        return res.globalResponse(true, '', Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Subscription Delete */
exports.deleteSubscription = async (req, res) => {
    try {
        const _id = req.params._id
        const dataDelete = await SubscriptionCrud.findByIdAndDelete({ _id })
        return res.globalResponse(true, '', Constant.DELETE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* Renew Add */
exports.addRenew = async (req, res) => {
    try {
        const add = new RenewCrud(req.body).save();
        return res.globalResponse(true, '', Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}