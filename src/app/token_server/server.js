/* Goal of this server is to listen to token requests by the users and provide them a voting token*/

var express = require('express');
var app = express();
const PORT = 5000 | process.env.PORT; // server PORT

const path= ""; // to be completed;

//when the page is accessed it does something
app.get(path, (req, res) => {
    console.log('Hello There :)');
});

app.listen(PORT,
    () => console.log(`Server started on port ${PORT}`));