import bcrypt from 'bcrypt';
import mysqldb from '../data/mysqldb.js';

// Función para hashear una contraseña antes de almacenarla
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Función para validar el login de usuario
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await mysqldb.query(query, [email]);

        if (rows.length > 0) {
            const user = rows[0];
            // Compara la contraseña proporcionada con la contraseña hasheada almacenada
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (isPasswordCorrect) {
                res.status(200).json({
                    msg: "Inicio de sesión exitoso",
                    success: true,
                });
            } else {
                res.status(401).json({
                    msg: "Correo electrónico o contraseña incorrectos",
                    success: false,
                });
            }
        } else {
            res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
                success: false,
            });
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        res.status(500).json({
            msg: "Error al iniciar sesión",
            success: false,
            error: error.message,
        });
    }
};

// Ejemplo para añadir contraseñas a los usuarios
export const addPasswordToUsers = async () => {
    try {
        const [users] = await mysqldb.query('SELECT id, email FROM users WHERE password IS NULL');

        for (const user of users) {
            const randomPassword = generateRandomPassword();
            const hashedPassword = await hashPassword(randomPassword);

            await mysqldb.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);

            // Aquí podrías enviar un correo con la contraseña temporal
            console.log(`Contraseña generada para el usuario ${user.email}: ${randomPassword}`);
        }

        console.log('Contraseñas añadidas exitosamente.');
    } catch (error) {
        console.error('Error al añadir contraseñas:', error);
    }
};

// Función para generar contraseñas aleatorias
const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8); // Genera una contraseña simple de 8 caracteres
};
