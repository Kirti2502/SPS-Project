import * as Express from 'express';
import * as answersService from '../services/answers.service';

const app = Express();
const bodyParser = require('body-parser');
const router = Express.Router();
const CORS = require('cors');
const helmet = require('helmet');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS());
app.use(helmet());

router.post(
    '/',
    async function addAnswer(req: Express.Request, res: Express.Response) {
        try {
            console.info('[answers-route::addAnswer] begin');

            const answer = await answersService.addAnswer(req.body);
            res.status(200).json({ error: false, answer });
        } catch(e){
            console.error('[answers-route::addAnswer] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.put(
    '/',
    async function editAnswer(req: Express.Request, res: Express.Response) {
        try {
            console.info('[answers-route::editAnswer] begin');

            const answer = await answersService.editAnswer(req.body);
            res.status(200).json({ error: false, answer });
        } catch(e){
            console.error('[answers-route::editAnswer] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.delete(
    '/',
    async function deleteAnswer(req: Express.Request, res: Express.Response) {
        try {
            console.info('[answers-route::deleteAnswer] begin');

            const answer = await answersService.deleteAnswer(req.body.id, req.body.userId, req.body.questionId);
            res.status(200).json({ error: false, answer });
        } catch(e){
            console.error('[answers-route::deleteAnswer] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.put(
    '/upvote',
    async function likeAnswer(req: Express.Request, res: Express.Response) {
        try {
            console.info('[answers-route::likeAnswer] begin');

            const answer = await answersService.likeAnswer(req.body.userId, req.body.questionId, req.body.answerId);
            res.status(200).json({ error: false, answer });
        } catch(e){
            console.error('[answers-route::likeAnswer] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

app.use('/', router);
export default app;