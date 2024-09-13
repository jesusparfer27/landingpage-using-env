import { Router } from 'express';
import { getLanding, getAllEmails, loginUser } from '../controllers/correos.controller.js';

const router = Router();

router.get('/json-data', getLanding);
router.get('/inbox', getAllEmails);
router.post('/login', loginUser); // Añade la ruta de login

export default router;