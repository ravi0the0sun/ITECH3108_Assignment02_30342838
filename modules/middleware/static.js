import { send } from 'https://deno.land/x/oak@v7.4.1/mod.ts';

export async function staticFiles(context) {
	await send(context, context.request.url.pathname, {
		root: `${Deno.cwd()}/static`,
		index: 'index.html',
	});
}
