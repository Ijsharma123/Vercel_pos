const express = require('express')
const router = express.Router()

/* Files Path */
const Authorized = require("../MiddleWares/companyToken");
const CompanyLogin = require('../Controllers/Company/companyAuth')

/* CompanyLogin Files Path */
router.post('/login', CompanyLogin.CompanyLogin)
router.get('/list', Authorized, CompanyLogin.companyList)
router.get('/notification', Authorized, CompanyLogin.notificationPush)
router.get('/expire/counter', Authorized, CompanyLogin.expireCounter)
router.post('/filter', Authorized, CompanyLogin.companyFilter)


module.exports = router