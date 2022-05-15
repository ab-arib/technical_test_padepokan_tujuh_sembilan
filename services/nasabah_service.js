const sql = require("mssql");
const {
    poolPromise
} = require("../db/connection");
const logger = require("../utils/logger");

const nasabahService = {};

nasabahService.add = async (data) => {
    logger.info(`Add new nasabah`);
    const pool = await poolPromise();
    const nasabahData = await pool.request()
        .input('name', sql.VarChar, data.Name)
        .query(`
            INSERT INTO nasabah (Name) 
            VALUES (@name)
        `);
    return nasabahData.recordset;
}

nasabahService.getAll = async () => {
    logger.info(`Get all nasabah`);
    const pool = await poolPromise();
    const nasabahData = await pool.request()
        .query(`SELECT * FROM nasabah`);
    return nasabahData.recordset;
}

nasabahService.getById = async (Id) => {
    logger.info(`Get nasabah by Id = ${Id}`);
    const pool = await poolPromise();
    const nasabahData = await pool.request()
        .input('accountId', sql.Int, Id)
        .query(`
            SELECT * FROM nasabah
            WHERE AccountId = @accountId
        `);
    return nasabahData.recordset;
}

module.exports = nasabahService;