const express = require("express");
const router = express.Router();

/** Files Path */
const AdminLogin = require("../Controllers/Admin/adminAuth");
const RolesFiles = require("../Controllers/Admin/roles");
const Authorized = require("../MiddleWares/adminToken");

/** Admin Auth Files Path */
router.route("/add").post(AdminLogin.adminCrudCreate)
router.route("/login").post(AdminLogin.adminCrudLogin)
router.route("/list").get(Authorized, AdminLogin.adminCrudList)

/* Roles Files Path */
router.route('/role/add').post(Authorized, RolesFiles.addRoleCrud)
router.route('/role/list').get(Authorized, RolesFiles.listRoleCrud)
router.route('/role/update/:_id').patch(Authorized, RolesFiles.updateRoleCrud)
router.route('/role/delete/:_id').delete(Authorized, RolesFiles.deleteRoleCrud)


module.exports = router