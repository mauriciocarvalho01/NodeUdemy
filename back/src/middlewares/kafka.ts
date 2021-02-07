import { NextFunction, Request, Response } from 'express';
import request from 'request';
import environment from '../config/index'



export const sendKafka = (req: Request, res: Response, next: NextFunction) => {
	next();

	res.on('finish', async () => {
		if(req.originalUrl != '/ces-serv/half-Check'){
					const data = {
						'sigla': 'CES',
								'sistema': 'apl-back-serv-ces',
								'subsistema': 'serv-ces',
								'endpoint': req.originalUrl,
								'responsecode': res.statusCode,
								'responsemessage': res.statusMessage,
								'ambiente': environment.server.environment,
								'@timestamp': new Date(),
								'request': req.body,
								'requestHeaders': req.headers
				};

				const messages = JSON.stringify({
					records: [
						{
							value: {
								...data
							},
						},
					],
				});
				const options = {
					method: 'POST',
					uri: 'http://kafka-rest.safra.com.br/topics/TPC_CES_METRICS',
					headers: {
						'Content-Type': 'application/vnd.kafka.json.v2+json',
						'Accept': 'application/vnd.kafka.v2+json',
					},
					body: messages,
					timeout: 3000,
				};

				request(options, (error) => {
					if (error) console.log(error);
				});
	  	}
	});
};
