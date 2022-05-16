const mysql = require('mysql')
const config = require('../config')

var connection = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    database: config.DBNAME,
    user: config.DBUSER,
    password: config.DBPASSWORD,
});

connection.connect((error) => {
    if (error) {
        return console.log('Database is not connected ERR', error);
    } else {
        return console.log('Database is connected successfully !');
    }
})

module.exports = connection