const express = require('express');
const app     = express();
const admin   = require('./admin');
const PORT = process.env.PORT || 3000;

// used to serve static files from public directory (login.html)
app.use(express.static('public'));

app.get('/', (req, res) => res.send("navigate to localhost:3000/login.html!"));

app.get('/open', (req,res) => res.send('Open Route!'));

// verify token at the root route
app.get('/auth', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);
    //check, did they pass us the token?
    //if not, do a 401 error
    if (!idToken) {
      res.status(401).send();
      return
    } 
    //check if verify id token was successful
    //if not, do 401

    //verify token, is this token valid?
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Success!');
        }).catch(function(error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");
        });
})

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})
