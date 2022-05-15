const sql = require("mssql");
const configDev = require("../config/config.json");
const logger = require("../utils/logger");

const config = {
    user: configDev.development.username,
    password: configDev.development.password,
    server: configDev.development.host,
    database: configDev.development.database,
    options: {
        trustServerCertificate: true
    }
}

const poolPromise = async () => {
    try {
        const Pool = await sql.connect(config);
        logger.info(`Connection to SQL server DB success`);
        return Pool;
    } catch (e) {
        console.log(e);
        logger.error(`Connection to SQL server DB failed`);
        process.exit(-1);       
    }
}

module.exports = {
    poolPromise
}