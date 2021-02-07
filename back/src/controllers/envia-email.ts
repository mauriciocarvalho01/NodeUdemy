import { Request, Response } from 'express';
import { EmailService } from '../services/enviar-email';
import { GenericoService } from '../services/generico';
import  Email from '../models/email';
import Parametro from '../models/parametro';

const dataCorrente = new Date(new Date() + "GMT+0300").toJSON();

class EmailController {

	public async sendMail(req: Request, res: Response) {
    try{
      let subject: Parametro = await GenericoService.selectParametro(req.body.chaveAssunto);
      let emailFrom: Parametro = await GenericoService.selectParametro("toSendMail");
      let email: Email = new Email(emailFrom.TXT_DESC_PARM, req.body.to, subject.TXT_DESC_PARM, req.body.html, req.body.type);
      
      let retorno = await EmailService.enviarSEmail(email);

      return res.status(200).send({menssagem: 'Sucesso'});
    }catch(e){
      console.log(e);
      return res.status(200).send({menssagem: e.message});
    }

  }
}
export default new EmailController();