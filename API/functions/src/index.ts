import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import questionsApp from './routes/questions.routes';
import answerApp from './routes/answers.routes';

admin.initializeApp(functions.config().firebase);

exports.questions = functions.region("asia-east2").https.onRequest(questionsApp);
exports.answers = functions.region("asia-east2").https.onRequest(answerApp);
