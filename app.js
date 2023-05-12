import { Application, Router } from 'https://deno.land/x/oak@v7.4.1/mod.ts';
import { staticFiles } from './modules/middleware/static.js';

const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(staticFiles);

app.addEventListener('error', evt => {
	console.log(evt.error);
});

await app.listen({ port: 3000 });
