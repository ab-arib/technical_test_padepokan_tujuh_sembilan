const router = require("express").Router();
const pointController = require("../controllers/point_controller");

router.get("/", pointController.getAll);

module.exports = router;