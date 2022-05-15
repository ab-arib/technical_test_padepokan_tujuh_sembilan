const sql = require("mssql");
const {
    poolPromise
} = require("../db/connection");
const logger = require("../utils/logger");

const pointService = {};

pointService.getAll = async () => {
    logger.info(`Get all nasabah point`);
    const pool = await poolPromise();
    const pointData = await pool.request()
        .query(`
            SELECT nasabah.AccountId, Name, ISNULL(TotalPoint, 0) AS TotalPoint
            FROM nasabah
            LEFT JOIN point ON point.AccountId = nasabah.AccountId
        `);
    return pointData.recordset
}

module.exports = pointService;