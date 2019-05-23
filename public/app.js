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
  var noteId = thisId+"noteInput";
  console.log($("#"+noteId).val().trim());
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      note: $("#"+noteId).val().trim()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#"+noteID).val("");
});
