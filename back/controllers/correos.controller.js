import bcrypt from 'bcrypt'; // Asegúrate de que bcrypt esté importado
import mysqldb from '../data/mysqldb.js'; // Importa la conexión a MySQL

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

// Función para obtener correos por tipo (archivados, eliminados, etc.)
export const fetchEmailsByType = async (type) => {
    try {
        let endpoint = '';

        // Cambia el endpoint según el tipo
        switch (type) {
            case 'inbox':
                endpoint = 'API/v1/inbox';
                break;
            case 'archived':
                endpoint = 'API/v1/archived';
                break;
            case 'deleted':
                endpoint = 'API/v1/deleted';
                break;
            case 'sent':
                endpoint = 'API/v1/sent';
                break;
            default:
                endpoint = 'API/v1/inbox';
        }

        // Obtén el token del localStorage
        const token = localStorage.getItem('authToken');
        console.log("Token:", token); // Agrega esto para depuración
        
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const emailList = await response.json();
        setEmailList(emailList.data);
        console.log(emailList.data);
    } catch (e) {
        console.log("Error", e);
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
