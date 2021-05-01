USE clothes_store;

CREATE VIEW v_users AS
    SELECT first_name, last_name, email, date_joined, last_active
    FROM users
    WHERE role_id = 3 OR role_id = 2;

CREATE VIEW v_users_info AS
    SELECT *
    FROM users
    WHERE role_id = 3 OR role_id = 2;

CREATE VIEW v_products AS
    SELECT products.name AS product_name, unit_price, rating,
           products.description AS product_description, brands.name AS brand_name
    FROM products
    INNER JOIN brands on products.brand_id = brands.id;

CREATE VIEW v_invoices AS
    SELECT card_type_id, card_number, card_holder, date, total_price
    FROM invoices;