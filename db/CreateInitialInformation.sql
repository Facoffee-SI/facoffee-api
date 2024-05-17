-- POST PERMISSIONS

-- user
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('POST', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('GET', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('PATCH', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'user', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- category
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('POST', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('GET', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('PATCH', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'category', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('POST', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('GET', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('PATCH', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- role_permission
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('POST', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('GET', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('PATCH', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'role_permission', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- user_role
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('POST', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('GET', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('PATCH', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO permission (`action`, table_name, created_at, updated_at) VALUES('DELETE', 'user_role', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));

-- USER
-- EMAIL: adminuser@mailinator.com
-- SENHA: 123456789Ab!
INSERT INTO `user`
(id, name, email, password, profile_picture, is_admin, created_at, updated_at, deleted_at)
VALUES
(uuid(), 'Admin User', 'adminuser@mailinator.com', '$2a$10$wk7XG.FYocppdabLWuuIv.zv7fY2PlFlnJev1lgICcJqoOPJbzh4i', '12345.com', 1, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL);