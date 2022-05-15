const logger = require("../utils/logger");
const nasabahService = require("../services/nasabah_service");
const transaksiService = require("../services/transaksi_service");

const transaksiController = {};

transaksiController.add = async (req, res, next) => {
    try {
        logger.info(`Add new transaksi, request = ${JSON.stringify(req.body)}`);
        const nasabah = await nasabahService.getById(req.body.AccountId);
        if (!nasabah || nasabah.length <= 0) {
            logger.error(`Add new transaksi failed, nasabah not found`);
            return res.status(404).json({
                status: "failed",
                statusCode: 404,
                message: `Nasabah by id = ${req.body.AccountId}, not found`,
                data: {}
            });
        }
        const transaksi = await transaksiService.add(req.body);
        logger.info(`Add new transaksi success`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Add new transaksi, success",
            data: {
                transaksi_poin: transaksi
            }
        });
    } catch (e) {
        logger.error(`Internal server error, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e,
        });
    }
}

transaksiController.getReport = async (req, res, next) => {
    try {
        logger.info(`Get transaksi report, request = ${JSON.stringify(req.body)}`);
        const report = await transaksiService.getReport(req.body);
        if (!report || report.length <= 0) {
            logger.error(`Get transaksi report failed, data not found`);
            return res.status(404).json({
                status: "failed",
                statusCode: 404,
                message: `Report transaksi for nasabah id = ${req.body.AccountId} between ${req.body.StartDate} to ${req.body.EndDate}, not found`,
                data: []
            });
        }
        logger.info(`Get transaksi report success`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Get transaksi report, success",
            data: report
        });
    } catch (e) {
        logger.error(`Internal server error, e = ${e}`);
        return res.status(500).json({
            status: "failed",
            statusCode: 500,
            message: "Internal server error",
            error: e,
        });
    }
}

module.exports = transaksiController;