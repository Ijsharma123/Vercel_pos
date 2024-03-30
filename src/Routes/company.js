const express = require('express')
const router = express.Router()

/* Files Path */
const Authorized = require("../MiddleWares/wpsAdminToken");
const VendorFiles = require('../Controllers/Company/vendor')


/* Vendor Files Path */
router.post('/vendor/add', Authorized, VendorFiles.vendorAdd)
router.get('/vendor/list', Authorized, VendorFiles.vendorList)
router.patch('/vendor/update/:_id', Authorized, VendorFiles.vendorUpdate)
router.delete('/vendor/delete/:_id', Authorized, VendorFiles.vendorDelete)


module.exports = router