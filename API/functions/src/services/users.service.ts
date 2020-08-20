import * as usersModel from '../models/users.model';

export async function getLikedQuestions(userId: string) {
    try {
        console.info('[users-service::getLikedQuestions] begin');
        return await usersModel.getLikedQuestions(userId);
    } catch(e) {
        console.error('[users-service::getLikedQuestions] error-', e);
        throw new Error('Error inside users service-getLikedQuestions');
    }
}

export async function getAnsweredQuestions(userId: string) {
    try {
        console.info('[users-service::getAnsweredQuestions] begin');
        return await usersModel.getAnsweredQuestions(userId);
    } catch(e) {
        console.error('[users-service::getAnsweredQuestions] error-', e);
        throw new Error('Error inside users service-getAnsweredQuestions');
    }
}

export async function getQuestionsAsked(userId: string) {
    try {
        console.info('[users-service::getQuestionsAsked] begin');
        return await usersModel.getQuestionsAsked(userId);
    } catch(e) {
        console.error('[users-service::getQuestionsAsked] error-', e);
        throw new Error('Error inside users service-getQuestionsAsked');
    }
}

export async function getLikedAnswers(userId: string) {
    try {
        console.info('[users-service::getLikedAnswers] begin');
        return await usersModel.getLikedAnswers(userId);
    } catch(e) {
        console.error('[users-service::getLikedAnswers] error-', e);
        throw new Error('Error inside users service-getLikedAnswers');
    }
}