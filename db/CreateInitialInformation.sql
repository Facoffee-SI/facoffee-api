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

-- ROLE-ADMIN
SET @uuid_role = uuid();
INSERT INTO `role` (id, name, created_at, updated_at) VALUES(@uuid_role,'Administrador', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));


-- ROLE-PERMISSION
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 1, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 2, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 3, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 4, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 5, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 6, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 7, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 8, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 9, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 11, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 12, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 13, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 14, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 15, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 16, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 17, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 18, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 19, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 19, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
INSERT INTO role_permission (id, role_id, permission_id, created_at, updated_at) VALUES(uuid(), @uuid_role, 20, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));


-- USER
-- EMAIL: adminuser@mailinator.com
-- SENHA: 123456789Ab!
SET @uuid_user = uuid();
INSERT INTO `user`
(id, name, email, password, profile_picture, is_admin, created_at, updated_at, deleted_at)
VALUES
(@uuid_user, 'Admin User', 'adminuser@mailinator.com', '$2a$10$wk7XG.FYocppdabLWuuIv.zv7fY2PlFlnJev1lgICcJqoOPJbzh4i', '12345.com', 1, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL);


-- USER-ROLE
INSERT INTO user_role (id,user_id,role_id,created_at,updated_at) VALUES
(uuid(), @uuid_user, @uuid_role, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
