const nasabahService = require("../services/nasabah_service");
const logger = require("../utils/logger");

const nasabahController = {};

nasabahController.add = async (req, res, next) => {
    try {
        logger.info(`Add new nasabah, request = ${JSON.stringify(req.body)}`);
        const nasabah = await nasabahService.add(req.body);
        logger.info(`Add new nasabah success`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Add new nasabah, success`,
            data: {}
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

nasabahController.getAll = async (req, res, next) => {
    try {
        logger.info(`Get all nasabah, request`);
        const nasabah = await nasabahService.getAll();
        logger.info(`Get all nasabah, success`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Get all nasabah, success`,
            data: nasabah
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

module.exports = nasabahController;