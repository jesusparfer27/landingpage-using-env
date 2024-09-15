import { Router } from 'express';
import { getEmailsByType, loginUser, getAllEmails } from '../controllers/correos.controller.js';
import { getLanding } from '../controllers/landing.controller.js';
import { markAsArchived, markAsDeleted } from '../controllers/correos.controller.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/json-data', getLanding);
router.get('/inbox', getEmailsByType);
router.get('/inbox', getAllEmails)
router.post('/login', loginUser); // Añade la ruta de login
router.post('/emails/:id/delete', markAsDeleted);
router.post('/emails/:id/archive', markAsArchived);

export default router;