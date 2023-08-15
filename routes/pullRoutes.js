const express = require("express");
const router = express.Router();

const { pull } = require("../controllers/pull");

router.route("/pull").post(pull);


module.exports = router;