const express = require("express");
const router = express.Router();

const { pull } = require("../controllers/pull");

router.route("/pull").get(pull);


module.exports = router;