import bcrypt from 'bcrypt';
import mysqldb from '../data/mysqldb.js';

// Función para hashear una contraseña antes de almacenarla
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error al hashear la contraseña:", error);
        throw error; // Propaga el error hacia la función que lo llame
    }
};

// Función para validar el login de usuario
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await mysqldb.query(query, [email]);

        if (rows.length > 0) {
            const user = rows[0];
            try {
                // const isPasswordCorrect = await bcrypt.compare(password, user.password);
                const isPasswordCorrect = user.password == password ? true : false;

                if (isPasswordCorrect) {
                    res.status(200).json({
                        msg: "Inicio de sesión exitoso",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        msg: "CLAVE MAL Correo electrónico o contraseña incorrectos",
                        success: false
                    });
                }
            } catch (error) {
                console.error("Error al comparar las contraseñas:", error);
                res.status(500).json({
                    msg: "Error interno al validar las credenciales",
                    success: false,
                    error: error.message
                });
            }
        } else {
            res.status(401).json({
                msg: "NO HAY EMAIL Correo electrónico o contraseña incorrectos",
                success: false
            });
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        res.status(500).json({
            msg: "Error al iniciar sesión",
            success: false,
            error: error.message
        });
    }
};

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await hashPassword(password);
        const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        await mysqldb.query(query, [nombre, email, hashedPassword]);

        res.status(201).json({
            msg: "Usuario registrado con éxito",
            success: true
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({
            msg: "Error al registrar usuario",
            success: false,
            error: error.message
        });
    }
};
