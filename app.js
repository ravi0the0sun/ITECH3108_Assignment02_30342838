import { Application, Router } from 'https://deno.land/x/oak@v7.4.1/mod.ts';
import { Session } from 'https://deno.land/x/oak_sessions@v4.1.4/mod.ts';

import { staticFiles } from './modules/middleware/static.js';
import { pwHashing } from './modules/middleware/authHandler.js';

import client from './modules/db/db.js';

import { PORT } from './modules/config/config.js';

const app = new Application();
const router = new Router();

router.get('/api/users', async ctx => {
	const res = await client.queryObject`SELECT username FROM member;`;
	ctx.status = 201;
	ctx.response.body = { status: 200, data: res.rows };
});
router.get('/api/user/login', async ctx => {
	const cookie = await ctx.state.session.get('session_id');
	console.log(cookie);
	ctx.response.status = 201;
});
router.post('/api/user/signup', async ctx => {
	try {
		const { username, password } = await ctx.request.body().value;
		console.log(username, password);
		const res =
			await client.queryObject`INSERT INTO member (username, pwhash) VALUES (${username}, ${pwHashing(
				password
			)}) RETURNING id`;
		ctx.state.session.set('session_id', res.rows[0].id);
		console.log(res.rows[0].id);
		ctx.response.body = { status: 201, data: { id: res.rows[0].id } };
	} catch (e) {
		if (e.name === 'PostgresError') {
			ctx.response.body = { error: 'UsernameExist', status: 500 };
		} else {
			console.log(e);
		}
	}
});
router.get('/api/posts', async ctx => {
	const res = await client.queryObject`SELECT * FROM post;`;
	console.log(res);
	if (!res.rowCount) {
		ctx.response.body = { status: 200, data: 'No Posts' };
	} else {
		ctx.response.body = { status: 200, data: res.rowCount };
	}
});
router.get('/api/posts/:id', async ctx => {
	const res =
		await client.queryObject`SELECT * FROM post WHERE id = ${ctx.params.id};`;
	console.log(res);
	if (!res.rowCount) {
		ctx.response.body = { status: 200, data: 'No Posts' };
	} else {
		ctx.response.body = { status: 200, data: res.rows };
	}
});
router.get('/api/ratings', async ctx => {
	const res = await client.queryObject`SELECT * FROM rating`;
	if (!res.rowCount) {
		ctx.response.body = { status: 200, data: 'No Posts' };
	} else {
		ctx.response.body = { status: 200, data: res.rows };
	}
});

app.use(Session.initMiddleware());
app.use(router.allowedMethods());
app.use(router.routes());
app.use(staticFiles);

app.addEventListener('error', evt => {
	console.log(evt.error);
});

app.addEventListener('listen', e => console.log(`listing on port: ${e.port}`));

app.listen({ port: PORT });
