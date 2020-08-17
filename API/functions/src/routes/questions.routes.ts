import * as Express from 'express';
import * as questionsService from '../services/questions.services';

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
    '/',
    async function getQuestions(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::getQuestions] begin');

            const questions = await questionsService.getQuestions();
            res.status(200).json({ error: false, questions: questions });
        } catch(e) {
            console.error('[questions-route::getQuestions] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.get(
    '/:tag',
    async function getQuestionByTag(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::getQuestionByTag] begin');

            const questions = await questionsService.getQuestionByTag(req.params.tag);
            res.status(200).json({ error: false, questions: questions });
        } catch(e) {
            console.error('[questions-route::getQuestionByTag] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.post(
    '/',
    async function addQuestion(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::addQuestion] begin');

            const newQuestion = await questionsService.addQuestion(req.body);
            res.status(200).json({ error: false, question: newQuestion });
        } catch(e) {
            console.error('[questions-route::addQuestion] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.put(
    '/',
    async function editQuestion(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::editQuestion] begin');

            const newQuestion = await questionsService.editQuestion(req.body);
            res.status(200).json({ error: false, question: newQuestion });
        } catch(e) {
            console.error('[questions-route::editQuestion] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.delete(
    '/',
    async function deleteQuestion(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::deleteQuestion] begin');

            const question = await questionsService.deleteQuestion(req.body.id, req.body.userId);
            res.status(200).json({ error: false, question: question });
        } catch(e) {
            console.error('[questions-route::deleteQuestion] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

router.put(
    '/',
    async function likeQuestion(req: Express.Request, res: Express.Response) {
        try {
            console.info('[questions-route::likeQuestion] begin');

            const question = await questionsService.likeQuestion(req.body.questionId, req.body.userId);
            res.status(200).json({ error: false, question: question });
        } catch(e) {
            console.error('[questions-route::likeQuestion] error-', e);
            res.status(500).json({ error: true, message: e.message });
        }
    }
);

app.use('/', router);
export default app;