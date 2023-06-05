import client from '../db/db.js';
import { pwHashing, pwVerify } from '../middleware/authHandler.js';

const Member = {
	findAll: async () => {
		const res = await client.queryObject`SELECT id, username FROM member;`;
		return res.rows;
	},
	find: async id => {
		const res =
			await client.queryObject`SELECT id, username FROM member WHERE id = ${id}`;
		return res.rows[0];
	},
	findByUsername: async username => {
		const res =
			await client.queryObject`SELECT id, username, pwhash FROM member WHERE username = ${username}`;
		return res.rows[0];
	},
	login: async (username, password) => {
		if (!username || !password) {
			throw new Error('MissingData');
		}
		const member = await Member.findByUsername(username);
		if (!member?.id) {
			throw new Error('UserDoesNotExist');
		}
		const { id, pwhash } = member;
		const verify = pwVerify(pwhash, password);
		if (!verify) {
			throw new Error('PasswordDoesNotMatch');
		}
		return id;
	},
	signup: async (username, password) => {
		try {
			const pwhash = pwHashing(password);
			const res =
				await client.queryObject`INSERT INTO member(username, pwhash) VALUES (${username}, ${pwhash}) RETURNING id`;
			return res.rows[0];
		} catch (e) {
			throw e;
		}
	},
};

export default Member;
