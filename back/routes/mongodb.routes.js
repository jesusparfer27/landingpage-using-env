import { Router } from "express";
import { getSavedEmails, updateEmail, getEmailById, fetchEmailsByType, createEmail, markAsDeleted, answerEmail} from '../controllers/correos.mongo.controller.js'
const router = Router();

// api/v1/mongo/...

router.get('/correos', getSavedEmails)
router.get('/correos', fetchEmailsByType),
router.get('/correos/:id', getEmailById),

router.post('/correos', answerEmail)
router.post('/correos', createEmail),
router.delete('/correos/:id', markAsDeleted),
router.patch('/correos/:id', updateEmail)


export default router;