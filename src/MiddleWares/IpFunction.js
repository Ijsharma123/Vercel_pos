const dns = require('dns')

/* Ip check function */
exports.checkIpAccess = async (req, res) => {
    const DomainName = req.hostname
    console.log("DomainName is: ", DomainName)
    const clientIp = req.ip
    console.log("ClientIp is: ", clientIp)
    const decryptDomainIp = dns.lookup(DomainName, async function (err, decryptIp) {
        if (err) {
            console.error("Something Went Wrong:", err)
            res.globalResponse({ success: false, message: err })
        }
        console.log("DecryptIp is:", decryptIp)
        if (decryptIp == clientIp) {
            console.log("You have Valid Ip So you Can Access")
            res.globalResponse({ success: true, message: "You have Valid Ip So you Can Access" })
        } else {
            console.log("Forbidden")
            res.globalResponse({ success: false, message: "Forbidden" })
        }
    })
}