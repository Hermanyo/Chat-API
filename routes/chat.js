const db =  require('../configs.js/firebase');
const chat = db.collection("chat"); 
const cors = require("cors")
const express = require("express")
const app = express()   

app.use(cors({ origin: true })) 
app.get("/createChat", (req,res) => { //This route will create the Chat (a doc with random id)
    let data = { //Chat structure
        _id: req.query.id, 
        createdAt: new Date().getTime(),
        messages:[]
    }
    chat.add(data) //Create a new doc with Chat structure
        .then(() =>{  
            res.status(200).send(data); 
            return true
        }) 
        .catch(error => {
            res.status(201).send(error);
            return false;
        })
}) 

app.get('/loadChats', (req, res) => { //This route will load all chats associated with current user id
    chat.where('_id', '==', req.query.id).get() 
        .then((snapshot) => {
            let chats = [];
            snapshot.forEach(doc => chats.push({ id: doc.id, data: doc.data() })) //Push Structure associated with chat id

            res.status(200).send(chats)
            return true
        })
        .catch((error) => {
            res.status(201).send(error)
            return false;
        }) 
}) 

app.get('/sendMessage', (req, res) => {//This route will send message in associated chat id
    let data = { //Message structure
        _id: req.query.id, 
        content: req.query.content,
        createdAt: new Date().getTime(),
    }
    if (req.query.id){ 
        return chat.doc(req.query.chatId).get() //push new message into messages array
                .then((snapshot) => {
                    chatRef.update('messages', [...snapshot.data().messages, data])
                    return true
                })
    }
    return false;
}) 
module.exports = app; 