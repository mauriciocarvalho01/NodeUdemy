
import conf from '../config/index';
import { getConnection } from 'typeorm';
import Sms from '../models/zenvia-sms';
import Parametro from '../models/parametro';
const env = conf.server.environment;
const conn = env == 'TI' ? 'writeConn' : 'writeConnDomain'

export class GenericoService {

	public static async selectParametro(parametro: string) {
		try {
			const parm = await getConnection(conn)
				.createQueryBuilder()
				.select('parametro')
				.from(Parametro, 'parametro')
				.where('parametro.ID_T_PARM = :id', { id: parametro})
				.getOne();
			return parm;
		} catch(e) {
			console.log(e)
			return new Parametro();
		}
	}

}
