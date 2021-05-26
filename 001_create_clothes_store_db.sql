DROP DATABASE IF EXISTS clothes_store;
CREATE DATABASE IF NOT EXISTS clothes_store;

USE clothes_store;

CREATE TABLE IF NOT EXISTS brands (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  brand_id INT(11),
  name VARCHAR(120) NOT NULL UNIQUE,
  unit_price FLOAT(11) NOT NULL,
  description VARCHAR(255) NOT NULL,
  size VARCHAR(120) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  role_id INT(11) NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  password VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  date_joined DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_types (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) UNIQUE NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS invoices(
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  card_type_id INT(11) NOT NULL,
  card_number INT(16) NOT NULL,
  card_holder VARCHAR(120) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  total_price FLOAT(11) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (card_type_id ) REFERENCES card_types(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  user_id INT(11) NOT NULL,
  product_id INT(11) NOT NULL,
  invoice_id INT(11) NOT NULL,
  quantity INT(11) NOT NULL,
  unit_price FLOAT(11) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
	ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS favourite_products (
  product_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,

  PRIMARY KEY (product_id, user_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
       ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
       ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_users (
  OLD_id INT(11),
  OLD_first_name VARCHAR(120),
  OLD_last_name VARCHAR(120),
  OLD_email VARCHAR(120),
  NEW_id INT(11),
  NEW_first_name VARCHAR(120),
  NEW_last_name VARCHAR(120),
  NEW_email VARCHAR(120),
  user VARCHAR(120),
  action_type VARCHAR(120),
  action_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_invoices (
  OLD_id INT(11),
  OLD_card_type_id INT(11),
  OLD_card_number INT(16),
  OLD_card_holder VARCHAR(120),
  OLD_total_price FLOAT(11),
  NEW_id INT(11),
  NEW_card_type_id INT(11),
  NEW_card_number INT(16),
  NEW_card_holder VARCHAR(120),
  NEW_total_price FLOAT(11),
  user VARCHAR(120),
  action_type VARCHAR(120),
  action_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);


# Create new 'admin' user and grant CRUD privileges on all of our clothes_store tables
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '11223344';
GRANT SELECT, INSERT, UPDATE, DELETE
ON clothes_store.*
TO admin@localhost;

SELECT user FROM mysql.user;

