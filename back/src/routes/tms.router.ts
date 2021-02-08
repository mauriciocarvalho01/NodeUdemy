import { Router } from 'express';
import ConsultarTMS from '../controllers/consultar-tms';
const router = Router();

router.get('/consultar-ec/:cnpjcpf/:flagDigital', ConsultarTMS.listEcByCnpjCpf);
router.get('/validar-ec/:ec', ConsultarTMS.listNumberLogicByEc);
router.get('/consultar-terminal/:numberLogic', ConsultarTMS.listInfoTerminal);

export default router;

/*
ROUTE 01
O Arquivo [tms.router.ts] é responsável por 
centralizar as rotas responsáveis por:
-Listar os Estabelecimentos Comerciais (sigla: EC) por cnpj/cpf/bandeira digital (flagDigital). 
*/
