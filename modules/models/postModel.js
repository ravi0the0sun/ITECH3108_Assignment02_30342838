import client from '../db/db.js';

const Post = {
	findAll: async () => {
		const res = await client.queryObject`SELECT * FROM post;`;
		if (!res.rowCount) {
			throw new Error('No Posts Found');
		}
		return res.rows;
	},
	find: async id => {
		const res = await client.queryObject`SELECT * FROM post WHERE id = ${id};`;
		if (!res.rowCount) {
			throw new Error('Post Not Found');
		}
		return res.rows[0];
	},
	addPost: async (member_id, title, link, description) => {
		if (!member_id || !title || !link || !description) {
			throw new Error('Missing Details');
		}
		const res =
			await client.queryObject`INSERT INTO post (title, link, description, member_id) VALUES (${title}, ${link}, ${description}, ${member_id}) RETURNING *`;
		return res.rows[0];
	},
};

export default Post;
