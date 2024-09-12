 import { sections, appAdvantages, footer, comments } from '../data/mockdata.js'

//  importar la consexión a mysql
 import mysqldb from '../data/mysqldb.js'


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

export const getAllCorreos = async (req, res) => {
    try {
        const query = 'SELECT * FROM correos';
        const [filas] = await mysqldb.query(query);
        res.status(200).json({
            msg: "Lista de correos obtenida con éxito",
            success: "ok",
            data: filas
        });
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