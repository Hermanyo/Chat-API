const firebase = require('firebase-functions').config().firebase
const admin = require('firebase-admin')

admin.initializeApp(firebase)
const db = admin.firestore()

module.exports = db
