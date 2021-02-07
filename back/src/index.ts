import schedule from 'node-schedule';
import config from './config/index';
import app from './server';
import { dbConnFactory } from './utils/db';

const PORT = config.server.port || 81;

console.log('CONFIG', config);

try {
	dbConnFactory().then(async () => {
		console.log('success db auth :D');
		app.listen(PORT, () => console.log(`server running on port ${PORT}`));

	});
} catch (err) {
	console.log(err.code);
}
