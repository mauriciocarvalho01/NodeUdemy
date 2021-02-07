import { Request, Response } from 'express';
import { SmsService } from '../services/zenvia-sms';
import  ZenviaSms from '../models/zenvia-sms';
import { SMS, SMSZenvia } from '../models/sms';
import conf from '../config/index';

const dataCorrente = new Date(new Date().valueOf() - (180 * 60000)).toJSON();

class ZenviaSmsController {

	public async zenviaRetorno(req: Request, res: Response) {
    try{
      let sms: ZenviaSms = new ZenviaSms();
      sms.ID_STAT_ENV_MSG = req.body.callbackMtRequest.status;
      sms.TXT_STAT_ENV_MSG = req.body.callbackMtRequest.statusMessage;
      sms.ID_DTLH_STAT = req.body.callbackMtRequest.statusDetail;
      sms.TXT_MSG_DTLH_STAT = req.body.callbackMtRequest.statusDetailMessage;
      sms.DT_H_RCBM_SMS = req.body.callbackMtRequest.received;
      sms.NM_OPRD_TEL = req.body.callbackMtRequest.mobileOperatorName;
      sms.CD_ID_SMS = req.body.callbackMtRequest.id;

      let retorno = await SmsService.updateReturnZenvia(sms);
      return res.status(200).send({menssagem: 'Sucesso'});
    }catch(e){
      console.log(e);
      return res.status(200).send({menssagem: e.message});
    }

  }

  public async sendSms(req: Request, res: Response) {
    try{
      let sms: ZenviaSms = new ZenviaSms();
      let id: string = new Date().getTime().toString();
      sms.CD_ESTB = req.body.mid;
      sms.ID_NUM_CLLR_CLI = req.body.celular,
      sms.DT_H_ENV_SMS = dataCorrente,
      sms.TXT_T_ENV  = req.body.type,                  
      sms.CD_ID_SMS =  id;
      sms.ID_STAT_ENV_MSG = 99 // status inicial

      let celular: string = req.body.celular;
      let mensagem: string = req.body.mensagem;

      let sendSMS = new SMS(celular, mensagem, conf.parameter.callbackZenvia , id);
      let payloadSms = new SMSZenvia(sendSMS);
      
      let retornoSMS = await SmsService.enviarSms(payloadSms);
       
       if(retornoSMS != undefined && retornoSMS != ''){
         let jsonRetorno = JSON.parse(retornoSMS.toString());
         if(jsonRetorno.sendSmsResponse.statusCode == '00'){
             SmsService.inserLogZenvia(sms);
         }
         return res.status(200).send({menssagem: 'Sms enviado com sucesso'});
       }else{
         return res.status(500).send({menssagem: 'Erro ao enviar SMS'});
       }
    }catch(e){
      console.log(e);
      return res.status(200).send({menssagem: e.message});
    }
  }

}
export default new ZenviaSmsController();