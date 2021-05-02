// https://expressjs.com/en/guide/routing.html

// REQUIRES
const express = require('express');
const fs = require('fs');
const app = express();


app.get('/', function (req, res) {
    let doc = fs.readFileSync('./promises.html', "utf8");

    res.send(doc);
});


// bad practice to put this in the main file (should be in another file)
// but to keep things compact and easy to read for examples ... from:
// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
// Universally Unique Identifier (UUID)
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt /16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

app.get('/connect-to-customer-service', function (req, res) {

    // set the type of response:
    res.setHeader('Content-Type', 'application/json');
    let associateAvailable = Math.floor((Math.random() * 10) + 1);

    //console.log(associateAvailable);
    if(associateAvailable > 9) {

        let uuid = create_UUID();
        console.log(uuid);
        res.send({ status: "success", msg: "Associate ID is available", value: uuid });
    } else {
      res.send({ status: "failure", msg: "Please try again"});
    }


});

// for page not found (i.e., 404)
app.use(function (req, res, next) {
  res.status(404).send("<html><head><title>These aren't the codes that you're looking for.</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
