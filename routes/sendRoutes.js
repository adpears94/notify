const express = require("express");
const router = express.Router();

const { send, test } = require("../controllers/send");

router.route("/notify").post(send);
router.route("/").get(test);

module.exports = router;