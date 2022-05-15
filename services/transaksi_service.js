const sql = require("mssql");
const {
    poolPromise
} = require("../db/connection");
const logger = require("../utils/logger");
const {
    pulsaPoint,
    listrikPoint
} = require("../utils/point_utils");

const transaksiService = {};

transaksiService.add = async (data) => {
    logger.info(`Add new transaksi`);
    let transaksiPoint;
    if (data.Description == 'Beli Pulsa') {
        transaksiPoint = pulsaPoint(data.Amount);
    }
    if (data.Description == 'Bayar Listrik') {
        transaksiPoint = listrikPoint(data.Amount);
    }
    if (data.Description == 'Setor Tunai') {
        transaksiPoint = 0;
    }
    const pool = await poolPromise();
    const pointData = await pool.request()
        .input('accountId', sql.Int, data.AccountId)
        .query(`
            SELECT * FROM point
            WHERE AccountId = @accountId
        `);
    if (pointData.recordset.length > 0) {
        const totalPoint = pointData.recordset[0].TotalPoint + transaksiPoint;
        const transaksiData = await pool.request()
        .input('accountId', sql.Int, data.AccountId)
        .input('transactionDate', sql.Date, data.TransactionDate)
        .input('description', sql.VarChar, data.Description)
        .input('debitCreditStatus', sql.VarChar, data.DebitCreditStatus)
        .input('amount', sql.Int, data.Amount)
        .input('score', sql.Int, totalPoint)
        .query(`
            BEGIN TRY
                BEGIN TRANSACTION;
                    INSERT INTO transaksi (AccountId, TransactionDate, Description, DebitCreditStatus, Amount)
                    VALUES (@accountId, @transactionDate, @description, @debitCreditStatus, @amount);
                    UPDATE point
                    SET TotalPoint = @score
                    WHERE AccountId = @accountId;
                COMMIT TRANSACTION;
            END TRY
            BEGIN CATCH
                ROLLBACK TRANSACTION;
            END CATCH;
        `);
        return transaksiPoint;
    }
    // create new point if pointData not exist yet
    const transaksiData = await pool.request()
        .input('accountId', sql.Int, data.AccountId)
        .input('transactionDate', sql.Date, data.TransactionDate)
        .input('description', sql.VarChar, data.Description)
        .input('debitCreditStatus', sql.VarChar, data.DebitCreditStatus)
        .input('amount', sql.Int, data.Amount)
        .input('score', sql.Int, transaksiPoint)
        .query(`
            BEGIN TRY
                BEGIN TRANSACTION;
                    INSERT INTO transaksi (AccountId, TransactionDate, Description, DebitCreditStatus, Amount)
                    VALUES (@accountId, @transactionDate, @description, @debitCreditStatus, @amount);
                    INSERT INTO point (AccountId, TotalPoint)
                    VALUES (@accountId, @score);
                COMMIT TRANSACTION;
            END TRY
            BEGIN CATCH
                ROLLBACK TRANSACTION;
            END CATCH
        `);
    return transaksiPoint;
}

transaksiService.getReport = async (data) => {
    logger.info(`Get transaksi report`);
    const pool = await poolPromise();
    const transaksiData = await pool.request()
        .input('startDate', sql.Date, data.StartDate)
        .input('endDate', sql.Date, data.EndDate)
        .input('accountId', sql.Int, data.AccountId)
        .query(`
            SELECT * FROM transaksi
            WHERE TransactionDate BETWEEN @startDate AND @endDate
            AND AccountId = @accountId
            ORDER BY TransactionDate ASC
        `);
    if (!transaksiData.recordset || transaksiData.recordset.length <= 0) {
        return transaksiData.recordset;
    }
    // construct output
    let result = [];
    for (let i = 0; i < transaksiData.recordset.length; i++) {
        const value = transaksiData.recordset[i]; 
        if (value.DebitCreditStatus == 'C') {
            result.push({
                TransactionDate: value.TransactionDate,
                Description: value.Description,
                Credit: value.Amount,
                Debit: '-',
                Amount: value.Amount
            });
            continue;
        }
        result.push({
            TransactionDate: value.TransactionDate,
            Description: value.Description,
            Credit: '-',
            Debit: value.Amount,
            Amount: value.Amount
        });
    }
    return result;
}

module.exports = transaksiService;