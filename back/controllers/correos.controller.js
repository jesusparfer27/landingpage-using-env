import bcrypt from 'bcrypt'; // Asegúrate de que bcrypt esté importado
import mysqldb from '../data/mysqldb.js'; // Importa la conexión a MySQL

const responseAPI = {
    data: [],
    msg: "",
    status: "ok"
};

// Endpoint para iniciar sesión de usuario

export const getAllEmails = async (req, res) => {
    const { userId } = req; // Asegúrate de que el id del usuario esté disponible en la solicitud

    try {
        const query = 'SELECT * FROM correos WHERE destinatario_id = ?';
        const [filas] = await mysqldb.query(query, [userId]);
        console.log('Correos obtenidos:', filas);
        res.status(200).json({
            msg: "Lista de correos obtenida con éxito",
            success: "ok",
            data: filas
        });
    } catch (error) {
        console.error("Error al obtener correos: ", error.message);
        res.status(500).json({
            msg: "Error al obtener los correos",
            success: "error",
            error: error.message
        });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Recoge email y contraseña del cuerpo de la solicitud

    try {
        // Modifica la consulta para obtener email y contraseñas
        const query = 'SELECT * FROM usuarios WHERE email = ?'; // No comparas directamente aquí la contraseña
        const [rows] = await mysqldb.query(query, [email]);

        if (rows.length > 0) {
            const user = rows[0];

            // Compara la contraseña proporcionada con la hasheada de la base de datos
            const isPasswordCorrect = await bcrypt.compare(password, user.password); 

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
        } else {
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

export const markAsDeleted = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('UPDATE correos SET eliminado = 1 WHERE id = ?', [id]);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error al marcar el correo como eliminado' });
    }
};

// Marca un correo como archivado (poner archivado = 1)
export const markAsArchived = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('UPDATE correos SET archivado = 1 WHERE id = ?', [id]);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error al archivar el correo' });
    }
};


// Resto del código permanece igual

export const getEmailsByType = async (req, res) => {
    const { type } = req.query; // Tipo de correo que viene de la URL
    const userId = req.userId;   // El id del usuario debería estar disponible en el req

    try {
        let query = 'SELECT * FROM correos WHERE destinatario_id = ?'; // Filtra por destinatario

        // Ajusta el query según el tipo de correo
        if (type === 'archived') {
            query += ' AND archivado = 1';
        } else if (type === 'deleted') {
            query += ' AND eliminado = 1';
        } else if (type === 'inbox') {
            query += ' AND archivado = 0 AND eliminado = 0';
        } else if (type === 'sent') {
            query = 'SELECT * FROM correos WHERE remitente_id = ?';
        }

        const [rows] = await mysqldb.query(query, [userId]);

        res.status(200).json({
            msg: "Correos obtenidos con éxito",
            success: true,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener correos",
            success: false,
            error: error.message
        });
    }
};



export const saveEmail = (req, res) => {
    try {
        const newEmail = req.body;

        // Verifica que el correo tenga los campos necesarios
        if (!newEmail.id || !newEmail.from || !newEmail.to || !newEmail.subject || !newEmail.body || !newEmail.statement) {
            console.log('Campos recibidos:', newEmail); // Log para depuración
            return res.status(400).json({
                status: 'error',
                msg: 'Faltan campos necesarios en la solicitud.'
            });
        }

        // Añade el nuevo correo al array `savedEmails`
        savedEmails.push(newEmail);

        res.status(201).json({
            status: 'ok',
            msg: 'Correo electrónico guardado con éxito.',
            data: newEmail
        });
    } catch (error) {
        console.error("Error al guardar el correo:", error);

        res.status(500).json({
            status: 'error',
            msg: 'Error al guardar el correo electrónico.'
        });
    }
};

export const getSavedEmails = (req, res) => {
    try {
        if (savedEmails.length === 0) {
            return res.status(204).json({
                status: 'ok',
                msg: 'No hay correos guardados.',
                data: []
            });
        }

        res.status(200).json({
            status: 'ok',
            msg: 'Correos guardados obtenidos con éxito.',
            data: savedEmails
        });
    } catch (error) {
        console.error("Error al obtener los correos guardados:", error);

        res.status(500).json({
            status: 'error',
            msg: 'Error al obtener los correos guardados.'
        });
    }
};
