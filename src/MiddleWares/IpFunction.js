const dns = require('dns')

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
        if (decryptIp == "54.183.18.207" || decryptIp == "54.183.142.227" || decryptIp == "3.24.122.159" || decryptIp == "54.79.20.55" || decryptIp == "52.62.134.160" || decryptIp == "::1" || decryptIp == "76.76.21.142" || decryptIp == "127.0.0.1") {
            console.log("You have Valid Ip So you Can Access")
            return res.globalResponse(true, '', "You have Valid Ip So you Can Access" )
        } else {
            console.log("Forbidden")
            return res.globalResponse(false, '', "Forbidden" )
        }
    })
}