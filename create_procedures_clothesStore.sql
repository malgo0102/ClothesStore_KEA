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