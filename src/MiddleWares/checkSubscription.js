const Company = require('../Models/wpsAdmin/company')
const Constant = require('../MiddleWares/lib/constants')

/* Function For Check Subscription Expired Or Not */
module.exports = async (req, res, next) => {
    try {
        console.log(456)

        const _id = req.company.id
        console.log(_id)
        const findCompany = await Company.findById({ _id: _id })
        const subsExpiryDate = findCompany.subscription_expiry_date
        const currentDate = new Date()
        if (currentDate >= subsExpiryDate) {
            return { msg: (Constant.SUBSCRIPTION_EXPIRE) }
        }
        next()
        return subsExpiryDate
    } catch (error) {
        return error
    }
}