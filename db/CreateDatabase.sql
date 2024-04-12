USE Facoffee;
CREATE TABLE category (
    id integer not null auto_increment,
    created_date datetime not null,
    name varchar(200)
);
SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;
INSERT INTO category (created_date, name) VALUES ("2018-07-21", "Categoria Teste");