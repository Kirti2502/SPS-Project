export const firebaseConfig = {
    apiKey: "AIzaSyD4K-ENdlSk7bJ38wwkUYvFVfLHsdpm_4s",
    authDomain: "summer20-sps-86.firebaseapp.com",
    databaseURL: "https://summer20-sps-86.firebaseio.com",
    projectId: "summer20-sps-86",
    storageBucket: "summer20-sps-86.appspot.com",
    messagingSenderId: "262008738474",
    appId: "1:262008738474:web:1c7923c002007145ba36d3"
};

export default {
    routes: {
        questions : 'https://asia-east2-summer20-sps-86.cloudfunctions.net/questions/',
        answers: 'https://asia-east2-summer20-sps-86.cloudfunctions.net/answers/',
        users: 'https://asia-east2-summer20-sps-86.cloudfunctions.net/users/',
    }
}