"use strict";

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

var newsFeed = FixedQueue(10);

$(document).ready(function () {
  setInterval(grabItems, 1000);
});

// function to grab items every 10 seconds.
function grabItems() {
  $.ajax({
    url: "/newsfeed-update",
    dataType: "json",
    type: "GET",
    success: function (data) {
      //console.log("SUCCESS JSON:", data);

      newsFeed.unshift(data);
      //console.log(newsFeed);
      document.querySelector("#root").innerHTML = "";
      for (let x = 0; x < newsFeed.length; x++) {
        // console.log(newsFeed.size, "thid is the size", newsFeed.length, "this is the length");
        buildCard(newsFeed[x]._title, newsFeed[x]._nDate, newsFeed[x]._bText);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#root").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },
  });
}

// takes 3 pieces of data: title, subtitle and body text.
function buildCard(dataTitle, dataSubTitle, dataBodyText) {
  var card = document.createElement("div");
  card.className = "card";
  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  var cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  var cardSubTitle = document.createElement("h6");
  cardSubTitle.className = "card-subtitle mb-2 text-muted";
  var cardText = document.createElement("p");
  cardText.className = "card-text";

  // assign data.
  cardTitle.innerHTML = dataTitle;
  cardSubTitle.innerHTML = dataSubTitle;
  cardText.innerHTML = dataBodyText;

  cardBody.append(cardTitle, cardSubTitle, cardText);
  card.append(cardBody);
  document.querySelector("#root").append(card);
}

// Unused sorting algorithm by date.
function oldestDate() {
  if (newsFeed.length === 10) {
    // remove the oldest
    let oldest = newsFeed[0]._nDate;
    let index = 0;
    for (var i = 0; i < newsFeed.length; i++) {
      //console.log(newsFeed[i]._nDate);
      if (newsFeed[i]._nDate < oldest) {
        oldest = newsFeed[i]._nDate;
        index = i;
      }
    }
    // Then remove the oldest by index
    console.log(
      "index of olderst:",
      index,
      "\nthis is the oldest:",
      newsFeed[index]._nDate,
      "this is the new data",
      data._nDate
    );
    newsFeed.splice(index, index);
  }
}
