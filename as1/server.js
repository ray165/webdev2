(function () {
  'use strict';
  // this function is strict...
}());
// REQUIRES
const express = require("express");
const app = express();
const fs = require("fs");
// custom require ... a file of ours!
const { strict } = require("assert");

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));

// GENERAL CONSTANTS
const msg404 = "Can I say something to you?";

class News {
    constructor(inputTitle, text) {
        this._title = inputTitle;
        this._bText = text;
        this._nDate = randomDate(new Date(2021, 1, 1), new Date());
    }

    get title() {
        return this._title;
    }

    get bText() {
        return this._bText;
    }

    get nDate() {
        return this._nDate;
    }

    toString() {
        return this._title + " " + this._bText + " " + this._nDate;
    }
}


var array = [];

// obj delcarations ! ---------- 
//#region 
array.push(new News("Maroon 5, Cardi B", "Girls Like You (feat. Cardi B)"));
array.push(new News("Ariana Grande", "God is a woman"));
array.push(new News("ZAYN, Taylor Swift", "I Don’t Wanna Live Forever (Fifty Shades Darker)"));
array.push(new News("Taylor Swift", "Starving"));
array.push(new News("Hailee Steinfeld, Grey", "No  more"));
array.push(new News("Jennifer Lopez, Pitbull", "On The Floor"));
array.push(new News("Gotye, Kimbra", "Somebody That I Used To Know"));
array.push(new News("Selena Gomez & The Scene", "Love You Like A Love Song"));
array.push(new News("ZAYN", "PILLOWTALK "));
array.push( new News("The Vamps, Matoma", "All Night"));
array.push( new News("Maroon 5, SZA", "No  more"));
array.push( new News("Meghan Trainor, John Legend", "Like Im Gonna Lose You"));
array.push( new News("Billie Eilish", "ocean eyes"));
array.push( new News("Selena Gomez, Marshmello", "Wolves"));
array.push( new News("Katy Perry", "Last Friday Night (T.G.I.F.)"));
array.push( new News("Rachel Platten", "Fight Song"));
array.push( new News("Dua Lipa", "No  more"));
array.push( new News("5 Seconds of Summer", "She Looks So Perfect"));
array.push( new News("Conversations in the Dark", "John Legend"));
array.push( new News("Anne Murray", "You Needed Me"));
array.push( new News("Anne-Marie", "Problems "));
array.push( new News("Marty Wilde", "Donna "));
array.push( new News("Lady Gaga", "Always Remember Us This Way"));
array.push( new News("Jessie J, B.o.B", "Price Tag"));
array.push( new News("Josh Gad", "In Summer - From Frozen/Soundtrack Version"));
array.push( new News("Parry Gripp", "Narwhal Eating a Bagel"));
array.push( new News("Adam Jacobs, Courtney Reed", "A Whole New World"));
array.push( new News("Anika Noni Rose", "Down In New Orleans"));
array.push( new News("Glee Cast", "Loser Like Me (Glee Cast Version)"));
array.push( new News("DCappella", "Friend Like Me"));
array.push( new News("Linkin Park", "Bleed It Out!"));
//#endregion


console.log("running");
// data to be initially sent.
var data = {
  "1": JSON.stringify(array[randomNumber()]), 
  "2": JSON.stringify(array[randomNumber()]),
  "3": JSON.stringify(array[randomNumber()]),
  "4": JSON.stringify(array[randomNumber()]),
  "5": JSON.stringify(array[randomNumber()]),
  "6": JSON.stringify(array[randomNumber()]),
  "7": JSON.stringify(array[randomNumber()]),
  "8": JSON.stringify(array[randomNumber()]),
  "9": JSON.stringify(array[randomNumber()]),
  "10": JSON.stringify(array[randomNumber()])
};

var data2 = {
  "1": array[randomNumber()], 
  "2": array[randomNumber()],
  "3": array[randomNumber()],
  "4": array[randomNumber()],
  "5": array[randomNumber()],
  "6": array[randomNumber()],
  "7": array[randomNumber()],
  "8": array[randomNumber()],
  "9":array[randomNumber()],
  "10": array[randomNumber()]
};
// console.log(data, array[randomNumber()], data2);

// APP GETS
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/newsfeed-update", function (req, res) {
  // set the type of response:
  // MIME type (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
  res.setHeader("Content-Type", "application/json");

  // res.send(data2);
  res.send(array[randomNumber()]);
});

app.use(function (req, res, next) {
  res.status(404).send(msg404);
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Glorious app listening on port " + port + "!");
});


function randomDate(begin, end) {
    return new Date(begin.getTime() + Math.random() * (end.getTime() - begin.getTime()));
}

function randomNumber(){
  return Math.floor((Math.random() * 31));
}
