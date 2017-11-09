const firebase = require("firebase");

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyA7VjmnB1T8kzMqQDm8ZGi8oRA_REs7ngg',
    authDomain: 'lifestrengths-12caf.firebaseapp.com',
    databaseURL: 'https://lifestrengths-12caf.firebaseio.com/',
    storageBucket: '',
    projectId: 'lifestrengths-12caf'
};

export default app = firebase.initializeApp(firebaseConfig);
