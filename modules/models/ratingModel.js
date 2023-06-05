import client from '../db/db.js';

const Rating = {
	findAll: async () => {
		const res = await client.queryObject`SELECT * FROM rating;`;
		if (!res.rowCount) {
			throw new Error('No Ratings');
		}
		return res.rows;
	},
	// findByPost: async post_id => {
	// 	const res =
	// 		await client.queryObject`SELECT * FROM rating WHERE post_id = ${post_id}`;
	// 	console.log(res);
	// },
	// findByUser: async userId => {
	// 	const res =
	// 		await client.queryObject`SELECT * FROM rating WHERE post_id = ${userId}`;
	// 	console.log(res);
	// },
	createRating: async (post_id, member_id, rating) => {
		const res =
			await client.queryObject`INSERT INTO rating(rating, member_id, post_id) VALUES(${rating}, ${member_id}, ${post_id});`;
	},
};

export default Rating;
