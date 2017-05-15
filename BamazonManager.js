var mysql = require('mysql');
var inquirer = require('inquirer');
var password = require('./password.js');
var columnify = require('columnify');

// Initialize mysql database connection
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

function decision() {
    inquirer.prompt({
        type: 'rawlist',
        name: 'choice',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit'],
        message: "What would you like to do?"
    }).then(function(answer) {
        if (answer.choice === 'View Products for Sale') {
            displayInventory();
        } else if (answer.choice === 'View Low Inventory') {
            viewLowInventory();
        } else if (answer.choice === 'Add to Inventory') {
            addInventory();
        } else if (answer.choice === 'Add New Product') {
            addProduct();
        } else if (answer.choice === 'Quit') {
            console.log('Thanks for using the Bamazon Management System.');
            connection.end();
        }
    });
}

// Displays list of inventory of items to user
function displayInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        //For columnify
        var colArr = [];
        for (var i = 0; i < results.length; i++) {
            colArr.push({
                item_id: results[i].item_id,
                Name: results[i].product_name,
                Price: results[i].price,
                Quantity: results[i].stock_quantity
            });
        }
        var columns = columnify(colArr, {
            config: {
                Name: { minWidth: 30 }
            }
        });
        console.log(columns);
        decision();
    });
}

//Displays products with quantity <= 5
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        var colArr = [];
        for (var i = 0; i < results.length; i++) {
            colArr.push({
                item_id: results[i].item_id,
                Name: results[i].product_name,
                Price: results[i].price,
                Quantity: results[i].stock_quantity
            });
        }
        var columns = columnify(colArr, {
            config: {
                Name: { minWidth: 30 }
            }
        });
        console.log(columns);
        decision();
    });
}

// Add to inventory
function addInventory() {
    inquirer.prompt([{
            name: 'itemId',
            message: 'Type the id of the item you would like to update',
            validate: function(value) {
                if (Number.isInteger(parseInt(value))) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: 'quantity',
            message: 'How many would you like to add?',
            validate: function(value) {
                if (Number.isInteger(parseInt(value))) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: answer.itemId },

            function(err, results) {
                if (err) throw err;

                connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: results[0].stock_quantity + answer.quantity
                    },
                    {
                        item_id: answer.itemId
                    }
                ], function(error) {

                    if (error) throw err;
                    console.log("-----------------------------------------");
                    console.log("Inventory Added");
                    console.log("-----------------------------------------");
                    decision();
                });
            });
    });
}

//
function addProduct() {
    inquirer.prompt([{
            name: "item",
            message: "Name of the product: "
        }, {
            name: "price",
            message: "Cost of the product:",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            message: "Quantity to be added:",
            validate: function(value) {
                if (Number.isInteger(parseInt(value))) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "department",
            message: "What department does the product belong in?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.item,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        });
        console.log("New Product Added");
        decision();
    });
}

decision();