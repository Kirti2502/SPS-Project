import * as questionsModel from '../models/questions.model';
import { addQuestion, editQuestion } from '../types/question.types';

export async function getQuestions() {
    try {
        console.info('[questions-service::getQuestions] begin');
        return await questionsModel.getQuestions();
    } catch(e) {
        console.error('[questions-service::getQuestions] error-', e);
        throw new Error('Error inside questions service-getQuestions')
    }
}

export async function addQuestion(question: addQuestion) {
    try {
        console.info('[questions-service::addQuestion] begin');
        return await questionsModel.addQuestion(question);
    } catch(e) {
        console.error('[questions-service::addQuestion] error-', e);
        throw new Error('Error inside questions service-addQuestion')
    }
}

export async function editQuestion(question: editQuestion) {
    try {
        console.info('[questions-service::editQuestion] begin');
        return await questionsModel.editQuestion(question);
    } catch(e) {
        console.error('[questions-service::editQuestion] error-', e);
        throw new Error('Error inside questions service-editQuestion')
    }
}

export async function getQuestionByTag(tag: string) {
    try {
        console.info('[questions-service::getQuestionByTag] begin');
        return await questionsModel.getQuestionByTag(tag);
    } catch(e) {
        console.error('[questions-service::getQuestionByTag] error-', e);
        throw new Error('Error inside questions service-getQuestionByTag')
    }
}

export async function deleteQuestion(id: string, userId: string) {
    try {
        console.info('[questions-service::deleteQuestion] begin');
        return await questionsModel.deleteQuestion(id, userId);
    } catch(e) {
        console.error('[questions-service::deleteQuestion] error-', e);
        throw new Error('Error inside questions service-deleteQuestion')
    }
}

export async function likeQuestion(questionId: string, userId: string) {
    try {
        console.info('[questions-service::likeQuestion] begin');
        return await questionsModel.likeQuestion(questionId, userId);
    } catch(e) {
        console.error('[questions-service::likeQuestion] error-', e);
        throw new Error('Error inside questions service-likeQuestion')
    }
}