-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2024 a las 23:34:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_correos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correos`
--

CREATE TABLE `correos` (
  `id` int(11) NOT NULL,
  `remitente_id` int(11) NOT NULL,
  `destinatario_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `asunto` varchar(255) NOT NULL,
  `archivado` tinyint(1) DEFAULT 0,
  `eliminado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `correos`
--

INSERT INTO `correos` (`id`, `remitente_id`, `destinatario_id`, `nombre`, `contenido`, `leido`, `created_at`, `asunto`, `archivado`, `eliminado`) VALUES
(345, 2, 1, 'Chiste rápido', '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.', 0, '2024-09-15 16:30:00', 'Chiste de pájaros', 0, 0),
(346, 3, 1, 'Correo sorpresa', '¡Te ganaste un premio! Una sonrisa por leer este correo.', 0, '2024-09-15 16:31:00', 'Sorpresa graciosa', 0, 0),
(347, 4, 1, 'Humor tecnológico', '¿Por qué los programadores prefieren el teclado en vez del ratón? ¡Porque no les gustan los clics!', 0, '2024-09-15 16:32:00', 'Chiste de programadores', 0, 0),
(348, 5, 1, 'El gato sabio', 'Mi gato intentó programar hoy... Ahora mi ordenador sólo maúlla.', 0, '2024-09-15 16:33:00', 'Gato programador', 0, 0),
(349, 6, 1, 'Hora del café', 'Si los programadores tuvieran una mascota, sería un cafetera automática.', 0, '2024-09-15 16:34:00', 'Café y código', 0, 0),
(350, 7, 1, 'Broma de oficina', 'En mi oficina somos tan graciosos que el silencio incómodo se ha vuelto nuestra especialidad.', 0, '2024-09-15 16:35:00', 'Silencio incómodo', 0, 0),
(351, 8, 1, 'Chiste matemático', '¿Sabes cuál es el colmo de un matemático? No encontrar una solución.', 0, '2024-09-15 16:36:00', 'El colmo de un matemático', 0, 0),
(352, 9, 1, 'Humor de viernes', 'Un viernes sin café es como... ¡espera! ¿Es siquiera viernes?', 0, '2024-09-15 16:37:00', 'Viernes sin café', 0, 0),
(353, 10, 1, 'Correo absurdo', 'A veces me pregunto si el wifi siente mis emociones, porque siempre me deja solo en los momentos importantes.', 0, '2024-09-15 16:38:00', 'Wifi con emociones', 0, 0),
(354, 11, 1, 'La silla mágica', 'Hoy mi silla de oficina se inclinó hacia atrás... ¡Definitivamente el momento más emocionante del día!', 0, '2024-09-15 16:39:00', 'Aventuras en la oficina', 0, 0),
(355, 12, 1, 'El perro ingeniero', 'Le dije a mi perro que sería un gran ingeniero... Ahora sólo me ladra en binario.', 0, '2024-09-15 16:40:00', 'Perro binario', 0, 0),
(356, 13, 1, 'Correo perezoso', 'A veces sueño que respondo correos... pero luego me despierto y no quiero hacerlo.', 0, '2024-09-15 16:41:00', 'Sueños perezosos', 0, 0),
(357, 14, 1, 'Humor de pantallas', 'El otro día hablé con mi pantalla... ¿Sabes qué? No me respondió.', 0, '2024-09-15 16:42:00', 'Pantallas calladas', 0, 0),
(358, 15, 1, 'Correo filosófico', 'Si un correo no es leído, ¿realmente fue enviado?', 0, '2024-09-15 16:43:00', 'Correo filosófico', 0, 0),
(359, 16, 1, 'Humor eléctrico', '¿Qué dijo el enchufe a la lámpara? \"¡Conéctate a la vida!\"', 0, '2024-09-15 16:44:00', 'Enchufe motivacional', 0, 0),
(360, 17, 1, 'Chiste de teclado', 'Si los teclados pudieran hablar, probablemente dirían: \"¡Déjame descansar, ya has escrito suficiente!\"', 0, '2024-09-15 16:45:00', 'Teclado agotado', 0, 0),
(361, 18, 1, 'Correo inesperado', 'Este correo no debería estar aquí, pero ya que lo leíste, ¡sonríe!', 0, '2024-09-15 16:46:00', 'Correo intruso', 0, 0),
(362, 19, 1, 'Broma de oficina', 'El café de la oficina es tan fuerte que debería llevar una advertencia de \"Altamente Adictivo\".', 0, '2024-09-15 16:47:00', 'Café mortal', 0, 0),
(363, 20, 1, 'Correo de la abuela', 'Mi abuela dice que los correos electrónicos son la nueva moda... pero aún me manda cartas.', 0, '2024-09-15 16:48:00', 'Correo retro', 0, 0),
(364, 21, 1, 'Humor nocturno', 'Cuando las 3 de la mañana te parecen la hora perfecta para programar, sabes que algo no está bien.', 0, '2024-09-15 16:49:00', 'Programación nocturna', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `created_at`, `password`) VALUES
(1, 'Jesús Parfer', 'jesusparfer@outlook.com', '2024-09-15 16:08:03', 'ceivalencia'),
(2, 'Carlos Perez', 'carlosperez@example.com', '2024-09-15 16:09:00', 'password123'),
(3, 'Laura García', 'lauragarcia@example.com', '2024-09-15 16:10:00', 'password456'),
(4, 'Miguel Ruiz', 'miguelruiz@example.com', '2024-09-15 16:11:00', 'password789'),
(5, 'Sofia Martinez', 'sofiamartinez@example.com', '2024-09-15 16:12:00', 'passwordABC'),
(6, 'Andres Fernandez', 'andresfernandez@example.com', '2024-09-15 16:13:00', 'passwordDEF'),
(7, 'Lucia Torres', 'luciatorres@example.com', '2024-09-15 16:14:00', 'passwordGHI'),
(8, 'Juan Sanchez', 'juansanchez@example.com', '2024-09-15 16:15:00', 'passwordJKL'),
(9, 'Ana Lopez', 'analopez@example.com', '2024-09-15 16:16:00', 'passwordMNO'),
(10, 'Pedro Gomez', 'pedrogomez@example.com', '2024-09-15 16:17:00', 'passwordPQR'),
(11, 'Marta Diaz', 'martadiaz@example.com', '2024-09-15 16:18:00', 'passwordSTU'),
(12, 'Raul Moreno', 'raulmoreno@example.com', '2024-09-15 16:19:00', 'passwordVWX'),
(13, 'Elena Vargas', 'elenavargas@example.com', '2024-09-15 16:20:00', 'passwordYZA'),
(14, 'Fernando Gil', 'fernandogil@example.com', '2024-09-15 16:21:00', 'passwordBCD'),
(15, 'Maria Castro', 'mariacastro@example.com', '2024-09-15 16:22:00', 'passwordEFG'),
(16, 'Diego Romero', 'diegoromero@example.com', '2024-09-15 16:23:00', 'passwordHIJ'),
(17, 'Carmen Blanco', 'carmenblanco@example.com', '2024-09-15 16:24:00', 'passwordKLM'),
(18, 'Jorge Ortega', 'jorgeortega@example.com', '2024-09-15 16:25:00', 'passwordNOP'),
(19, 'Patricia Suarez', 'patriciasuarez@example.com', '2024-09-15 16:26:00', 'passwordQRS'),
(20, 'Luis Navarro', 'luisnavarro@example.com', '2024-09-15 16:27:00', 'passwordTUV'),
(21, 'Rosa Reyes', 'rosareyes@example.com', '2024-09-15 16:28:00', 'passwordWXY');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `correos`
--
ALTER TABLE `correos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `remitente_id` (`remitente_id`),
  ADD KEY `destinatario_id` (`destinatario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `correos`
--
ALTER TABLE `correos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=365;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `correos`
--
ALTER TABLE `correos`
  ADD CONSTRAINT `correos_ibfk_1` FOREIGN KEY (`remitente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `correos_ibfk_2` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
