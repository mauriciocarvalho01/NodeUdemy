import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import router from './routes';
import { sendKafka } from './middlewares/kafka';

class Server {
	public express: express.Application;

	public constructor() {
		this.express = express();
		this.middlewares();
		this.routes();

	}

	private middlewares(): void {
		this.express.use(bodyParser.json());
		this.express.use(cors());
		this.express.use(sendKafka);
	}

	private routes(): void {
		this.express.use('/ces-serv', router);
	}


}

export default new Server().express;
