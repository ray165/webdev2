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
