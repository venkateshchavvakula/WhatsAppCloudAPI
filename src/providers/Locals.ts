import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
	/**
	 * Makes env configs available for your app
	 * throughout the app's runtime
	 */
	public static config(): any {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const url = `http://localhost:${process.env.PORT}`;
		const port = process.env.PORT || 4040;
		const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
		const apiPrefix ='api'
		const maxUploadLimit = '50mb'
		const maxParameterLimit = 100000
		const META_WA_ACCESSTOKEN =  process.env.META_WA_ACCESSTOKEN
		const META_WA_SENDER = process.env.META_WA_SENDER
		const META_WA_ACC_ID = process.env.META_WA_ACC_ID

		return {
			META_WA_ACCESSTOKEN,
			META_WA_SENDER,
			META_WA_ACC_ID,
			appSecret,
			port,
			url,
			apiPrefix,
			maxUploadLimit,
			maxParameterLimit
		};
	}

	/**
	 * Injects your config to the app's locals
	 */
	public static init (_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}

export default Locals;
