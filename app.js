import { Application, Router } from 'https://deno.land/x/oak@v7.4.1/mod.ts';
import { Session } from 'https://deno.land/x/oak_sessions@v4.1.4/mod.ts';

import { staticFiles } from './modules/middleware/static.js';
import { pwHashing, pwVerify } from './modules/middleware/authHandler.js';

import { MemberController } from './modules/controllers/member.js';
import { PostController } from './modules/controllers/post.js';
import { RatingController } from './modules/controllers/rating.js';
import Models from './modules/models/model.js';

import client from './modules/db/db.js';

import { PORT } from './modules/config/config.js';

const app = new Application();
const router = new Router();

const memberController = new MemberController(Models);
const postController = new PostController(Models);
const ratingController = new RatingController(Models);

router.get('/api/members', ctx => memberController.findAll(ctx));
router.get('/api/members/logout', ctx => memberController.logout(ctx));
router.get('/api/members/:id', ctx => memberController.find(ctx));
router.post('/api/members/login', ctx => memberController.login(ctx));
router.post('/api/members/signup', ctx => memberController.signup(ctx));

router.get('/api/posts', ctx => postController.findAll(ctx));
router.post('/api/posts', ctx => postController.addPost(ctx));
router.get('/api/posts/:id', ctx => postController.find(ctx));
router.get('/api/ratings', ctx => ratingController.findAll(ctx));
router.post('/api/ratings', ctx => ratingController.addRating(ctx));

app.use(Session.initMiddleware());
app.use(router.allowedMethods());
app.use(router.routes());
app.use(staticFiles);

app.addEventListener('error', evt => {
	console.log(evt.error);
});

app.addEventListener('listen', e => console.log(`listing on port: ${e.port}`));

app.listen({ port: PORT });
