const dns = require('dns')
const requestIp = require('request-ip')
const { networkInterfaces } = require('os');



// exports.checkIpAccess = async (req, res) => {
//     const DomainName = req.hostname
//     console.log("DomainName is: ", DomainName)
//     const clientIp = req.ip
//     console.log("ClientIp is: ", clientIp)
//     const decryptDomainIp = dns.lookup(DomainName, async function (err, decryptIp) {
//         if (err) {
//             console.error("Something Went Wrong:", err)
//             res.globalResponse({ success: false, message: err })
//         }
//         console.log("DecryptIp is:", decryptIp)
//         if (decryptIp == "54.183.18.207" || decryptIp == "54.183.142.227" || decryptIp == "3.24.122.159" || decryptIp == "54.79.20.55" || decryptIp == "52.62.134.160" || decryptIp == "::1" || decryptIp == "76.76.21.142") {
//             console.log("You have Valid Ip So you Can Access")
//             return res.globalResponse(true, '', "You have Valid Ip So you Can Access" )
//         } else {
//             console.log("Forbidden")
//             return res.globalResponse(false, '', "Forbidden" )
//         }
//     })
// }


exports.checkIpAccess = async (req, res) => {
    let results = []
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results.push(net.address);
            }
        }
    }
    console.log( results[0]);
    var IPNameByPackage = requestIp.getClientIp(req)
    console.log("IPNameByPackage is: ", IPNameByPackage)   
    const DomainName = req.hostname
    console.log("DomainName is: ", DomainName)
    const clientIp = req.ip
    console.log("ClientIp is: ", clientIp)
    const socketIp = req.socket.remoteAddress
    console.log("socketIp is: ", socketIp)
            res.globalResponse( true, results[0] )
    // const decryptDomainIp = dns.lookup(DomainName, async function (err, decryptIp) {
    //     if (err) {
    //         console.error("Something Went Wrong:", err)
    //         res.globalResponse({ success: false, message: err })
    //     }
    //     console.log("DecryptIp is:", decryptIp)
    //     if (decryptIp == "54.183.18.207" || decryptIp == "54.183.142.227" || decryptIp == "3.24.122.159" || decryptIp == "54.79.20.55" || decryptIp == "52.62.134.160" || decryptIp == "::1" || decryptIp == "15.207.23.135") {
    //         console.log("You have Valid Ip So you Can Access")
    //         res.status(200).web2Response({ success: true, message: "You have Valid Ip So you Can Access" })
    //     } else {
    //         console.log("Forbidden")
    //         res.status(200).web2Response({ success: false, message: "Forbidden" })
    //     }
    // })
}