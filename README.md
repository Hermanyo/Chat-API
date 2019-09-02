# ChatApi using Cloud Firestore and Express with Nodejs

Run below commands to clone this repository

<code> git clone https://github.com/Hermanyo/Chat-API/ </code>

For upload this API into your Firebase Functions, run below code

<code> firebase deploy --only functions:chatApi --project <your_firebase_project_name> </code>

Go to the [Firebase Console](https://console.firebase.google.com) > Functions, Copy the path like

https://us-central1-<your_firebase_project_name>.cloudfunctions.net/chatApi 

Now into your project fetch functions below using chatApi path, like this
 
In your project, use any Fetch Resource as [Node Fetch](https://github.com/bitinn/node-fetch) or [Axios](https://github.com/axios/axios).

## Example1 
Create a chatroom with sender and receiver

```js
axios.post('https://us-central1-<your_firebase_project_name>.cloudfunctions.net/chatApi/api/v1/post',
  { 
    "postMethod": "createChat",
    "users":[
      "user1",
      "user2"
    ]
  }) 
.then((response) => { 
      // do anything if the chat was successfully created
     // If the chat was created successfully, a 'Chat' collection has been created (if it does not exist) in your database
     // where    Chat.document is a generic chatId
    //  and the chatId data is your chat content
 })
 .catch((error) => {
     //do anything if chat is not created  
 })
```
 
    
## Example2
Load chats associated with user id

```js
axios.get('https://us-central1-<your_firebase_project_name>.cloudfunctions.net/chatApi/api/v1/chat/loadChat?_id=' + '2321hsyss92121982')
.then((response) => { 
      //do anything if chat is successfuly created 
 })
 .catch((error) => {
     //do anything if chat is not created  
 })
```
## Example3
Send message to specific user in specific chat
```js
axios.post('https://us-central1-<your_firebase_project_name>.cloudfunctions.net/chatApi/api/v1/post',
  {
	"postMethod": "sendMessage",
	"chatId":"YMGrCqBVtoYsb7kTA7us",
	"message":{
		"_id":"user2",
		"text":"Hey, ChatApi!",
		"createdAt":"2019-09-02T06:04:43.003Z",
		"user":{
			"_id":"ZKrwSYDdyYYe79x545TmfDqQZe52"
		}
	}
}) 
.then((response) => { 
      //do anything if chat is successfuly created 
 })
 .catch((error) => {
     //do anything if chat is not created  
 })
```
> **NOTE:** Message structure was based to [React-Native-Gifted-Chat](https://github.com/FaridSafi/react-native-gifted-chat)
  
