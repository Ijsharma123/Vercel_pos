const express = require("express");
const router = express.Router();

/** Files Path */
const Authorized = require("../MiddleWares/wpsAdminToken");
const WpsAdminLogin = require("../Controllers/wpsAdmin/adminAuth");
const PrivilegeFiles = require('../Controllers/wpsAdmin/privilege')
const RolesFiles = require("../Controllers/wpsAdmin/roles");
const CompanyFiles = require("../Controllers/wpsAdmin/company")
const UserFiles = require("../Controllers/wpsAdmin/user")
const SubscriptionFiles = require("../Controllers/wpsAdmin/subscription")
const VendorFiles = require('../Controllers/wpsAdmin/vendor')
const ModuleFiles = require('../Controllers/wpsAdmin/module')

/* Image Files Path */
const ProfileImage = require('../MiddleWares/ProfilePhoto')

/** Admin Auth Files Path */
router.route("/add").post(WpsAdminLogin.adminCrudCreate)
router.route("/login").post(WpsAdminLogin.adminCrudLogin)
router.route("/admin/changepassword").post(Authorized, WpsAdminLogin.ChangePassword)
router.route("/user/numberverify").post(WpsAdminLogin.findMobileNumber)
router.route("/user/otpverify").post(WpsAdminLogin.otpVerify)
router.route("/user/forgotpassword").post(WpsAdminLogin.forgetPassword)
// router.route("/user/profilephoto").post(Authorized, ProfileImage.storeProfilePhoto, WpsAdminLogin.profilePhoto)
router.route("/list").get(Authorized, WpsAdminLogin.adminCrudList)

/* Privilege Files Path */
router.route('/user/privilege/add').post(Authorized, PrivilegeFiles.addPrivilege)
router.route('/user/privilege/list').get(Authorized, PrivilegeFiles.listPrivilege)
router.route('/user/privilege/update/:_id').patch(Authorized, PrivilegeFiles.updatePrivilege)
router.route('/user/privilege/delete/:_id').delete(Authorized, PrivilegeFiles.deletePrivilege)

/* Roles Files Path */
router.route('/user/role/add').post(Authorized, RolesFiles.addRoleCrud)
router.route('/user/role/list').get(Authorized, RolesFiles.listRoleCrud)
router.route('/user/role/update/:_id').patch(Authorized, RolesFiles.updateRoleCrud)
router.route('/user/role/delete/:_id').delete(Authorized, RolesFiles.deleteRoleCrud)

/* Company Files Path */
router.route('/user/company/add').post(Authorized, CompanyFiles.companyAdd)
router.route('/user/company/list').get(Authorized, CompanyFiles.companyList)
router.route('/user/company/update/:_id').patch(Authorized, CompanyFiles.companyUpdate)
router.route('/user/company/delete/:_id').delete(Authorized, CompanyFiles.companyDelete)

/* User Files Path */
router.route('/user/add').post(Authorized, UserFiles.userAdd)
router.route('/user/list').get(Authorized, UserFiles.userList)
router.route('/user/update/:_id').patch(Authorized, UserFiles.userUpdate)
router.route('/user/delete/:_id').delete(Authorized, UserFiles.userDelete)

/* Subscription Files Path */
router.route('/user/subscription/add').post(Authorized, SubscriptionFiles.addSubscription)
router.route('/user/subscription/list').get(Authorized, SubscriptionFiles.listSubscription)
router.route('/user/subscription/update/:_id').patch(Authorized, SubscriptionFiles.updateSubscription)
router.route('/user/subscription/delete/:_id').delete(Authorized, SubscriptionFiles.deleteSubscription)
router.route('/user/subscription/renew').post(Authorized, SubscriptionFiles.addRenew)

/* Vendor Files Path */
router.route('/user/vendor/add').post(Authorized, VendorFiles.vendorAdd)
router.route('/user/vendor/list').get(Authorized, VendorFiles.vendorList)
router.route('/user/vendor/update/:_id').patch(Authorized, VendorFiles.vendorUpdate)
router.route('/user/vendor/delete/:_id').delete(Authorized, VendorFiles.vendorDelete)

/* Module Files Path */
router.route('/user/privilegeMenuList/add').post(Authorized, ModuleFiles.addModule)
router.route('/user/privilegeMenuList').get(Authorized, ModuleFiles.listModule)
router.route('/user/privilegeMenuList/update/:_id').patch(Authorized, ModuleFiles.updateModule)


module.exports = router