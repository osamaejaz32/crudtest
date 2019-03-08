const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'http://192.168.0.130:8080',
    user:'root',
    password:'',
    database:'quizac'
})
connection.connect()

exports.module = {connection};