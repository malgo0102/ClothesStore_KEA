DROP DATABASE IF EXISTS clothes_store;
CREATE DATABASE IF NOT EXISTS clothes_store;

USE clothes_store;

CREATE TABLE brands (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  brand_id INT NOT NULL,
  name VARCHAR(120) NOT NULL UNIQUE,
  unit_price FLOAT(11) NOT NULL,
  description VARCHAR(255) NOT NULL,
  size VARCHAR(120) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
       ON DELETE CASCADE
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,

  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  role_id INT NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(120) NOT NULL,
  date_joined DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
);

CREATE TABLE card_types (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) UNIQUE NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE invoices(
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  card_type_id INT NOT NULL,
  card_number INT NOT NULL,
  card_holder VARCHAR(120) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  total_price FLOAT(11) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (card_type_id ) REFERENCES card_types(id)
        ON DELETE CASCADE
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  invoice_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price FLOAT NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
	ON DELETE CASCADE

);


CREATE TABLE favourite_products (
  product_id INT NOT NULL,
  user_id INT NOT NULL,

  PRIMARY KEY (product_id, user_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
       ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
       ON DELETE CASCADE
);


# Create new 'admin' user and grant CRUD privileges on all of our clothes_store tables
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '11223344';
GRANT SELECT, INSERT, UPDATE, DELETE
ON clothes_store.*
TO admin@localhost;

SELECT user FROM mysql.user;