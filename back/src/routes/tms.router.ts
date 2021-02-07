import { Router } from 'express';
import ConsultarTMS from '../controllers/consultar-tms';
const router = Router();

router.get('/consultar-ec/:cnpjcpf/:flagDigital', ConsultarTMS.listEcByCnpjCpf);
router.get('/validar-ec/:ec', ConsultarTMS.listNumberLogicByEc);
router.get('/consultar-terminal/:numberLogic', ConsultarTMS.listInfoTerminal);

export default router;
