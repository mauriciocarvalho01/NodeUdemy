
import fs, { promises } from 'fs';
import request from 'request';
import conf from '../config/index';

const TMS_CNPJ_URL = conf.externalServices.TMS_CNPJ_URL; // Essa URL está dentro de '../config/index'
const TMS_EC_URL = conf.externalServices.TMS_EC_URL; // Essa URL está dentro de '../config/index'
const TMS_NMRLOG_URL = conf.externalServices.TMS_NMRLOG_URL; // Essa URL está dentro de '../config/index'


//Essa são as configurações/ opções do request
const options = {
	method: 'GET',
	headers: { 'Content-type': 'application/json' },
	//agentOptions: { ca: fs.readFileSync('cert/safra.cer') },
	timeout: 5000,
};

export class TmsService {


	// Esse método está sendo chamado na classe ConsultaController em '../controllers/consultar-tms'; 
	// Seu objetivo é retornar uma promisse fazendo um request para a URL [TMS_CNPJ_URL] linha 6 
	public static async listEcByCnpjCpf(doc: string) {
		return new Promise((resolve, reject) => {
			
			request(
				{
					...options,
					uri: `${TMS_CNPJ_URL}/` + doc,
					headers:{
					},
				},
				(err, res, body) => {
					if (err){
						reject(err.message);
					} else{
						if(res.statusCode === 200){
							resolve(res.body);
						} else{
							resolve('');
						} 
					}
					
				},
			);
		});
	
	}

	public static async listNumberLogicByEc(ec: string) {
		return new Promise((resolve, reject) => {
			
			request(
				{
					...options,
					uri: `${TMS_EC_URL}/` + ec,
					headers:{
					},
				},
				(err, res, body) => {
					if (err){
						reject(err.message);
					} else{
						if(res.statusCode === 200){
							resolve(res.body);
						} else{
							resolve('');
						} 
					}
				},
			);
		});
	
	}

	public static async listInfoTerminal(numberLogic: string) {
		return new Promise((resolve, reject) => {
			request(
				{
					...options,
					uri: `${TMS_NMRLOG_URL}/` + numberLogic,
					headers:{
					},
				},
				(err, res, body) => {
					if (err){
						reject(err.message);
					} else{
						if(res.statusCode === 200){
							resolve(res.body);
						} else{
							resolve('');
						} 
					}
					
				},
			);
		});
	
	}

}
