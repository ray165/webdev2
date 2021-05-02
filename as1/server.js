"use strict";
// REQUIRES
const express = require("express");
const app = express();
const fs = require("fs");
// custom require ... a file of ours!
const { strict } = require("assert");

app.use('/js', express.static('js'));

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
array.push(new News("Parlor Boys", "Cant find some love"));
array.push(new News("Parlor Girls", "Apple Juice"));
array.push(new News("Parlor Boys", "What is love"));
array.push(new News("Parlor Boys", "Baby dont hurt me"));
array.push(new News("Parlor Boys", "No  more"));
array.push(new News("Parlor Girls", "What is love"));
array.push(new News("Parlor Boys", "Cant find some love"));
array.push(new News("Parlor Girls", "Apple Juice"));
array.push(new News("Parlor Boys", "What is love"));
array.push( new News("Parlor Boys", "Baby dont hurt me"));
array.push( new News("Parlor Boys", "No  more"));
array.push( new News("Parlor Girls", "What is love"));
array.push( new News("Parlor Boys", "Cant find some love"));
array.push( new News("Parlor Girls", "Apple Juice"));
array.push( new News("Parlor Boys", "What is love"));
array.push( new News("Parlor Boys", "Baby dont hurt me"));
array.push( new News("Parlor Boys", "No  more"));
array.push( new News("Parlor Girls", "What is love"));
array.push( new News("Parlor Boys", "Cant find some love"));
array.push( new News("Parlor Girls", "Apple Juice"));
array.push( new News("Parlor Boys", "What is love"));
array.push( new News("Parlor Boys", "Baby dont hurt me"));
array.push( new News("Parlor Boys", "No  more"));
array.push( new News("Parlor Girls", "What is love"));
array.push( new News("Parlor Girls", "Apple Juice"));
array.push( new News("Parlor Boys", "What is love"));
array.push( new News("Parlor Boys", "Baby dont hurt me"));
array.push( new News("Parlor Boys", "No  more"));
array.push( new News("Parlor Girls", "What is love"));
array.push( new News("Parlor Girls", "What is love"));
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
console.log(data, array[randomNumber()], data2);

// APP GETS
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/newsfeed-update", function (req, res) {
  // set the type of response:
  // MIME type (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
  res.setHeader("Content-Type", "application/json");

  res.send(data2);
});

app.use(function (req, res, next) {
  res.status(404).send(msg404);
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Glorious app listening on port " + port + "!");
});

// Create a constructor for the fixed-length queue. This is
// really more of a FACTORY than a construtor since an
// entirely tangential object is returned.
function FixedQueue(size, initialValues) {
  // If there are no initial arguments, default it to
  // an empty value so we can call the constructor in
  // a uniform way.
  initialValues = initialValues || [];

  // Create the fixed queue array value.
  var queue = Array.apply(null, initialValues);

  // Store the fixed size in the queue.
  queue.fixedSize = size;

  // Add the class methods to the queue. Some of these have
  // to override the native Array methods in order to make
  // sure the queue lenght is maintained.
  queue.push = FixedQueue.push;
  queue.splice = FixedQueue.splice;
  queue.unshift = FixedQueue.unshift;

  // Trim any initial excess from the queue.
  FixedQueue.trimTail.call(queue);

  // Return the new queue.
  return queue;
}

// I trim the queue down to the appropriate size, removing
// items from the beginning of the internal array.
FixedQueue.trimHead = function () {
  // Check to see if any trimming needs to be performed.
  if (this.length <= this.fixedSize) {
    // No trimming, return out.
    return;
  }

  // Trim whatever is beyond the fixed size.
  Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
};

// I trim the queue down to the appropriate size, removing
// items from the end of the internal array.
FixedQueue.trimTail = function () {
  // Check to see if any trimming needs to be performed.
  if (this.length <= this.fixedSize) {
    // No trimming, return out.
    return;
  }

  // Trim whatever is beyond the fixed size.
  Array.prototype.splice.call(
    this,
    this.fixedSize,
    this.length - this.fixedSize
  );
};

// I synthesize wrapper methods that call the native Array
// methods followed by a trimming method.
FixedQueue.wrapMethod = function (methodName, trimMethod) {
  // Create a wrapper that calls the given method.
  var wrapper = function () {
    // Get the native Array method.
    var method = Array.prototype[methodName];

    // Call the native method first.
    var result = method.apply(this, arguments);

    // Trim the queue now that it's been augmented.
    trimMethod.call(this);

    // Return the original value.
    return result;
  };

  // Return the wrapper method.
  return wrapper;
};

// Wrap the native methods.
FixedQueue.push = FixedQueue.wrapMethod("push", FixedQueue.trimHead);

FixedQueue.splice = FixedQueue.wrapMethod("splice", FixedQueue.trimTail);

FixedQueue.unshift = FixedQueue.wrapMethod("unshift", FixedQueue.trimTail);


function randomDate(begin, end) {
    return new Date(begin.getTime() + Math.random() * (end.getTime() - begin.getTime()));
}

function randomNumber(){
  return Math.floor((Math.random() * 31));
}
