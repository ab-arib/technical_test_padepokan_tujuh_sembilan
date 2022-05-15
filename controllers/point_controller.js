const pointService = require("../services/point_service");
const logger = require("../utils/logger");

const pointController = {};

pointController.getAll = async (req, res, next) => {
    try {
        logger.info(`Get all nasabah point, request`);
        const result = await pointService.getAll();
        logger.info(`Get all nasabah point success`);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: `Get all nasabah point, success`,
            data: result
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

module.exports = pointController;