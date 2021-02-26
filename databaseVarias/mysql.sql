CREATE DATABASE database_articulos;

USE database_articulos;

---------------------------------------------------------

CREATE TABLE test_tiendas(
    ID_TIENDA INT(11) NOT NULL,            
    NOMBRE VARCHAR(30) NOT NULL    
);

ALTER TABLE test_tiendas 
	ADD PRIMARY KEY (ID_TIENDA);

ALTER TABLE test_tiendas
	MODIFY ID_TIENDA INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE test_tiendas; 

SELECT * FROM test_tiendas;
delete from test_tiendas
----------------------------------------------------------

CREATE TABLE test_categorias(
    ID_CATEGORIA INT(11) NOT NULL,            
    NOMBRE VARCHAR(30) NOT NULL    
);

ALTER TABLE test_categorias
	ADD PRIMARY KEY (ID_CATEGORIA);

ALTER TABLE test_categorias
	MODIFY ID_CATEGORIA INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


DESCRIBE test_categorias;

INSERT INTO TEST_CATEGORIAS ( NOMBRE) VALUES ( 'Deportivo');
INSERT INTO TEST_CATEGORIAS ( NOMBRE) VALUES ( 'Joyeria');
INSERT INTO TEST_CATEGORIAS ( NOMBRE) VALUES ( 'Tecnologia');
INSERT INTO TEST_CATEGORIAS ( NOMBRE) VALUES ( 'Abarrote');

select * from test_categorias;

----------------------------------------------------------


CREATE TABLE test_articulos(
    ID_ARTICULO INT(11) NOT NULL,    
    NOMBRE VARCHAR(30) NOT NULL,        
    ID_CATEGORIA INT(11) NOT NULL,    
        
    CONSTRAINT FK_T_A_C FOREIGN KEY (ID_CATEGORIA) REFERENCES  test_categorias(ID_CATEGORIA)
);

ALTER TABLE test_articulos
	ADD PRIMARY KEY (ID_ARTICULO);

ALTER TABLE test_articulos
	MODIFY ID_ARTICULO INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


DESCRIBE test_articulos;
select * from test_articulos;


CREATE TABLE test_inventario(
    ID_INVENTARIO INT(11) NOT NULL, 
    ID_TIENDA INT(11) NOT NULL, 
    ID_ARTICULO INT(11) NOT NULL, 
    CANTIDAD INT(11) NOT NULL,     
      
    CONSTRAINT FK_T_I_T FOREIGN KEY (ID_TIENDA) REFERENCES test_tiendas(ID_TIENDA),
    CONSTRAINT FK_T_I_A FOREIGN KEY (ID_ARTICULO) REFERENCES test_articulos (ID_ARTICULO) 

);

ALTER TABLE test_inventario
	ADD PRIMARY KEY (ID_TIENDA, ID_ARTICULO);

ALTER TABLE test_inventario
	MODIFY ID_INVENTARIO INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
