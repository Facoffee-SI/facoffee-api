-- CREATE PERMISSIONS

-- user
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('CREATE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('READ', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('UPDATE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- category
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('CREATE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('READ', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('UPDATE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('CREATE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('READ', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('UPDATE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role_permission
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('CREATE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('READ', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('UPDATE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- user_role
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('CREATE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('READ', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('UPDATE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
