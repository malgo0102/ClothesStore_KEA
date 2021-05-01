USE clothes_store;

#DROP INDEX idx_users_role ON users;
#DROP INDEX idx_products_rating ON products;
#DROP INDEX idx_orders_date ON orders;

CREATE INDEX idx_users_role ON users (role_id); # For faster querying on users by role
CREATE INDEX idx_products_rating ON products (rating); # For faster ratings queries on products by rating
CREATE INDEX idx_orders_date ON invoices (date); # For faster queries on invoices by specific dates

SHOW INDEX FROM users;
SHOW INDEX FROM invoices;
SHOW INDEX FROM products;

EXPLAIN SELECT first_name, last_name, email, role_id FROM users WHERE role_id = 2;
EXPLAIN SELECT id, password, date_joined, last_active FROM users WHERE role_id = 3;

EXPLAIN SELECT * FROM users WHERE role_id = 3;
EXPLAIN SELECT id FROM users ORDER BY role_id;
EXPLAIN SELECT * FROM users ORDER BY first_name;
EXPLAIN SELECT * FROM products WHERE rating >= 4;
EXPLAIN SELECT * FROM invoices WHERE card_holder = 'Bob Bayes' AND date = '2020-06-26 15:45';
EXPLAIN SELECT * FROM invoices WHERE date = '2020-06-26 15:45';