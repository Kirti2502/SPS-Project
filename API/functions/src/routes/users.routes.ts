import * as Express from 'express';
import * as usersService from '../services/users.service';

const app = Express();
const bodyParser = require('body-parser');
const router = Express.Router();
const CORS = require('cors');
const helmet = require('helmet');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS());
app.use(helmet());

router.get(
    '/likedQuestions/:userId',
    async function getLikedQuestions(req: Express.Request, res: Express.Response) {
        try {
            console.info('[users-route::getLikedQuestions] begin');

            const questions = await usersService.getLikedQuestions(req.params.userId);
            res.status(200).json({ error: false, questions });
        } catch(e){
            console.error('[users-route::getLikedQuestions] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.get(
    '/likedAnswers/:userId',
    async function getLikedAnswers(req: Express.Request, res: Express.Response) {
        try {
            console.info('[users-route::getLikedAnswers] begin');

            const questions = await usersService.getLikedAnswers(req.params.userId);
            res.status(200).json({ error: false, questions });
        } catch(e){
            console.error('[users-route::getLikedAnswers] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.get(
    '/questionsAsked/:userId',
    async function getQuestionsAsked(req: Express.Request, res: Express.Response) {
        try {
            console.info('[users-route::getQuestionsAsked] begin');

            const questions = await usersService.getQuestionsAsked(req.params.userId);
            res.status(200).json({ error: false, questions });
        } catch(e){
            console.error('[users-route::getQuestionsAsked] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.get(
    '/questionsAnswered/:userId',
    async function getAnsweredQuestions(req: Express.Request, res: Express.Response) {
        try {
            console.info('[users-route::getAnsweredQuestions] begin');

            const questions = await usersService.getAnsweredQuestions(req.params.userId);
            res.status(200).json({ error: false, questions });
        } catch(e){
            console.error('[users-route::getAnsweredQuestions] error-',e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

app.use('/', router);
export default app;