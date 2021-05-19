/* Goal of this server is to listen to token requests by the users and provide them a voting token*/

//Function to see how to get data from firebase its kinda hard bro ngl 
async function read(db)
{
  snapshot = await db.collection('Elections').get();  //firebase. firestore. QueryDocumentSnapshot < T >
  array = snapshot.docs.map (doc => doc= doc.data().Name); // the Array of documents access with data method
  array = array.filter( val => val === 'T_T') 
  
}

function mergipls(db)
{
  snapshot =db.collection('Elections').get();  //firebase. firestore. QueryDocumentSnapshot < T >
  array = snapshot.docs.map (doc => doc= doc.data().Name); // the Array of documents access with data method
  array = array.filter( val => val === 'T_T') 
  return array[0];
}

const express = require('express');
const admin = require('firebase-admin');
const token = require('./encryption.js');
var bodyParser = require('body-parser');
const { firestore } = require('firebase-admin');
var app = express();

app.use(bodyParser.json());

const PORT = 5000| process.env.PORT; // server PORT

var serviceAccount= {
  "type": "service_account",
  "project_id": "e-voter-d06bb",
  "private_key_id": "bd908460b397278188e69a1636782f210687e0bc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCT8Gs5oz2vnK6e\nglGSVB56PRElICm8Bam02gCf9xX5Hr/tG6aVYN7SPWozpSGqIiYkJ7fmDpxQDay1\nbxZcnlatl1CFP0UINckJ+fsJj/hnXRjzB6BsFi9eUTjWi/HQHpIwN3F30uByCpdx\nzs8VGPHXcTYH3V/j98NsrDpkDSq6rNpiLjyrGN0yWFYX+bLUHhODG0Hays1s1wVU\nFIfoo9uMsvoWtBVg1Ic6iG3DCfn0VZOkBQeIRXh+1g0TOLAV11UKifS3SHCt8L7X\nrvvADBdBIL7ODhhcRQPNNE/eLUcJk99qXzvg/68FfDFnSFXwnLSYTL69s+rtfQI5\nD9VN+L4rAgMBAAECggEAAR/54L/8rxd/kxWl7c6VRhQCy7J5PsRtluzKxmydjn23\nszjbmmqDJzwaUPbiJlCzfjY4cBe6WTgmu7Zy3WoYJKJwP/h225TKc434D7Q4N6j9\n5eiFRW0hwmjXCCKbncaDEWTKiGu3vduWF+JyW/8K5RAnpgWpPgAwoeSUCRYPNh4p\nZercL1sfYM0hbpVRC2kHHtQe7SxOmDrlSoGC2l9Woou0ZRWrRgiPBbacWt8QbVXH\nZLthH59gj7HsmalNfQMiHrIcjFP32eqFGSvePdKkJTb3n40H0TFve8i4NAkYNDRe\nPe7Mmj2TRqQKU0mVrV4oS4WL3zu08Gu2GYKnA7xNIQKBgQDLNCjMF777vDISesqo\nW0HJjx/BQxCWTxdts7DlrNIQi5gcLBSZY0KsjfUTIepfpm0942EV/g/saFGgffws\nMgt4PlooxJNSVBRI6luc1fhdNtG2PAT2pGHu621F2raFsgQgnLgi1fZcLuC4pcLw\n1p6Pt5VExYltFldbWs2DdVx2ewKBgQC6YGdVwGZYrpFWxLKSO4Uy6OY5NPmFcDRH\nn6J2+GzCVKpk9bh448yPXHQnWlu5m19QLoUx7JWwLpVlbsIA5xKv2Zh3/Ldsfqhl\npZgq2H/3Eye7ayvgBPw/lBpEXC7iPLnPxcExgngFKCAG4smQyp+fejoZgTN6hXmi\nIYLy89igEQKBgCekIEVYaJCRcS87tydKzjW07xvzqlu4SDjFckAMC9rgcKcmTkpy\nG8Kv2tyFpEROokcNgZYZvx9+ZlYp3bT9elFV0J7dYmQQNPjYh1C8STxeAmFLqig3\nf0dttB6JgUvpo3Z9PErHdM0c9AfxhmsXY01kIgGNi7a1Qgt3VlpL3eLbAoGAJpUU\nb0UQKuWggsTfbrRRo7NhDZCw4vXSbM1YNabB5Qzf5VyU3rnRvA/Yn9jtyiOm/JNU\n0Xv3lOxf0wq1sLglPzAdhyFS22vw8nHwaVY+T2iwvfS2tX5ytbq0IViv//ewQ5nd\nn6ExtWeUEbjbH1VC7CHCa0s62+9LucuULzVZr/ECgYB4J0FEMeACW5PsVyxNcdQv\nZMLTxLYVxpwonGNMRQO2+SVGmg6jSCPYwP7lKR2VQFCZy5dEhOKLBc0Vif6Gi8F6\n2AeyOH4kC0McC9z/sn8KiOcrzsj8h6x5vQnt0ZqRKhVmh0650sr9zEhWXSs8nF6M\nZqFhEBg4qVaOIGm2wImtZg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-b8iyx@e-voter-d06bb.iam.gserviceaccount.com",
  "client_id": "111701631825907006591",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b8iyx%40e-voter-d06bb.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-voter-d06bb-default-rtdb.europe-west1.firebasedatabase.app"
});

app.get('/GenerateToken', (req, res) => { 
    var obj = req.query.msg
    console.log(obj)
    res.json({
       token : token.encodeT(obj)
    });
});

app.get('/DecodeToken',(req,res) => {
    var decoded = req.body
    decoded= token.decodeT(decoded.msg);
    res.json(decoded);
});

app.get('/OneTimeVote',(req,res) =>{
   // checks if the user already voted on a certain election 
    var db = admin.firestore();
    var email = req.query.mail;
    var election = req.query.election;
    
    var isVoted= db.collection('VoteRegister').get()
    .then((arr) => arr.docs.map(doc => doc=doc.data()))
    .then((arr) => arr.filter(val => val.election === election))
    .then((arr) => arr.some((val) => {
      x = req.query.mail;
      y = token.decodeT(val.token);

      if(x === y)
        return true
        
    }))
    
    const result = async () => {
      var a = await isVoted;
      res.send(a);
    };

    result();
    

});

app.get('/InsertToken/',(req,res) =>{
  
  
  var vot = 
  {
    election:req.query.election,
    token:token.encodeT(req.query.mail)
  }
  
  //console.log("In interior la insert token ",vot)
  var ceva = admin.firestore().collection('VoteRegister').doc().set(vot);

  res.send("Voted Succesfully");
})

app.get('/increment',(req,res) =>{
  var db = admin.firestore();

  var election = req.query.election
  var candidate = req.query.candidate

  //console.log(election + ' ' + candidate)

  var firestore_pathing = 'Elections/' + election + '/Candidates'  
  //console.log(firestore_pathing);

  var incrVote = db.collection(firestore_pathing).get()
    .then((arr) => arr.forEach(doc => {
      
      if(doc.id === candidate)
      { 
        value = doc.data().votenr + 1
        
        res = {
          votenr:value
        }

        var ceva = admin.firestore().collection(firestore_pathing).doc(candidate).update(res)
      }
      

    }));
   

  res.send()

});

app.listen(PORT,
  () => console.log(`Server started on port ${PORT}`));