// users passwords before hashing:
// 1. JaJiPass
// 2. BoBaPass
// 3. JaJo
// 4. JaBo

INSERT INTO brands (name, description) VALUES
('H&M', 'It is Swedish'),
('Zara', 'It is Spanish'),
('Chanel', 'Too expensive!');

INSERT INTO products (brand_id, name, unit_price, rating, description, size) VALUES
((SELECT id FROM brands WHERE name='H&M'), 'H&M Logo T-Shirt', 400, 2, '', 'XL'),
((SELECT id FROM brands WHERE name='Zara'), 'Grey Turtleneck', 1000, 4, '', 'M'),
((SELECT id FROM brands WHERE name='Chanel'), 'Black/Gold Blazer', 7500, 4, '', 'L');

INSERT INTO roles (name) VALUES
('ADMIN'),
('EMPLOYEE'),
('CUSTOMER');

INSERT INTO users (role_id, first_name, last_name, password, email) VALUES
(1, 'James', 'Jimick', '$2a$10$Wx9VfDe8VBWLhtNjpct3Yu5NVaRaV1Xq2Ax7AyAWkpvAS1/qNhr4i', 'jamesjimick@mystore.com'),
(2, 'Bob', 'Bayes', '$2a$10$yZYBBv0QM7JS6wY413pbOOcDtCmzmPud/kzGs4hQlQ7V4cGF3KbpW', 'bobbayes@mystore.com'),
(3, 'Jamie', 'Joe', '$2a$10$Exn5SxggXZsfpMkuZRDD..RLWqWonsmVULdPd104Yjjlyn1DqF02m', 'jamiejoe@mystore.com'),
(3, 'Jamie', 'Boe', '$2a$10$CZ1pkyt6M3gVYhkJTBvHVeeH1JAaW1dEnqCCE.DbcGXJTgSYj2She', 'employeeBoe@mystore.com');


INSERT INTO card_types (name) VALUES
('MASTERCARD'),
('VISA'),
('AMERICAN EXPRESS');

INSERT INTO invoices (card_type_id, card_number, card_holder, date, total_price) VALUES
(1, 11223344, 'Bob Bayes', TIMESTAMP('2020-06-26 15:45'), 11500),
(1, 33442255, 'James Jimick', TIMESTAMP('2020-08-11 20:45'), 2000);

INSERT INTO cart_items (user_id, product_id, invoice_id, quantity, unit_price) VALUES
(1, 1, 2, 5, 400),
(1, 2, 2, 2, 1000),
(2, 2, 1, 2, 1000),
(2, 3, 1, 1, 7500);

INSERT INTO favourite_products (product_id, user_id) VALUES
(1, 2),
(3, 1),
(2, 1),
(2, 2);