USE clothes_store;

# Get products of selected brand
SELECT * FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'Zara');
SELECT * FROM products WHERE brand_id = (SELECT id FROM brands WHERE name = 'Chanel');

# Get favourite items of a customer
SELECT products.name
FROM products LEFT JOIN favourite_products ON products.id = favourite_products.product_id
WHERE favourite_products.user_id = 1
ORDER BY products.name;

