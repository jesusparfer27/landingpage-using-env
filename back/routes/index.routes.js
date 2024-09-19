import { Router } from 'express';
import { fetchEmailsByType, markAsDeleted, markAsArchived, getSavedEmails, getAllEmails } from '../controllers/correos.controller.js';
import { getLanding } from '../controllers/landing.controller.js';
import { loginUser } from '../controllers/login.controller.js';
import { authenticateToken } from '../middleware/auth.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/json-data', getLanding);
router.get('/archived', authenticateToken, getSavedEmails);
router.get('/delete', authenticateToken, fetchEmailsByType);
router.get('/inbox', authenticateToken, getAllEmails);
router.get('/sent', authenticateToken, fetchEmailsByType);


router.post('/login', loginUser); // Añade la ruta de login
router.post('/emails/:id/delete', authenticateToken, markAsDeleted);
router.post('/emails/:id/archive', authenticateToken, markAsArchived);

export default router;