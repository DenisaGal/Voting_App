/* Goal of this server is to listen to token requests by the users and provide them a voting token*/

//Function to see how to get data from firebase its kinda hard bro ngl 
// async function read(db)
// {
//   snapshot = await db.collection('Elections').get();  //firebase. firestore. QueryDocumentSnapshot < T >
//   array = snapshot.docs.map (doc => doc= doc.data().Name); // the Array of documents access with data method
//   array = array.filter( val => val === 'T_T'); 
//   console.log(array[0]);
// }

var express = require('express');
const admin = require('firebase-admin');
var app = express();
const PORT = 5000 | process.env.PORT; // server PORT


var serviceAccount = require("./e-voter-d06bb-firebase-adminsdk-b8iyx-bd908460b3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-voter-d06bb-default-rtdb.europe-west1.firebasedatabase.app"
});

var db = admin.firestore();
//read(db);

const path= ""; // to be completed;

//when the page is accessed it does something
app.get(path, (req, res) => {
    console.log('Hello There :)');
});

app.listen(PORT,
    () => console.log(`Server started on port ${PORT}`));