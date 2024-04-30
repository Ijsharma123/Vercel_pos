const express = require('express')
const router = express.Router()

/* Files Path */
const Authorized = require("../MiddleWares/companyToken");
const CompanyLogin = require('../Controllers/Company/companyAuth')

/* Image Files Path */
const ProfileImage = require('../MiddleWares/ProfilePhoto')

/* CompanyLogin Files Path */
router.post('/login', CompanyLogin.CompanyLogin)
router.get('/list', Authorized, CompanyLogin.companyList)
router.post('/changepassword', Authorized, CompanyLogin.ChangePassword)
router.post('/numberverify', CompanyLogin.findMobileNumber)
router.route("/otpverify").post(CompanyLogin.otpVerify)
router.route("/forgotpassword").post(CompanyLogin.forgetPassword)
router.route("/profilephoto").post(Authorized, ProfileImage.storeProfilePhoto, CompanyLogin.profilePhoto)

router.get('/notification', Authorized, CompanyLogin.notificationPush)
router.get('/expire/counter', Authorized, CompanyLogin.expireCounter)
router.post('/filter', Authorized, CompanyLogin.companyFilter)


module.exports = router