const express = require("express");

const router = express.Router();

const userCtrl = require("../Controller/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/view/:id", userCtrl.view);
router.post("/edit/:id", userCtrl.edit);

module.exports = router;
