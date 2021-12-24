const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'urShopsDB',
    user: 'root',
    password: ''
});

module.exports = connection;