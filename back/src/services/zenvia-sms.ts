
import conf from '../config/index';
import { getConnection } from 'typeorm';
import SmsEntity from '../models/zenvia-sms';
import request from 'request';
import { json } from 'body-parser';
import { ResolveOptions } from 'dns';

const env = conf.server.environment;
const conn = env == 'TI' ? 'writeConn' : 'writeConnDomain'

const proxySenha = 'usr_ces_prd:' + conf.parameter.usrProxy;
const buff = new Buffer(proxySenha);  
let base64data = buff.toString('base64');

import { SMS, SMSZenvia } from '../models/sms';
const URL_SMS = conf.externalServices.URL_SMS;

const optionsComProxy = {
	method: 'POST',
	proxy: 'http://proxy.safra.com.br:8080',
	headers: { 'Content-type': 'application/json', 
						 'Authorization': 'Basic U2FmcmFQYXlNb2JpbGU6RG9DNVZCaVY=',
						 'Accept': 'application/json',
						 'Host': 'proxy.safra.com.br', 
						 'Proxy-Authorization': base64data
						},
	rejectUnauthorized: false,
	timeout: 3000,
};


const optionsSemProxy = {
	method: 'POST',
	headers: { 'Content-type': 'application/json', 
						 'Authorization': 'Basic U2FmcmFQYXlNb2JpbGU6RG9DNVZCaVY=',
						 'Accept': 'application/json'
},					 
	rejectUnauthorized: false,
	timeout: 3000,
}


export class SmsService {

	public static async updateReturnZenvia(sms: SmsEntity) {

		return getConnection(conn)
			.createQueryBuilder()
			.update(SmsEntity)
			.set({ID_STAT_ENV_MSG: sms.ID_STAT_ENV_MSG, TXT_STAT_ENV_MSG: sms.TXT_STAT_ENV_MSG,
				ID_DTLH_STAT: sms.ID_DTLH_STAT, TXT_MSG_DTLH_STAT: sms.TXT_MSG_DTLH_STAT, DT_H_RCBM_SMS: sms.DT_H_RCBM_SMS,
			  NM_OPRD_TEL: sms.NM_OPRD_TEL})
			.where('CESTCTS.CD_ID_SMS = :id', { id: sms.CD_ID_SMS})
			.execute();
	}

	public static async inserLogZenvia(sms: SmsEntity) {
		return getConnection(conn)
		.createQueryBuilder()
		.insert()
		.into(SmsEntity)
		.values({
			...sms})
		.execute();
	}

	public static async enviarSms(sms: SMSZenvia) {
		let options = optionsSemProxy;
		let proxyUse: boolean = false;
		if(conf.parameter.configuraProxy == true){
			options = optionsComProxy;
			proxyUse = true;
		}

		return new Promise((resolve, reject) => {
			request(
				{
					...options,
					uri: `${URL_SMS}`,
					body: JSON.stringify(sms)
				},
				(err, res, body) => {
					if (err){
						reject(err.message);
					} else{
						if(res.statusCode === 200){
							resolve(res.body);
						} else{
							if(proxyUse){
								options = optionsSemProxy;
							}else{
								options = optionsComProxy;
							}
							request(
								{
									...options,
									uri: `${URL_SMS}`,
									body: JSON.stringify(sms)
								},
								(err, res, body) => {
									if (err){
										reject(err.message);
									} else{
										if(res.statusCode === 200){
											resolve(res.body);
										} else{
											resolve('')
										} 
									}
								},
							);
						} 
					}
				},
			);
		});
	
	}

}
