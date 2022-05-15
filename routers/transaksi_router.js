const router = require("express").Router();
const transaksiController = require("../controllers/transaksi_controller");
const { addTransaksiSchema, getReportSchema } = require("../validations/transaksi_validation");

router.post("/", addTransaksiSchema, transaksiController.add);
router.post("/report", getReportSchema, transaksiController.getReport);

module.exports = router;