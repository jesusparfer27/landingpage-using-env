import express from 'express'
import cors from 'cors'
import { HOST, PORT } from './config/config.js'
import { sections } from './data/mockdata.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(static)

app.get('/', ( req , res ) => {

    res.setHeader("Content-Type", "text/html")

    const landingHTML = `
        <h1>Bienvenidos a nuestra REST-API</h1>
        <p>Servidor uniciado en ${HOST};${PORT}</p>
    `;

    res.status(200).send(landingHTML)
})

app.get('/API/v1/landing' , ( req , res ) => {

    const landingData = sections;

    res.status(200).json(landingData)
});

app.listen(PORT, () => {
    console.log(`Iniciando API en ${HOST}:${PORT}`)
})