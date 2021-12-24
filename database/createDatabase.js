let db = require("../config/db.config");

let createDatabase = () => {
    db.execute("CREATE DATABASE IF NOT EXISTS urShopsDB;")
}

module.exports = {
    createDatabase
}