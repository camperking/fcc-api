import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cors from 'cors';
import dbInit from './db.js';

export let db;

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

dbInit().then((lokidb) => {
	// console.log(lokidb);
	db = lokidb;

	polka() // You can also use Express
		.use(cors())
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			sapper.middleware()
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});


});