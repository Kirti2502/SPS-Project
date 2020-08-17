import { firestore } from 'firebase-admin';
import { addQuestion, editQuestion, Question } from '../types/question.types';

const date = new Date();
const { v4: uuid } = require('uuid');

export async function getQuestions() {
    try {
        console.info('[questions-model::getQuestions] begin');

        const snapshot = await firestore().collection('questions').get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[questions-model::getQuestions] error-', e);
        throw new Error('Error inside questions model-getQuestions');
    }
}

export async function getQuestionByTag(tag: string) {
    try {
        console.info('[questions-model::getQuestionByTag] begin');

        const snapshot = await firestore().collection('questions').where('tags', 'array-contains', tag).get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[questions-model::getQuestionByTag] error-', e);
        throw new Error('Error inside questions model-getQuestionByTag');
    }
}

export async function addQuestion(question: addQuestion) {
    try {
        console.info('[questions-model::addQuestion] begin');

        const id = uuid();
        const userId = question.userId;
        const newQuestion: Question = {
            id: id,
            description: question.description,
            dateCreated: date.toISOString(),
            dateModified: date.toISOString(),
            upvotes: 0,
            name: question.name,
            tags: question.tags,
            answers: [],
            userId: question.userId
        };
        await firestore().collection('questions').doc(id).set(newQuestion);
        await firestore().collection('users').doc(userId).update({
            questionsAsked: firestore.FieldValue.arrayUnion(id),
        });

        return newQuestion;

    } catch(e) {
        console.error('[questions-model::addQuestion] error-', e);
        throw new Error('Error inside questions model-addQuestion');
    }
}

export async function editQuestion(question: editQuestion) {
    try {
        console.info('[questions-model::editQuestion] begin');

        const id = question.id;
        const userId = question.userId;
        const snapshot = await firestore().collection('questions').doc(id).get();
        const dateCreated = snapshot.data()?.dateCreated;
        const newQuestion: Question = {
            id: id,
            description: question.description,
            dateCreated: dateCreated,
            dateModified: date.toISOString(),
            upvotes: question.upvotes,
            name: question.name,
            tags: question.tags,
            answers: question.answers,
            userId: userId
        }
        await firestore().collection('questions').doc(id).update(newQuestion);
        return newQuestion;

    } catch(e) {
        console.error('[questions-model::editQuestion] error-', e);
        throw new Error('Error inside questions model-editQuestion');
    }
}

export async function deleteQuestion(id: string, userId: string) {
    try {
        console.info('[questions-model::deleteQuestion] begin');

        await firestore().collection('users').doc(userId).update({
            questionsAsked: firestore.FieldValue.arrayRemove(id),
        });
        return await firestore().collection('questions').doc(id).delete();
    } catch(e) {
        console.error('[questions-model::deleteQuestion] error-', e);
        throw new Error('Error inside questions model-deleteQuestion');
    }
}

export async function likeQuestion(questionId: string, userId: string) {
    try {
        console.info('[questions-model::likeQuestion] begin');

        const upvotes = await(await firestore().collection('questions').doc(questionId).get()).get('upvotes');
        await firestore().collection('users').doc(userId).update({
            likeQuestions: firestore.FieldValue.arrayUnion(questionId),
        });
        return await firestore().collection('questions').doc(questionId).update({
            upvotes: upvotes+1
        });

    } catch(e) {
        console.error('[questions-model::likeQuestion] error-', e);
        throw new Error('Error inside questions model-likeQuestion');
    }
}