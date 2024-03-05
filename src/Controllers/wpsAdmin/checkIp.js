const IpFunc = require('../../MiddleWares/IpFunction');

/* Ip check */
exports.Ipcheck = async (req, res) => {
    try {
        const IpAddress = await IpFunc.checkIpAccess(req, res)
        console.log(IpAddress)
    } catch (error) {
        res.globalResponse({ success: false, message: error.message });
    }
}