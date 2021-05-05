START TRANSACTION;

USE clothes_store;

INSERT INTO carts (user_id, timestamp) VALUES
(1, TIMESTAMP('2020-06-24 18:30'));

INSERT INTO invoices (card_type_id, card_number, card_holder, date, total_price) VALUES
(1, 11223344, 'Bob Bayes', TIMESTAMP('2020-06-26 15:45'), 11500),
(1, 33442255, 'James Jimick', TIMESTAMP('2020-08-11 20:45'), 2000);

INSERT INTO cart_items (cart_id, product_id, invoice_id, quantity, unit_price) VALUES
(1, 1, 1, 5, 400);

COMMIT;
