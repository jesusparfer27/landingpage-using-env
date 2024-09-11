import { Router } from 'express'
import { getLanding } from '../controllers/correos.controller.js';
import { getAllCorreos } from '../controllers/correos.controller.js'

const router = Router();

router.get('/landing' , getLanding);
router.get('/correo', getAllCorreos)

export default router