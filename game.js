var emotionsArray = ["elated", "angry", "content", "jealous", "devastated", "confused"];

addButtons();
$("#gifs-div").hide();

// Function to display already existing array members' buttons
function addButtons() {
  $("#buttons-wrapper").empty();

  for (var i = 0; i < emotionsArray.length; i++) {
      var addButton = $("<button>");
      addButton.addClass("btn btn-outline-warning btn-lg click-for-gifs");
      addButton.text(emotionsArray[i]);
      $("#buttons-wrapper").append(addButton);
    }
  $(".click-for-gifs").on("click", onClick);
};

// Function to handle events when submit button is clicked
$("#add-term").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $("#search-input").val().trim();
    emotionsArray.push(searchTerm);
    addButtons();
    $("#search-input").val("");
    
});


function onClick() {
  var emotion = $(this).text(); // "this" is targeting the buttons' text here
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=E6xSCaMtpVvQq8I0VrYAZps9YoFb5q9f&q=" + emotion + "&limit=10&rating=g&rating=pg";

  $("#show-gifs").empty();

  $.ajax ({ 
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#gifs-div").show();
      var gifResults = response.data;

      for (var i = 0; i < gifResults.length; i++) {

        var rating = gifResults[i].rating; // grabbing the rating for each image

        var p = $("<p>").text("Rating: " + rating); // creating a paragraph to display the rating

        var gifImage = $("<img>"); // creating image tag to add images to

        var stillUrl = gifResults[i].images.fixed_width_still.url;
        var animateUrl = gifResults[i].images.fixed_width.url;

        gifImage.attr("src", stillUrl).attr("data-state", "still").attr("data-still", stillUrl).attr("data-animate", animateUrl); 
        
        var newCol = $("<div>");
        newCol.addClass("col-md-3");

        $("#show-gifs").append(newCol);
        $(newCol).append(gifImage); 
        $(newCol).append(p);
      
        $(gifImage).on("click", function() {
          
          var state = $(this).attr("data-state");
          var stillSourceUrl = $(this).attr("data-still");
          var animateSourceUrl = $(this).attr("data-animate");

          if (state === "still") {
           
            $(this).attr("src", animateSourceUrl).attr("data-state", "animate");
          
          } else if (state === "animate") {
            
            $(this).attr("src", stillSourceUrl).attr("data-state", "still");
          
          } 
          
        });
      
      }
  
  })
};






// Functions:
// pause and play gifs when clicked on (logic required here) (activity 15 as example)
