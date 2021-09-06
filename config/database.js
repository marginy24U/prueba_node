
require('dotenv').config()

let dbOptions = {
    username: process.env.DB_USER || "mombacho_admin_sic_solution",
    password: process.env.DB_PASSWORD || "Sic123*",
    database: process.env.DB_NAME || "mombacho_sic_solution",
    host: process.env.DB_HOST || '50.87.192.144',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    dialectOptions: {
        bigNumberStrings: true
    },
    logging: true
};


module.exports = dbOptions;