# Bamazon

## Overview

Bamazon is a storefront made using MySQL and Node that updates a backend database based on the actions of the user.  There are different views for three types of users: Customer, Manager and Supervisor.

## Prerequisites

Users must have node installed with the mysql, inquirer and columnify modules.  MySQL Workbench can also be used to set up the database required.  The 'BamazonDB.sql' file can be used to initialize the necessary database and tables.

## Usage

The app consists of three parts: 'BamazonCustomer.js', 'BamazonManager.js', and 'BamazonSupervisor.js'.

### Using BamazonCustomer

1. From the Git Bash window, type: 'node BamazonCustomer.js'

2. A table of items in the store will be displayed.  Type the number of the ITEM_ID that user wishes to purchase.

![Customer-Step2](Images/Customer-01.png)

3. Type the quantity you want to purchase.

4. If the store has enough stock, the purchase will complete and the cost of purchase will be displayed.  Otherwise user will be asked to try again.

5.  The app will ask if user wants to make another purchase.  User may use the arrow keys to select YES or NO.

![Customer-Step5](Images/Customer-02.png)

- - -

### Using BamazonSupervisor

1. From the Git Bash window, type: 'node BamazonManager.js'

2. Type the number of the task you want to perform and press enter

3. When the manager is finished with a task, the app will ask the manager if he/she would like to perform another.

![Manager-Step2](Images/Manager-01.png)

    * 'View Products for Sale' shows the ITEM_ID, NAME, PRICE, and QUANTITY for all products in the store
    * 'View Low Inventory' lists all products with an inventory count lower than 5.
    * 'Add to Inventory' displays a prompt that will let the manager add quantity to any product currently in the store.
    * 'Add New Product' allows the manager to add a completely new product to the store.
    
![Manager-Add_Product](Images/Manager-02d.png)



### Using BamazonSupervisor

1. From the Git Bash window, type: 'node BamazonSupervisor.js'

2. Type the number of the task you want to perform and press enter

![Supervisor-Step2](Images/Supervisor-01.png)

    * 'Create New Department' displays a prompt that will let the supervisor add a new department to the database. The app will ask for the name and over_head_costs for the department.  If the department already exists the over_head_costs will be updated.

    * 'View Product Sales by Department' will show a summarized table listing the DEPARTMENT_ID, DEPARTMENT_NAME, OVER_HEAD_COSTS, TOTAL_SALES and TOTAL-PROFIT for each department in the database.




