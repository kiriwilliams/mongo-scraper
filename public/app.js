// Grab the articles as a json
console.log("running app.js");




// Whenever someone clicks a button
$(document).on("click", ".modalToggler", function() {
  // Save the id from the button
  let thisId = $(this).attr("data-id");
  let modalId = $(this).attr("data-target");
  $(modalId).modal("show");

  console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(data => {

      console.log(data);

    })
});

// When you click the savenote button
$(document).on("click", ".saveNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
