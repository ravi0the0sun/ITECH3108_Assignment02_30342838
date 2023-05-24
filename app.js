import { Application, Router } from 'https://deno.land/x/oak@v7.4.1/mod.ts';
import { staticFiles } from './modules/middleware/static.js';
import { pwHashing } from './modules/middleware/authHandler.js';

import client from './modules/db/db.js';

import { PORT } from './modules/config/config.js';

const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(staticFiles);

//TODO: remove this after test

const member = [
	['gelato_lover1', 'p@ssw0rd123'],
	['icy_delights82 ', 'summerGelato!'],
	['frosty_treats19', 'ChocoMinty#1'],
	['creamy_dreams7', 'GelatoGuru42'],
	['flavor_fanatic55', 'YummySorbet@123'],
	['chilly_connoisseur', 'IcedDelights2023'],
	['sweet_tooth88', 'GelatoLover88'],
	['frozen_indulgence', 'ScoopMaster99'],
	['creamy_bliss23', 'DreamyGelato#23'],
	['frostbite74', 'ChillOutNow!'],
	['ravi', 'ravi'],
];
member.forEach(async user => {
	const results =
		await client.queryObject`INSERT INTO member(username, pwhash) VALUES
		(${user[0]},${pwHashing(user[1])}) RETURNING (ID)
	`;
	console.log(results);
});

app.addEventListener('error', evt => {
	console.log(evt.error);
});

await app.listen({ port: PORT });
