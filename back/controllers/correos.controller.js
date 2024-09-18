import bcrypt from 'bcrypt'; // Asegúrate de que bcrypt esté importado
// import mysqldb from '../data/mysqldb.js'; // Importa la conexión a MySQL

const responseAPI = {
    data: [],
    msg: "",
    status: "ok"
};

// Función para marcar un correo como eliminado
export const markAsDeleted = async (req, res) => {
    const { id } = req.params;

    try {
        await mysqldb.query('UPDATE correos SET eliminado = 1 WHERE id = ?', [id]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error al marcar el correo como eliminado:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al marcar el correo como eliminado',
            error: error.message
        });
    }
};

// Función para marcar un correo como archivado
export const markAsArchived = async (req, res) => {
    const { id } = req.params;

    try {
        await mysqldb.query('UPDATE correos SET archivado = 1 WHERE id = ?', [id]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error al archivar el correo:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al archivar el correo',
            error: error.message
        });
    }
};

export const fetchEmailsByType = async (req, res) => {
    const { type } = req.query; // Obtenemos el tipo de filtro desde la query string
    const userId = req.user.id; // Asumiendo que el ID del usuario autenticado está en req.user

    let query = 'SELECT * FROM correos WHERE destinatario_id = ?';
    let queryParams = [userId];

    switch (type) {
        case 'inbox':
            query += ' AND eliminado = 0 AND archivado = 0';
            break;
        case 'archived':
            query += ' AND archivado = 1';
            break;
        case 'deleted':
            query += ' AND eliminado = 1';
            break;
        case 'sent':
            query = 'SELECT * FROM correos WHERE remitente_id = ?'; // Los enviados se filtran por remitente
            queryParams = [userId];
            break;
        default:
            return res.status(400).json({
                success: false,
                msg: 'Tipo de filtro no válido.'
            });
    }

    try {
        const [emails] = await mysqldb.query(query, queryParams);
        res.status(200).json({
            success: true,
            data: emails
        });
    } catch (error) {
        console.error("Error al obtener los correos:", error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener los correos.',
            error: error.message
        });
    }
};

// Función para guardar un nuevo correo
export const saveEmail = (req, res) => {
    try {
        const newEmail = req.body;

        if (!newEmail.id || !newEmail.from || !newEmail.to || !newEmail.subject || !newEmail.body || !newEmail.statement) {
            console.log('Campos recibidos:', newEmail);
            return res.status(400).json({
                status: 'error',
                msg: 'Faltan campos necesarios en la solicitud.'
            });
        }

        // Añade el nuevo correo a la base de datos (ejemplo con array)
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
            msg: 'Error al guardar el correo electrónico.',
            error: error.message
        });
    }
};

// Función para obtener correos guardados
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
            msg: 'Error al obtener los correos guardados.',
            error: error.message
        });
    }
};

export const answerEmail = (req, res) => {

}

export const createEmail = (req, res) => {

}

export const getEmailById = (req, res) => {

}

export const updateEmail = (req, res) => {
    
}
