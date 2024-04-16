-- CREATE PERMISSION UUID

-- user
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'CREATE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'READ', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'UPDATE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'DELETE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- category
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'CREATE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'READ', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'UPDATE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'DELETE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'CREATE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'READ', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'UPDATE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'DELETE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role_permission
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'CREATE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'READ', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'UPDATE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'DELETE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- user_role
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'CREATE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'READ', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'UPDATE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (id, `action`, table_name, created_at, updated_at) VALUES(uuid(), 'DELETE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));