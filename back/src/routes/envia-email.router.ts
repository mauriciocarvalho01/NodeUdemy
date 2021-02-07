import { Router } from 'express';
import Mail from '../controllers/envia-email';
const router = Router();

router.post('/send-mail', Mail.sendMail);

export default router;

