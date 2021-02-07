import { Router } from 'express';
import SMS from '../controllers/zenvia-sms';
const router = Router();

router.post('/retorno-zenvia', SMS.zenviaRetorno);
router.post('/send-sms', SMS.sendSms);

export default router;
