import * as path from 'path';
import * as dotenv from 'dotenv';

import Express from './Express';

import Log from '../middlewares/Log';

class App {
	// Clear the console
	public clearConsole (): void {
		process.stdout.write('\x1B[2J\x1B[0f');
	}

	// Loads your dotenv file
	public loadConfiguration (): void {
		Log.info('Configuration :: Booting @ Master...');

		dotenv.config({ path: path.join(__dirname, '../../.env') });
	}

	// Loads your Server
	public loadServer (): void {
		Log.info('Server :: Booting @ Master...');

		Express.init();
	}

	// Loads the Worker Cluster
	public loadWorker (): void {
		Log.info('Worker :: Booting @ Master...');
	}

}

export default new App;
