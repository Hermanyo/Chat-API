const functions = require('firebase-functions')
    
const express = require('express')
const bodyParser = require('body-parser') 

const app = express()
const main = express()

const chat = require('./routes/chat') 

main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false })) 

app.use('/chat', chat) 

exports.chatApi = functions.https.onRequest(main)