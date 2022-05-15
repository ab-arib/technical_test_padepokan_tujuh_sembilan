const router = require("express").Router();
const nasabahRoute = require("./nasabah_router");
const transaksiRoute = require("./transaksi_router");
const pointRoute = require("./point_router");

router.use("/nasabah", nasabahRoute);
router.use("/transaksi", transaksiRoute);
router.use("/point", pointRoute);

module.exports = router;