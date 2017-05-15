CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(13,2) NOT NULL DEFAULT 0,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Betamax player', 'Electronics', 49.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('VCR player', 'Electronics', 99.99, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Laserdisc player', 'Electronics', 129.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('DVD Player', 'Electronics', 89.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('CD Player', 'Electronics', 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Walkman', 'Electronics', 50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('New Coke', 'Food', 2.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Crystal Pepsi', 'Food', 2, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mulan Szechuan Sauce', 'Food', 999999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Polybius Arcade Machine', 'Video Games', 1000000, 1);

ALTER TABLE products
ADD product_sales DECIMAL(13,2) NOT NULL DEFAULT 0;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    over_head_costs DECIMAL(13,2) NOT NULL DEFAULT 0,
    total_sales DECIMAL(13,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);

SELECT * FROM products;

SELECT * FROM departments;


