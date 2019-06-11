var emotionsArray = ["happy", "mad", "surprised", "jealous", "sad", "confused"];


// Function to display GIFs
function displayGifs() {

  };


// This function handles events where one button is clicked
$("#find-gif").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $("#search-input").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=E6xSCaMtpVvQq8I0VrYAZps9YoFb5q9f&q=" + searchTerm + "&limit=10";

    $.ajax ({ 
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    })
    
    emotionsArray.push(searchTerm);
    addButtons();
    displayGifs();
    
});

// Function to add buttons based on search terms
function addButtons() {
    for (var i = 0; i < emotionsArray.length; i++) {
        var addButton = $("<button>");
        addButton.addClass("btn btn-outline-warning btn-lg");
        addButton.text(emotionsArray[i]);
        $("#buttons-wrapper").append(addButton);
      }
};
addButtons();

// Needed:
// Array of emotions (to be added to by user) X
// div to append buttons to X
// div to append gifs to X

// Functions:
// add search terms as buttons (acitivty 7 as example)
// append gifs to page (activity 13 as example)
// grab gif ratings and append/prepend the ratings to the page (activity 13 as example)
// pause and play gifs when clicked on (logic required here) (activity 15 as example)
// on click of each emotion button, show those 10 gifs again (activity 9 as example)
