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

// Allows Supervisor to select what to do
function svDecision() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add Department",
            "View Product Sales by Department",
            "Quit"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "Add Department":
                addDept();
                break;

            case "View Product Sales by Department":
                productSales();
                break;

            case "Quit":
                exit();
        }
    });
}

// Lists sales and profit for a department
function productSales() {
    connection.query("SELECT *, total_sales - over_head_costs AS total_profit FROM departments", function(err, res) {
        var colArr = [];
        for (var i = 0; i < res.length; i++) {
            colArr.push({
                department_id: res[i].department_id,
                department_name: res[i].department_name,
                overhead_costs: res[i].over_head_costs,
                total_sales: res[i].total_sales,
                total_profit: res[i].total_profit
            });
        }
        var columns = columnify(colArr);
        console.log(columns);
        svDecision();
    });
}

// Adds a Department to departments table
function addDept() {
    inquirer.prompt([{
            name: "dept",
            message: "Name of the Department:"
        }, {
            name: "overhead",
            message: "Overhead costs of the Department:",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(answer) {
        connection.query("INSERT INTO departments SET ?", {
            over_head_costs: answer.overhead,
            department_name: answer.dept,

        });
        console.log("New Department Added");
        svDecision();
    });
}

function exit() {
    console.log("--------------------------------");
    console.log("See you later");
    console.log("--------------------------------");
    connection.end();
}

svDecision();