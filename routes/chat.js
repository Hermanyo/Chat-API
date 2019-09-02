const db =  require('../configs.js/firebase');
const chat = db.collection("chat"); 
const cors = require("cors")
const express = require("express")
const app = express()   

app.use(cors({ origin: true })) 

app.post('/post',(req,res) => {
    if(req.body.postMethod === 'createChat'){//This route will create the Chat (a doc with random id)
        let data = { //Chat structure
            users: req.body.users,
            createdAt: new Date().getTime(),
            messages: []
        }
        chat.add(data) //Create a new doc with Chat structure
            .then(() => {
                res.status(200).json(data);
                return true
            })
            .catch(error => {
                res.status(201).send(error); 
            })
    }
    else if (req.body.postMethod === 'sendMessage') {//This route will create the Chat (a doc with random id)
        let message = req.body.message
        const chatRef = chat.doc(req.body.chatId);

        chatRef.get() //push new message into messages array
            .then((snapshot) => {
                chatRef.update('messages', [message, ...snapshot.data().messages])
                res.status(200).json(chatRef.messages)
                return true;
            })
            .catch((error) => {
                res.status(201).send(error)
            })
    }
}) 
app.get('/:loadChats', (req, res) => { //This route will load all chats associated with current user id
    chat.where('users', 'array-contains', req.query._id).get() 
        .then((snapshot) => {
            let chats = [];
            snapshot.forEach(doc => chats.push({ id: doc.id, data: doc.data() })) //Push Structure associated with chat id
            
            res.status(200).json(chats)
            return true
        })
        .catch((error) => {
            res.status(201).send(error) 
        }) 
}) 

 

 
module.exports = app; 