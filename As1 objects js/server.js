// REQUIRES
const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
// custom require ... a file of ours!
const lists = require('./private/data/things');

// GENERAL CONSTANTS
const msg404 = 'These are not the codes that you are looking for.';


// STATIC DIRECTORIES
app.use('/css', express.static('private/css'));
app.use('/img', express.static('private/img'));
app.use('/js', express.static('private/js'));

// APP GETS
app.get('/', function (req, res) {

    // just being silly but you can change the header response so that it
    // doesn't say Node.js, but some custom info about your app
    res.set('Server', 'Wazubi Engine');
    res.set('X-Powered-By', 'Magical Pixies');

    fs.readFile("./private/html/index.html", function (error, pgRes) {
        if (error) {
            res.writeHead(404);
            res.write(msg404);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgRes);
        }

        res.end();
    });

});

app.get('/getJSONThing', function (req, res) {


//    fs.readFile("./private/data/JSONThing.js", function (error, pgRes) {
//        if (error) {
//            res.writeHead(404);
//            res.write(msg404);
//        } else {
//            res.writeHead(200, { 'Content-Type': 'json/application' });
//            res.write(pgRes);
//        }
//        res.end();
//    });

    // set the type of response:
    res.setHeader('Content-Type', 'application/json');
    let d = new Date();

    res.send({ msg: d });

});

app.get('/ajax-GET', function (req, res) {

    // set the type of response:
    // MIME type (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
    res.setHeader('Content-Type', 'application/json');
    let d = new Date();

    res.send({ msg: d });

});

app.get('/ajax-GET-list', function (req, res) {

    //res.setHeader('Content-Type', 'application/json');
    //console.log(req.query['format']);
    let formatOfResponse = req.query['format'];
    let dataList = null;

    if(formatOfResponse == 'html-list') {

        res.setHeader('Content-Type', 'text/html');
        dataList = lists.getHTML();
        res.send(dataList);

    } else if(formatOfResponse == 'json-list') {

        res.setHeader('Content-Type', 'application/json');
        dataList = lists.getJSON();
        res.send(dataList);

    } else if(formatOfResponse == 'getJSONCourses') {
        res.setHeader('Content-Type', 'application/json');
        dataList = lists.getJSONCourses();
        res.send(dataList);

    }else {
        res.send({msg: 'Wrong format!'});
    }
});

// APP POSTS
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Notice that this is a 'POST'
app.post('/post-form', function (req, res) {
      res.setHeader('Content-Type', 'application/json');

      console.log("Stuff sent to server", req.body);

      res.send(["You sent me:", req.body]);

});

app.use(function (req, res, next) {
  res.status(404).send(msg404);
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
