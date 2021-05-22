USE clothes_store;
DROP PROCEDURE IF EXISTS get_products_with_discount;
DROP PROCEDURE IF EXISTS get_orders_between_dates;

DELIMITER $$
    CREATE PROCEDURE get_products_with_discount(brand_name VARCHAR(255), discount FLOAT)
        BEGIN
            SELECT products.name AS product_name, (products.unit_price * (100 - discount) / 100) AS unit_price,
                   products.rating AS rating, products.description AS product_description,
                   brands.name AS brand_name, brands.description AS brand_description
            FROM products
            INNER JOIN brands ON products.brand_id = brands.id
            WHERE brands.name = brand_name;
        END $$
DELIMITER ;

DELIMITER $$
    CREATE PROCEDURE get_orders_between_dates(from_date DATETIME, to_date DATETIME)
        BEGIN
            SELECT card_type_id, card_number, card_holder, date, total_price
            FROM invoices
            WHERE date >= from_date AND date <= to_date;
        END $$
DELIMITER ;

DELIMITER $$
    CREATE PROCEDURE get_user_orders(user_id INT)
        BEGIN
            SELECT products.name, products.description, products.size,
                   products.rating, brands.name, cart_items.quantity,
                   cart_items.unit_price, (cart_items.quantity * cart_items.unit_price) AS total_price, invoices.date
            FROM users
            INNER JOIN cart_items ON users.id = cart_items.user_id
            INNER JOIN products ON cart_items.product_id = products.id
            INNER JOIN brands ON products.brand_id = brands.id
            INNER JOIN invoices ON cart_items.invoice_id = invoices.id
            WHERE users.id = user_id;
        END $$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE get_products_with_discount TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE get_orders_between_dates TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE get_user_orders TO 'admin'@'localhost';