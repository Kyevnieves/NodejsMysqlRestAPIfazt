const { Router } = require("express");
const { ping } = require("../controllers/index_controllers");
const router = Router();

router.get("/ping", ping);

module.exports = router;
