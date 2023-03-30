import express from 'express'
import { paragraphController } from '../controller/openAiController.js';
import { requireSignIn } from '../middleweres/authMiddlewere.js'
const router = express.Router()

router.post('/paragraph', requireSignIn, paragraphController)

export default router;