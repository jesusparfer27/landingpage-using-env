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
    const { email, password } = req.body; // Recoge email y contraseña del cuerpo de la solicitud

    try {
        console.log("Email recibido del frontend:", email);
        console.log("Contraseña recibida del frontend:", password);

        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await mysqldb.query(query, [email]);

        console.log("Resultado de la consulta a la base de datos:", rows);

        if (rows.length > 0) {
            const user = rows[0];
            console.log("Usuario encontrado:", user);

            try {
                // Compara la contraseña proporcionada con la almacenada en la base de datos
                // const isPasswordCorrect = await bcrypt.compare(password, user.password);
                const isPasswordCorrect = user.password == password ? true : false;

                console.log("Resultado de la comparación de contraseñas:", isPasswordCorrect);

                if (isPasswordCorrect) {
                    res.status(200).json({
                        msg: "Inicio de sesión exitoso",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        msg: "Correo electrónico o contraseña incorrectos",
                        success: false
                    });
                }
            } catch (bcryptError) {
                console.error("Error al comparar contraseñas:", bcryptError);
                res.status(500).json({
                    msg: "Error interno al validar la contraseña",
                    success: false,
                    error: bcryptError.message
                });
            }
        } else {
            console.log("Usuario no encontrado con el correo:", email);
            res.status(401).json({
                msg: "Correo electrónico o contraseña incorrectos",
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

