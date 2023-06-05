import errorHandler from '../middleware/errorHandler.js';

export class RatingController {
	constructor(models) {
		this.models = models;
	}

	async findAll(context) {
		try {
			const ratings = await this.models.Rating.findAll();
			ratings.forEach(rating => {
				rating._url = `/api/rating/${rating.post_id}`;
			});
			context.response.body = { ratings, status: 200 };
		} catch (e) {
			errorHandler(context, 404, e.message);
		}
	}

	async addRating(context) {
		try {
			const { member_id, post_id } = await context.response.body().value;
			const rating = await this.models.Rating.addRating();
		} catch (e) {
			errorHandler(context, 400, e.message);
		}
	}
}
