import { Email, connectDB } from '../data/mongodb.js'
// import { User, Email} from '../data/mongodb.js'

// Me conecto a mongoDB
connectDB();

export const getEmails = async (req, res, next) => {
    try {
        console.log("correos")
        // find() trae los elementos
        // populate() trae el documento vinculado según mi schema
        // el primer atributo es el nombre de la propiedad
        // el segundo atributo son los campos que deseo (NO TRAIGO PASS!)
        const emails = await Email.find().populate('remitente destinatario', 'username email');
        res.json(emails);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const getEmailById = async (req, res, next) => {
    try {
        const correoId = req.params.id;
        const email = await Email.findById(correoId).populate("remitente destinarario", "username email");

        if (!email) return res.status(404).json({ message: "Correo no encontrado" })
        res.status(200).json(email)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export const fetchEmailsByType = async (req, res, next) => {
    res.send("Hola")

}
export const createEmail = async (req, res, next) => {
    try {
        const { remitente, destinatario, asunto, contenido } = req.body;

        const newEmail = new Email({
            remitente,
            destinatario,
            asunto,
            contenido
            // isImportant: true
        })
        await newEmail.save(); // Guardar el nuevo documento en la base de datos 

        res.status(201).json(newEmail);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}

export const deleteEmail = async (req, res, next) => {
    try {
        const correoId = req.params.id;
        const deletedEmail = await Email.findByIdAndDelete(correoId)

        if (!deletedEmail) return res.status(404).json({ message: "Correo no encontrado" })
        res.status(204).json({ message: "correo eliminado correctamente" })
    } catch (e) {

    }
}
export const answerEmail = async (req, res, next) => {
    res.send("Hola")

}

// Marcar correo como leído
export const updateEmail = async (req, res, next) => {
    try {
        const correoId = req.params.id;
        const updatedEmail = await Email.findByIdAndUpdate(
            correoId,
            { isLeido: true },
            { new: true }
        );
        if (!updatedEmail) return res.status(404).json({message: "Correo no encontrado"})
            res.status(200).json(updatedEmail);
    } catch (e) {
        res.status(500).json({ message:e.message })
    }
}

export const getEmailByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // el $or se utiliza para buscar correos donde el usuario sea el destinatario
        const emails = await Email.find({ 
            $or: [
                {remitente: userId}, 
                {destinatario: userId}
            ]
        })
        .populate("remitente destinatario", "username email")
        .sort({createdAt: -1})

        res.status(200).json(emails)

    } catch (e) {
        res,status(500).json({message:e.message})
    }
}

export const getEmailByAsunto = async (req, res, next) => {

}