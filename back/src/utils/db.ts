import 'reflect-metadata';
import { ConnectionOptions, createConnections } from 'typeorm';
import config from '../config/index';

const DB_HOST = config.db.db_host;
const PORT = config.db.port;
const USERNAME = config.db.username;
const PASSWORD = config.db.password;
const DATABASE = config.db.db_name;
const DOMAIN = config.db.domain;

const connParams: ConnectionOptions = {
	type: 'mssql',
	host: DB_HOST,
	port: PORT,
	username: USERNAME,
	password: PASSWORD,
	database: DATABASE,
	entities: [__dirname + './../models/*{.js,.ts}'],
	synchronize: false,
	logging: !(config.server.environment === 'production'),
	cache: config.db.cache.enable ? { type: 'ioredis', options: config.db.cache.options } : false,
};

const connParamsDomain: ConnectionOptions = {
	type: 'mssql',
	host: DB_HOST,
	port: PORT,
	username: USERNAME,
	password: PASSWORD,
	database: DATABASE,
	domain: DOMAIN,
	entities: [__dirname + './../models/*{.js,.ts}'],
	synchronize: false,
	logging: !(config.server.environment === 'production'),
	cache: config.db.cache.enable ? { type: 'ioredis', options: config.db.cache.options } : false,
};

const writeConnDomain: ConnectionOptions = {
	...connParamsDomain,
	name: 'writeConnDomain',
};

const writeConn: ConnectionOptions = {
	...connParams,
	name: 'writeConn',
};

export const dbConnFactory = () => {
	return new Promise((resolve, reject) => {
		if(config.server.environment == 'TI'){
			createConnections([writeConn])
			.then(resolve)
			.catch((err: string) => console.log(`db conn err: ${err}`));
		}else{
			createConnections([writeConnDomain])
			.then(resolve)
			.catch((err: string) => console.log(`db conn err: ${err}`));
			
		}
	});
};
