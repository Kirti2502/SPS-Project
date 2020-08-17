import { firestore } from 'firebase-admin';
import { Answer, addAnswer, editAnswer } from '../types/answers.types';

const { v4: uuid } = require('uuid');
const date = new Date();

export async function addAnswer(answer: addAnswer) {
    try {
        console.info('[answers-model::addAnswer] begin');

        const id = uuid();
        const questionId = answer.questionId;
        const userId = answer.userId;
        const newAnswer: Answer = {
            id: id,
            dateModified: date.toISOString(),
            name: answer.name,
            description: answer.description,
            upvotes: 0
        }

        await firestore().collection('questions').doc(questionId).update({
            answers: firestore.FieldValue.arrayUnion(newAnswer),
        });
        const snapshot = await firestore().collection('users').doc(userId).get();
        const questionsAnswered = snapshot?.data()?.questionsAnswered;
        let count = 0;
        await questionsAnswered.map((currentquestionId: string) => {
            if(currentquestionId === questionId) {
                count++;
            }
        });
        if(count === 0)
        await firestore().collection('users').doc(userId).update({
            questionsAnswered: firestore.FieldValue.arrayUnion(questionId)
        });
        return newAnswer;

    } catch(e) {
        console.error('[answers-model::addAnswer] error-', e);
        throw new Error('Error inside answers model-addAnswer');
    }
}

export async function editAnswer(answer: editAnswer) {
    try {
        console.info('[answers-model::editAnswer] begin');

        const id = answer.id;
        const questionId = answer.questionId;
        
        let oldAnswer;
        const answers = await (await firestore().collection('questions').doc(questionId).get()).get('answers')
        await answers.map((currentAnswer: any) => {
            if(currentAnswer.id === answer.id) {
                oldAnswer = currentAnswer;
            }
        });
        
        const newAnswer: Answer = {
            id: id,
            dateModified: date.toISOString(),
            name: answer.name,
            description: answer.description,
            upvotes: answer.upvotes
        };

        await firestore().collection('questions').doc(questionId).update({
            answers: firestore.FieldValue.arrayUnion(newAnswer),
        });
        await firestore().collection('questions').doc(questionId).update({
            answers: firestore.FieldValue.arrayRemove(oldAnswer),
        });

        return newAnswer;

    } catch(e) {
        console.error('[answers-model::editAnswer] error-', e);
        throw new Error('Error inside answers model-editAnswer');
    }
}

export async function deleteAnswer(id: string, userId: string, questionId: string) {
    try {
        console.info('[answers-model::deleteAnswer] begin');

        const snapshot = await firestore().collection('questions').doc(questionId).get();
        const question = snapshot.data();
        
        const finalQuestions =  await firestore().collection('questions').doc(questionId).update({
            answers: question?.answers.filter((answer: Answer) => answer.id !== id)
        });

        return finalQuestions;

    } catch(e) {
        console.error('[answers-model::deleteAnswer] error-', e);
        throw new Error('Error inside answers model-deleteAnswer');
    }
}

export async function likeAnswer(userId: string, questionId: string, answerId: string) {
    try {
        console.info('[answers-model::likeAnswer] begin');

        let oldAnswer;
        let newAnswer;
        const answers = await (await firestore().collection('questions').doc(questionId).get()).get('answers')
        await answers.map((currentAnswer: any) => {
            if(currentAnswer.id === answerId) {
                newAnswer = {
                    id: answerId,
                    description: currentAnswer?.description,
                    dateModified: currentAnswer?.dateModified,
                    name: currentAnswer?.name,
                    upvotes: currentAnswer?.upvotes+1
                }
                oldAnswer = currentAnswer;
            }
        });
        
        await firestore().collection('users').doc(userId).update({
            likedAnswers: firestore.FieldValue.arrayUnion(answerId)
        });

        await firestore().collection('questions').doc(questionId).update({
            answers: firestore.FieldValue.arrayUnion(newAnswer)
        });
        return await firestore().collection('questions').doc(questionId).update({
            answers: firestore.FieldValue.arrayRemove(oldAnswer)
        });

    } catch(e) {
        console.error('[answers-model::likeAnswer] error-', e);
        throw new Error('Error inside answers model-likeAnswer');
    }
}