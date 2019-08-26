const db =  require('../configs.js/firebase');
const chat = db.collection("chat"); 
const cors = require("cors")
const express = require("express")
const app = express()  
const admin = require('firebase-admin');  


app.use(cors({ origin: true }))
app.get("/", (request, response) => {
    chat.get()
        .then(snapshot => {
            let result = []
            let i = 0

            snapshot.forEach(doc => {
                result[i++] = { id: doc.id, data: doc.data() }
            })

            response.status(200).send(JSON.stringify(result))
            return true;
        })
        .catch(error => {
            response.status(201).send(error)
        })
     
})  

app.get("/createChat", async (req,response) => { 
    let data = { 
        _id: JSON.parse(JSON.stringify(await admin.auth().getUserByEmail(req.query.id))).uid, //req.params.id, 
        createdAt: new Date().getTime(),
        messages:[]
    }
    chat.add(data)
        .then(async () =>{   
            return true
        }) 
        .catch(error => {
            console.error(error.code)
        })
})
app.get('/sendMessage', async (req,res) => {
    let data = {
        _id: JSON.parse(JSON.stringify(await admin.auth().getUserByEmail(req.query.id))).uid, //req.params.id, 
        content: req.query.content,
        createdAt: new Date().getTime(), 
    }
    if (req.query.id){
        const chatRef = chat.doc(req.query.chatId)
        return chatRef.get().then((response) => {
            chatRef.update('messages',[...response.data().messages, data])
            return true 
        })
    }
    return false;
}) 
app.get('/loadMessage', (req, res) => {
    const chatRef = chat.doc(req.query.chatId);
    chatRef.get()
    .then((response) => { 
        const limit = response.data().messages.filter((value,index) => {
            return index < req.query.limit ? req.query.limit : 20;
        })
        console.log(limit)
        return true
    })
    .catch((error)=>{
        res.send(error)
    })
    return false;
})
module.exports = app; 