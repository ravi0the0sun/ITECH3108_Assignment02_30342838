import errorHandler from '../middleware/errorHandler.js';

export class PostController {
	constructor(models) {
		this.models = models;
	}
	async findAll(context) {
		let posts = await this.models.Post.findAll();
		if (!posts.rowCount) {
			posts.forEach(post => {
				post._url = `/api/posts/${post.id}`;
			});
			posts = { posts, status: 200 };
		} else {
			posts = { posts, status: 404 };
		}
		context.response.body = posts;
	}

	async find(context) {
		try {
			const id = context.params.id;
			let post = await this.models.Post.find(id);
			post = { post, _url: `/api/posts/${id}`, status: 200 };

			context.response.body = post;
		} catch (e) {
			errorHandler(context, 404, e.message);
		}
	}

	async addPost(context) {
		try {
			const { member_id, title, link, description } =
				await context.request.body().value;
			const post = await this.models.Post.addPost(
				member_id,
				title,
				link,
				description
			);
			context.response.body = { post, _url: `/api/posts/${post.id}` };
		} catch (e) {
			errorHandler(context, 500, e.message);
		}
	}
}
