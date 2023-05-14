import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

import { DATABASE } from '../config/config.js';

const client = new Client(DATABASE);

await client.connect();

export default client;
