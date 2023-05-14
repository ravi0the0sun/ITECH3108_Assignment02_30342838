import { Application, Router } from 'https://deno.land/x/oak@v7.4.1/mod.ts';
import { staticFiles } from './modules/middleware/static.js';

import client from './modules/db/db.js';

import { PORT, DATABASE } from './modules/config/config.js';

const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(staticFiles);

const results = await client.queryObject`SELECT * from member`;

console.log(results.rows);

app.addEventListener('error', evt => {
	console.log(evt.error);
});

await app.listen({ port: PORT });
