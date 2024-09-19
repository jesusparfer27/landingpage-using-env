import mongoose from 'mongoose';
import { mongodbUri } from '../config/config.js';

// crear una conexión
const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri)
        console.log("MongoDB conectado correctamente")
    } catch (e) {
        console.log("Error conectando a MongoDB ", e.messsage)
        process.exit(1)
    }
}
// crear nuestro esquema

// Schema de Usuario
const userSchema = new mongoose.Schema({
    // username:String,
    // email:String

    username: {
        type: String,
        required: true,
        unique: true
    },
    email :{
        type: String,
        unique: true,
        required: true
    }
})

const adressSchema = new mongoose.Schema({
    calle: String,
    codigoPostal: String
})

//  Schema de Correos
const emailSchema = new mongoose.Schema({
    remitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    asunto: {
        type: String,
        require: true,
    },
    contenido: String,
    isLeido: {
        type: Boolean,
        default: false
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // adress: adressSchema
}, {
    timestamps: true,
    strict: false
})

// Opciones de Mongoose Schemas
// - {timestamps: true} // me agrega los campo de createdAt y updateAt
// - { strict: false } me permite utilizar campos adicionales
// - { versionKey: false } desactiva el control de acciones que tiene interno de mongoose

// crear nuestros modelos

const User = mongoose.model('User', userSchema);
const Email = mongoose.model('Email', emailSchema)

// se crearán automaticamente las COLECCIONES si no existen pero en minúsculas y plural
// User --> users
// Email --> emails

export { connectDB, User, Email }
