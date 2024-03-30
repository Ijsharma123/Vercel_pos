const express = require("express");
const router = express.Router();

/** Files Path */
const Authorized = require("../MiddleWares/wpsAdminToken");
const WpsAdminLogin = require("../Controllers/wpsAdmin/adminAuth");
const AccessFiles = require('../Controllers/wpsAdmin/access')
const RolesFiles = require("../Controllers/wpsAdmin/roles");
const CompanyFiles = require("../Controllers/wpsAdmin/company")

/** Admin Auth Files Path */
router.route("/add").post(WpsAdminLogin.adminCrudCreate)
router.route("/login").post(WpsAdminLogin.adminCrudLogin)
router.route("/changepassword").post(Authorized, WpsAdminLogin.adminChangePassword)
router.route("/list").get(Authorized, WpsAdminLogin.adminCrudList)

/* Access Files Path */
router.route('/access/add').post(Authorized, AccessFiles.addAccess)
router.route('/access/list').get(Authorized, AccessFiles.listAccess)
router.route('/access/update/:_id').patch(Authorized, AccessFiles.updateAccess)
router.route('/access/delete/:_id').delete(Authorized, AccessFiles.deleteAccess)

/* Roles Files Path */
router.route('/role/add').post(Authorized, RolesFiles.addRoleCrud)
router.route('/role/list').get(Authorized, RolesFiles.listRoleCrud)
router.route('/role/update/:_id').patch(Authorized, RolesFiles.updateRoleCrud)
router.route('/role/delete/:_id').delete(Authorized, RolesFiles.deleteRoleCrud)

/* Company Files Path */
router.route('/company/add').post(Authorized, CompanyFiles.companyAdd)
router.route('/company/list').get(Authorized, CompanyFiles.companyList)
router.route('/company/update/:_id').patch(Authorized, CompanyFiles.companyUpdate)
router.route('/company/delete/:_id').delete(Authorized, CompanyFiles.companyDelete)


module.exports = router