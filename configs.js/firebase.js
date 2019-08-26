const firebase = require('firebase-functions').config().firebase
const admin = require('firebase-admin') 

var serviceAccount = require("/home/hermanyo/chatAPI/homeCareApp-4034158b08f5.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://home-care-app.firebaseio.com"
});

const db = admin.firestore() 
module.exports = db 