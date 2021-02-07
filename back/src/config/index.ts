export default {
	server: {
		port: '8080',
		environment: 'TI',
	},
	db: {
		//  db_host: 'ces-sqlhml.credsafra.com.br',
		//  port: 1433, 
		//  username: 'sh_ces_svc',
		//  password: 'FH8C#sSd', 
		
		db_host: 'shocp08vt.safra.com.br',
		port: 31021, // 3122 -> TI / 3124 -> HML
		username: 'USR_CES',
		password: 'm1i0@aU$Wu9&1s%', // sJl2Di0bLpC3Cc6 -> TI / fLB37l0uLUB@w%R -> HML
		db_name: 'DB_CES',
		domain: "credsafra",
		cache: {
			enable: false,
			options: {
				sentinels: [
					{
						host: 'sentinel01-ti.safra.com.br',
						port: 31001,
					},
					{
						host: 'sentinel02-ti.safra.com.br',
						port: 31002,
					},
					{
						host: 'sentinel03-ti.safra.com.br',
						port: 31003,
					},
				],
				name: 'redis-back-credenciadora-pci',
			},
			ttl: {
				message: 600000,
				parameter: 600000,
				ramoAtiv: 600000,
			},
		},
	},
	parameter:{
		usrProxy: 'Z1!P&3De2uOmNhQ',
		configuraProxy: true
	},
	externalServices: {
		CRC_URL: 'https://api-ti.safracredenciadora.com.br/ces-ctl/consultar-cnpj',
		TMS_CNPJ_URL: 'http://10.80.16.31/TMS7WebService/api/terminal/WsConsultaEstabelecimentoCNPJ/4',
		TMS_EC_URL: 'http://10.80.16.31/TMS7WebService/api/terminal/WSConsultaTeminaisEC/4',
		TMS_NMRLOG_URL: 'http://10.80.16.31/TMS7WebService/api/terminal/WsConsultaTerminal/4',
		URL_SMS: 'https://api-rest.zenvia360.com.br/services/send-sms',
		URL_EMAIL: 'https://api-ti.safracredenciadora.com.br/ces-ctl/enviar-email'
	}
};
