import { Router } from "express";

// Controles comunes de CRUD
import { getEmails, updateEmail, getEmailById, fetchEmailsByType, createEmail, deleteEmail, answerEmail } from '../controllers/correos.mongo.controller.js'

// Controles específicos
import { getEmailByUserId, getEmailByAsunto } from '../controllers/correos.mongo.controller.js'

import { getLanding } from "../controllers/landing.controller.js";

const router = Router();

// api/v1/mongo/...

router.get('/json-data',                getLanding);

router.get('/correos',                  getEmails)
router.get('/correos',                  fetchEmailsByType),
router.get('/correos/:id',              getEmailById),

// router.post('/correos',         answerEmail)
router.post('/correos',                 createEmail),
router.delete('/correos/:id',           deleteEmail),
router.patch('/correos/:id',            updateEmail)
// rutas específicas

// Quiero correos de un usuario específico
router.get('/correos/user/:userid',      getEmailByUserId)

// Quiero correos con un asunto similar al texto ":asunto"
router.get('/correos/asunto/:asunto',    getEmailByAsunto)

export default router;