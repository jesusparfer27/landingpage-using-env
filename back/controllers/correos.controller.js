 import { sections, appAdvantages, footer, comments } from '../data/mockdata.js'

//  importar la consexión a mysql
 import mysqldb from '../data/mysqldb.js'


//  Endpoint para devolver todos los correos
 export const getAllCorreos = async (req, res) => {

    // Obtener lista de correos

    // Conectarme a la base de datos y pedir los datos
     const query = 'SELECT * FROM correos';
     const [filas] = await mysqldb.query(query);
     console.log(filas);
    
    // devolver al usuario sus correos
     res.status(200).json({
    msg: "Lista de correos obtenida con exito",
    success: "ok",
    data: filas
    });
 }

 export const getLanding = ( req , res ) => {

    
    const datos = {
        sections: sections,
        appAdvantages: appAdvantages,
        footer: footer,
        comments: comments
    }

    res.status(200).json(datos)
  
}