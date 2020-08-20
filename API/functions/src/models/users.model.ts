import { firestore } from 'firebase-admin';

export async function getLikedQuestions(userId: string) {
    try {
        console.info('[users-model::getLikedQuestions] begin');

        const likedQuestions = await (await firestore().collection('users').doc(userId).get()).get('likedQuestions');
        const snapshot =  await firestore().collection('questions').where(firestore.FieldPath.documentId(), 'in', likedQuestions).get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[users-model::getLikedQuestions] error-', e);
        throw new Error('Error inside users model-getLikedQuestions');
    }
}

export async function getAnsweredQuestions(userId: string) {
    try {
        console.info('[users-model::getAnsweredQuestions] begin');

        const questionsAnswered = await (await firestore().collection('users').doc(userId).get()).get('questionsAnswered');
        const snapshot =  await firestore().collection('questions').where(firestore.FieldPath.documentId(), 'in', questionsAnswered).get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[users-model::getAnsweredQuestions] error-', e);
        throw new Error('Error inside users model-getAnsweredQuestions');
    }
}

export async function getQuestionsAsked(userId: string) {
    try {
        console.info('[users-model::getQuestionsAsked] begin');

        const questionsAsked = await (await firestore().collection('users').doc(userId).get()).get('questionsAsked');
        const snapshot =  await firestore().collection('questions').where(firestore.FieldPath.documentId(), 'in', questionsAsked).get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[users-model::getQuestionsAsked] error-', e);
        throw new Error('Error inside users model-getQuestionsAsked');
    }
}

export async function getLikedAnswers(userId: string) {
    try {
        console.info('[users-model::getLikedAnswers] begin');

        const likedAnswers = await (await firestore().collection('users').doc(userId).get()).get('likedAnswers');
        const snapshot =  await firestore().collection('questions').where(firestore.FieldPath.documentId(), 'in', likedAnswers).get();
        return snapshot.docs.map(doc => doc.data());
    } catch(e) {
        console.error('[users-model::getLikedAnswers] error-', e);
        throw new Error('Error inside users model-getLikedAnswers');
    }
}