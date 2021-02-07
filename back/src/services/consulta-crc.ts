
import fs, { promises } from 'fs';
import request from 'request';
import conf from '../config/index';
import { getConnection } from 'typeorm';
import EstabComercial from '../models/estab-comercial';
import crc from '../utils/crc';

const CRC_URL = conf.externalServices.CRC_URL;
const env = conf.server.environment;
const conn = env == 'TI' ? 'writeConn' : 'writeConnDomain'

const options = {
	method: 'POST',
	headers: { 'Content-type': 'application/json' },
	agentOptions: { ca: fs.readFileSync('cert/safra.cer') },
	timeout: 5000,
};

export class ConsultaService {

	public static async searchInfoUpdate() {
		return await getConnection(conn)
			.createQueryBuilder()
			.select('cesteco.CD_EC, cesteco.ID_CPF_CNPJ_EC, cesteco.ID_NUM_CLLR_EC, cesteco.ID_EMAIL_CTO_EMP')
			.where('cesteco.ID_NUM_CLLR_EC = :cel', { cel: "" })
			.orWhere('cesteco.ID_EMAIL_CTO_EMP = :email', { email: "" })
			.from(EstabComercial, 'cesteco')
			.orderBy('cesteco.DT_H_INC')
			.getRawMany();
	}
	
	public static async updateCelular(ec: number, celular: string) {

		return getConnection(conn)
			.createQueryBuilder()
			.update(EstabComercial)
			.set({ ID_NUM_CLLR_EC: celular})
			.where('cesteco.CD_EC = :ec', { ec: ec })
			.execute();
	}
	public static async updateEmail(ec: number, email: string) {

		return getConnection(conn)
			.createQueryBuilder()
			.update(EstabComercial)
			.set({ ID_EMAIL_CTO_EMP: email })
			.where('cesteco.CD_EC = :ec', { ec: ec })
			.execute();
	}
	public static async updateCelularEmail(ec: number, celular: string, email: string) {

		return getConnection(conn)
			.createQueryBuilder()
			.update(EstabComercial)
			.set({ ID_NUM_CLLR_EC: celular, ID_EMAIL_CTO_EMP: email })
			.where('cesteco.CD_EC = :ec', { ec: ec })
			.execute();
	}
	
	public static async findCnpfCpfInCrc(cnpjcpf: string) {
		if(cnpjcpf.length <= 11){
			crc.ID_T_PES_E = 'F';
		}else{
			crc.ID_T_PES_E = 'J';
		}
		
		crc.ID_CPF_CNPJ_E = cnpjcpf
		let bodyCrc = JSON.stringify({crc})
		bodyCrc = bodyCrc.toString().replace('{"crc":','').replace('}]}}','}]}')
		
		return new Promise((resolve, reject) => {
			
			request(
				{
					...options,
					uri: `${CRC_URL}`,
					headers:{
						"amc-session-id": "1",
						"amc-aplicacao": "1",
						"amc-message-id": "1",
						"accept-language": "pt-br",
						"Content-Type": "application/json"
					},
					body: bodyCrc
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
