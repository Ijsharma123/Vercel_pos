const moduleCrud = require('../../Models/wpsAdmin/module')
const Constant = require('../../MiddleWares/lib/constants')

/* moduleCrud Add */
exports.addModule = async (req, res) => {
    try {
        const add = new moduleCrud(req.body).save()
        return res.globalResponse(true, Constant.STORED_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* moduleCrud List */
exports.listModule = async (req, res) => {
    try {
        const list = await moduleCrud.findOne()
        return res.globalResponse(true, list)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}

/* moduleCrud Update */
exports.updateModule = async (req, res) => {
    const pushData = req.body.modules
    try {
        const _id = req.params._id
        pushData.forEach(async (x) => {
            const update = await moduleCrud.findByIdAndUpdate({ _id }, {
                $push: {
                    modules: x,
                }
            })
        })
        return res.globalResponse(true, Constant.UPDATE_MSG)
    } catch (error) {
        return res.globalResponse(false, error.message)
    }
}
