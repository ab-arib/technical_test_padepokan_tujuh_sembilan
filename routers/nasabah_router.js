const router = require("express").Router();
const nasabahController = require("../controllers/nasabah_controller");
const { addNasabahSchema } = require("../validations/nasabah_validation");

router.post("/", addNasabahSchema, nasabahController.add);
router.get("/", nasabahController.getAll);

module.exports = router;