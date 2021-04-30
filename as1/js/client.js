"use strict";

$(document).ready(function () {
  $.ajax({
    url: "/newsfeed-update",
    dataType: "html",
    type: "GET",
    data: { format: "html-list" },
    success: function (data) {
      console.log("SUCCESS HTML:", data);
      $("#content").html(data); // display some stuff
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#p1").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },
  });
});


function buildCard(data){
    var card = document.createElement("div");
    card.className = "card";
    var cardBody = document.createElement("div");
    cardBody.className =  "card-body";
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    var cardSubTitle = document.createElement("h6");
    cardSubTitle.className = "card-subtitle mb-2 text-muted";
    var cardText = document.createElement("p");
    cardText.className = "card-text";

    // assign data.
    

    cardBody.append(cardTitle, cardSubTitle, cardText);
    card.append(cardBody);
    document.querySelector("#root").append(card);
}
