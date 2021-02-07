
import conf from '../config/index';
import EMAIL from '../models/email';
import request from 'request';

const URL_EMAIL = conf.externalServices.URL_EMAIL;

const options = {
	method: 'POST',
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'amc-session-id': 'email-session',
		'amc-aplicacao': 'CES',
		'amc-message-id': 'envio-email',
		'accept-language': 'pr-br'
	},
	rejectUnauthorized: false
}   

export class EmailService {

	public static async enviarSEmail(payload: EMAIL) {

		return new Promise((resolve, reject) => {
			request(
				{
					...options,
					uri: `${URL_EMAIL}`,
					body: JSON.stringify(payload)
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
