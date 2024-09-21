const Logger = require("./Logger");

class MySQL {
    constructor() {
        Logger.log("Creaeting connetion to MYSQL!", "database");

        const mysql = require("mysql2");
        this.pool = mysql.createPool({
            user: process.env.MYSQL_USERNAME,
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            password: process.env.MYSQL_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            multipleStatements: true,
            connectTimeout: 60000
        }).promise();
    }

    getRows = async (query, params) => {
        try {
            let results = await this.pool.query(query, params);
            return results[0];
        } catch (err) {
            throw new Error("Server error: There was an issue with the MySQL database. " + err.message);
        }
    }

    getRow = async (query, params) => {
        try {
            return (await this.pool.query(query, params))[0][0];
        } catch (err) {
            throw new Error("Server error: There was an issue with the MySQL database. " + err.message);
        }
    }

    getRowFromUSP = async(query, params) => {
        try {
            return (await this.pool.query(query, params))[0][0][0];
        } catch (err) {
            throw new Error("Server error: There was an issue with the MySQL database. " + err.message);
        }
    }

    insertQuery = async (query, params) => {
        try {
            return (await this.pool.query(query, params))[0];
        } catch (err) {
            throw new Error("Server error: There was an issue with the MySQL database. " + err.message);
        }
    }

    updateQuery = async (query, params) => {
        try {
            return (await this.pool.query(query, params));
        } catch (err) {
            throw new Error("Server error: There was an issue with the MySQL database. " + err.message);
        }
    }
}



module.exports = new MySQL();