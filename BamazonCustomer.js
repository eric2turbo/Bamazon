var mysql = require('mysql');
var inquirer = require('inquirer');
var password = require('./password.js');
var columnify = require('columnify');

console.log(password);
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

// Displays list of inventory of items to sell to user
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
        askCustomer();
    });
}

// Ask Customer to select item id and then quantity of that item to buy.  
// Then check and update DB.
function askCustomer() {
    inquirer.prompt([{
            name: 'itemId',
            message: 'Type the id of the item you would like to buy',
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
            message: 'How many would you like to buy?',
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

                if (results[0].stock_quantity < answer.quantity) {
                    console.log("-----------------------------------------");
                    console.log("Insufficient quantity.  Please try again");
                    console.log("-----------------------------------------");
                    displayInventory();
                } else {
                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: results[0].stock_quantity - answer.quantity
                        },
                        {
                            item_id: answer.itemId
                        }
                    ], function(error) {
                        var amt = answer.quantity;
                        var price = results[0].price;
                        var cost = eval(amt * price);
                        if (error) throw err;
                        console.log("-----------------------------------------");
                        console.log("Total Cost of Purchase: " + cost);
                        console.log("-----------------------------------------");
                        restart();
                    });
                }

            });
    });

}

function restart() {
    inquirer.prompt({
        message: "Would you like to make another purchase?",
        type: 'list',
        choices: ['YES', 'NO'],
        name: 'choice'
    }).then(function(answer) {
        if (answer.choice === "YES") {
            displayInventory();
        } else {
            console.log("Thank you for shopping at Bamazon");
            connection.end();
        }
    })
}
displayInventory();