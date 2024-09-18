ACTIVIDADES SQL: 

INNER JOIN para combinar datos de clientes y pedidos.
LEFT JOIN para mostrar todos los clientes, incluso los que no tienen pedidos.
SUM para calcular el total de ventas por cliente.
COUNT para contar el número de pedidos por cliente. Subconsultas para encontrar clientes con pedidos superiores al promedio.
HAVING para filtrar resultados agregados.
Múltiples JOINs para mostrar detalles completos de los pedidos.


// -- 1. INNER JOIN: Mostrar los pedidos con los nombres de los clientes

SELECT dp.cantidad, c.nombre 
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
INNER JOIN detallespedido dp ON p.id = dp.pedido_id;


// -- 2. LEFT JOIN: Mostrar todos los clientes y sus pedidos (si los tienen)

SELECT
clientes.nombre AS cliente_nombre,
productos.nombre AS producto_nombre 
FROM clientes 
LEFT JOIN pedidos 
ON clientes.id = pedidos.cliente_id 
LEFT JOIN detallespedido 
ON pedidos.id = detallespedido.pedido_id 
LEFT JOIN productos 
ON detallespedido.producto_id = productos.id;

// -- 3. SUM: Calcular el total de ventas por cliente

SELECT clientes.id AS cliente_id, clientes.nombre AS cliente_nombre, SUM(pedidos.total) AS total_ventas
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id
GROUP BY clientes.id, clientes.nombre;


// -- 4. COUNT: Contar el número de pedidos por cliente

SELECT clientes.id AS cliente_id, clientes.nombre AS cliente_nombre, COUNT(pedidos.id) AS numero_pedidos
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id
GROUP BY clientes.id, clientes.nombre;


// -- 5. Subconsulta: Encontrar los clientes que han realizado pedidos superiores al promedio

SELECT clientes.id AS cliente_id, clientes.nombre AS cliente_nombre, pedidos.total
FROM clientes
JOIN pedidos ON clientes.id = pedidos.cliente_id
WHERE pedidos.total > (
    SELECT AVG(pedidos.total) 
    FROM pedidos
);


// -- 6. HAVING: Mostrar clientes que han realizado más de un pedido

SELECT clientes.id AS cliente_id, clientes.nombre AS cliente_nombre, COUNT(pedidos.id) AS numero_pedidos
FROM clientes
JOIN pedidos ON clientes.id = pedidos.cliente_id
GROUP BY clientes.id, clientes.nombre
HAVING COUNT(pedidos.id) > 1;


// -- 7. Múltiples JOINs: Mostrar los detalles de los pedidos incluyendo cliente, producto y cantidad

SELECT 
  clientes.id AS cliente_id, 
  clientes.nombre AS cliente_nombre, 
  pedidos.id AS pedido_id, 
  productos.nombre AS producto_nombre, 
  detallespedido.cantidad
FROM clientes
JOIN pedidos ON clientes.id = pedidos.cliente_id
JOIN detallespedido ON pedidos.id = detallespedido.pedido_id
JOIN productos ON detallespedido.producto_id = productos.id;
