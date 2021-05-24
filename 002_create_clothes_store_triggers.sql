# TRIGGERS
USE clothes_store;

DELIMITER
$$
    CREATE TRIGGER brands_before_delete
        AFTER DELETE ON brands
            FOR EACH ROW
            BEGIN
                UPDATE products
                    SET products.brand_id = NULL
                    WHERE brand_id = OLD.id;
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_invoices_after_insert
        AFTER INSERT ON invoices
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_invoices
                VALUES (
                        NULL, NULL, NULL, NULL, NULL,
                        NEW.id, NEW.card_type_id, NEW.card_number,
                        NEW.card_holder, NEW.total_price,
                        'INSERT', NOW()
                );
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_invoices_after_update
        AFTER UPDATE ON invoices
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_invoices
                VALUES (
                        OLD.id, OLD.card_type_id, OLD.card_number,
                        OLD.card_holder, OLD.total_price,
                        NEW.id, NEW.card_type_id, NEW.card_number,
                        NEW.card_holder, NEW.total_price,
                        'UPDATE', NOW()
                );
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_invoices_after_delete
        AFTER DELETE ON invoices
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_invoices
                VALUES (
                        OLD.id, OLD.card_type_id, OLD.card_number,
                        OLD.card_holder, OLD.total_price,
                        NULL, NULL, NULL, NULL, NULL,
                        'DELETE', NOW()
                );
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_users_after_insert
        AFTER INSERT ON users
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_users
                VALUES (
                        null, null,
                        null, null,
                        NEW.id, NEW.first_name,
                        NEW.last_name, NEW.email,
                        'INSERT', NOW()
                );
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_users_after_update
        AFTER UPDATE ON users
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_users
                VALUES (
                        OLD.id, OLD.first_name,
                        OLD.last_name, OLD.email,
                        NEW.id, NEW.first_name,
                        NEW.last_name, NEW.email,
                        'UPDATE', NOW()
                );
            END $$
DELIMITER ;

DELIMITER
$$
    CREATE TRIGGER audit_users_after_delete
        AFTER DELETE ON users
            FOR EACH ROW
            BEGIN
                INSERT INTO audit_users
                VALUES (
                        OLD.id, OLD.first_name,
                        OLD.last_name, OLD.email,
                        null, null,
                        null, null,
                        'DELETE', NOW()
                );
            END $$
DELIMITER ;