USE clothes_store;

# Using simple queries
SELECT * FROM brands;
SELECT * FROM products;
SELECT * FROM roles;
SELECT * FROM users;
SELECT * FROM card_types;
SELECT * FROM invoices;
SELECT * FROM cart_items;
SELECT * FROM favourite_products;

# Get products of selected brand
SELECT * FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'Zara');
SELECT * FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'Chanel');

# Get favourite items of a customer
SELECT products.name
FROM products LEFT JOIN favourite_products ON products.id = favourite_products.product_id
WHERE favourite_products.user_id = 1
ORDER BY products.name;

# Querying through views
SELECT * FROM v_users;
SELECT * FROM v_users_info;
SELECT * FROM v_products;
SELECT * FROM v_invoices;
SELECT first_name, last_name, email FROM v_users;
SELECT first_name, last_name, password, email, role_id FROM v_users_info;
SELECT product_name, unit_price, brand_name FROM v_products;
SELECT card_type_id, card_number, date FROM v_invoices;

# Querying to see indexes for some of our tables
SHOW INDEX FROM users;
SHOW INDEX FROM invoices;
SHOW INDEX FROM products;

# Query data through procedure calls
CALL get_products_with_discount('H&M', 80);
CALL get_orders_between_dates('2020-05-24', '2020-06-28');

# Update queries
UPDATE users
    SET last_name = 'Becker', role_id = 3
    WHERE id = 2;

UPDATE products
    SET name = 'Black Cardigan', unit_price = 1100
    WHERE id = 2;

# Delete queries
DELETE FROM brands WHERE id > 2;
DELETE FROM users WHERE last_name = 'Jimick';
DELETE FROM users WHERE first_name = 'Jamie' AND role_id = 3;
