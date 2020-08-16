import * as answerModel from '../models/answers.model';
import { addAnswer, editAnswer } from '../types/answers.types';

export async function addAnswer(answer: addAnswer) {
    try {
        console.info('[questions-service::addAnswer] begin');
        return await answerModel.addAnswer(answer);
    } catch(e) {
        console.error('[questions-service::addAnswer] error-', e);
        throw new Error('Error inside questions service-addAnswer')
    }
}

export async function editAnswer(answer: editAnswer) {
    try {
        console.info('[questions-service::editAnswer] begin');
        return await answerModel.editAnswer(answer);
    } catch(e) {
        console.error('[questions-service::editAnswer] error-', e);
        throw new Error('Error inside questions service-editAnswer')
    }
}

export async function deleteAnswer(id: string, userId: string, questionId: string) {
    try {
        console.info('[questions-service::deleteAnswer] begin');
        return await answerModel.deleteAnswer(id, userId, questionId);
    } catch(e) {
        console.error('[questions-service::deleteAnswer] error-', e);
        throw new Error('Error inside questions service-deleteAnswer')
    }
}

export async function likeAnswer(userId: string, questionId: string, answerId: string) {
    try {
        console.info('[questions-service::likeAnswer] begin');
        return await answerModel.likeAnswer(userId, questionId, answerId);
    } catch(e) {
        console.error('[questions-service::likeAnswer] error-', e);
        throw new Error('Error inside questions service-likeAnswer')
    }
}