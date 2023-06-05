import errorHandler from '../middleware/errorHandler.js';
export class MemberController {
	constructor(models) {
		this.models = models;
	}
	async findAll(context) {
		const members = await this.models.Member.findAll();
		members.forEach(member => {
			member._url = `/api/members/${member.id}`;
		});

		context.response.body = { members, status: 200 };
	}

	async find(context) {
		const member = await this.models.Member.find(context.params.id);
		if (!member) {
			errorHandler(context, 404, 'User Does Not Exist');
		} else {
			context.response.body = {
				...member,
				status: 200,
				_url: `/api/members/${member.id}`,
			};
		}
	}

	async login(context) {
		try {
			const { username, password } = await context.request.body().value;
			const id = await this.models.Member.login(username, password);

			context.response.body = { id, username, status: 200 };
			context.state.session.set('userId', id);
		} catch (e) {
			if (e.message === 'UserDoesNotExist') {
				return errorHandler(context, 400, 'Wrong Username');
			}
			if (e.message === 'MissingData') {
				return errorHandler(context, 400, 'Username or Password Missing');
			}
			if (e.message === 'PasswordDoesNotMatch') {
				return errorHandler(context, 401, 'Wrong Password');
			}
			return errorHandler(context, 500, e.message);
		}
	}

	async logout(context) {
		await context.state.session.deleteSession();
		context.response.redirect('/');
	}

	async signup(context) {
		try {
			const { username, password } = await context.request.body().value;
			const { id } = await this.models.Member.signup(username, password);
			console.log(id);
			context.response.body = { id, username, status: 200 };
			context.state.session.set('userId', id);
		} catch (e) {
			console.log(e.message);
			if (e.name === 'PostgresError') {
				errorHandler(context, 400, 'Member Already Exist');
			} else {
				errorHandler(context, 500, e.message);
			}
		}
	}
}
