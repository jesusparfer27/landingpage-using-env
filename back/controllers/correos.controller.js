 import { sections, appAdvantages, footer, comments } from '../data/mockdata.js'

//  importar la consexión a mysql
 import mysqldb from '../data/mysqldb.js'

 const responseAPI = {
    data: [],
    msg: "",
    status: "ok"
};

//  Endpoint para devolver todos los correos

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const [rows] = await mysqldb.query(query, [email, password]);
        
        if (rows.length > 0) {
            // Usuario encontrado, credenciales correctas
            res.status(200).json({
                msg: "Inicio de sesión exitoso",
                success: true
            });
        } else {
            // Credenciales incorrectas
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

export const getAllEmails = async (req, res) => {
    try {
        const query = 'SELECT * FROM correos';
        const [filas] = await mysqldb.query(query);
        res.status(200).json({
            msg: "Lista de correos obtenida con éxito",
            success: "ok",
            data: filas
        });
        console.log(filas)
    } catch (error) {
        console.error("Error al obtener correos: ", error);
        res.status(500).json({
            msg: "Error al obtener los correos",
            success: "error",
            error: error.message
        });
    }
};


 export const getLanding = ( req , res ) => {

    
    const datos = {
        sections: sections,
        appAdvantages: appAdvantages,
        footer: footer,
        comments: comments
    }

    res.status(200).json(datos)
  
}

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
