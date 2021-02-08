import { Router } from 'express';
import tms from './tms.router';
import zenvia from './zenvia-sms.router';
import email from './envia-email.router';
import halfCheck from './half-check.router';

const router = Router();

router.use(tms);
router.use(zenvia);
router.use(email);
router.use(halfCheck);

export default router;

// O arquivo [index.ts] é responsável por centralizar todas as ações referentes às  rotas da API. 
