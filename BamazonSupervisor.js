var mysql = require('mysql');
var inquirer = require('inquirer');
var password = require('./password.js');
var columnify = require('columnify');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: password.password,
    database: "Bamazon"
});

//Connect to mysql server and sql database
connection.connect(function(err) {
    if (err) console.log(err);
    console.log('connected');
});

connection.query("SELECT * FROM departments WHERE department_name = 'Electronics'",
    function(err, res) {
        if (err) throw err;
        console.log(res);
    });