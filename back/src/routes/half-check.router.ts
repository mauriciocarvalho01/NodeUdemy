import { Router } from 'express';
import HalfCheck from '../controllers/half-check';
const router = Router();

router.get('/half-Check', HalfCheck.sendHalfCheck);

export default router;
