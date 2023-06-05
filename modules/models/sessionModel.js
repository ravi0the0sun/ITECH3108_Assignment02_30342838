import client from '../db/db.js';

const Session = {
	find: async id => {
		const res =
			await client.queryObject`SELECT * FROM session WHERE id = ${id};`;
		console.log(res.rows);
	},
};

export default Session;
