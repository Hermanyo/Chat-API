const functions = require("firebase-functions")
const chatApi = require('./routes/routes')


exports.chatApi = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }
    return chatApi(request, response)
})
