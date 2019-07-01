// Key
var APIKey = "ajz5pnllJ9wR0I3K3m5mpK1chLSm4JJe";
// Character Buttons
var character = ["Minnie Mouse", "Mickey Mouse", "Snow White", "Bambi", "Tinkerbell", "Peter Pan", "Tigger", "Piglet", "Ariel", "Sebastian"];

makeButton ();

function makeButton() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#newCharacterButton").empty();

    // Looping through the array of movies
    for (var i = 0; i < character.length; i++) {

        // Then dynamicaly generating buttons for each character in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of character to our button
        a.addClass("character");
        // Adding a data-attribute
        a.attr("data-name", character[i]);
        // Providing the initial button text
        a.text(character[i]);
        // Adding the button to the HTML
        $("#newCharacterButton").append(a);
        
    }

    $(".character").on("click", function
        () {
            //This returns the same string that is the text of the button
            var character = $(this).attr('data-name');
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + character + "&rating=G&limit=9";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
        
                // After the data from the AJAX request comes back
                .then(function (response) {
                    console.log(response);
                    $('#images').empty();
                    for (var i = 0; i < response.data.length; i++){
                        var rating = response.data[i].rating; 
                        var stillLink = response.data[i].images.fixed_height_still.url;
                        var gifLink = response.data[i].images.fixed_height.url;
                        // // Creating and storing an image tag
                        var container = $('<div>');
                        var pEl = $('<p>').text("rating: " + rating);
                        var disneyImage = $("<img>")
                                        .attr("src", stillLink)
                                        .attr("data-still", stillLink)
                                        .attr("data-gif", gifLink)
                                        .attr("data-state", 'still')
                                        .attr("alt", "disney image")
                                        .addClass('img-click');
                         
                        var html = container.append(pEl).append(disneyImage);
                        // // Prepending the disneyImage to the images div
                         $("#images").prepend(html);
                    }
                    
               
        
        
                });

    });
}


$("#find-character").on("click", function (event) {
    event.preventDefault();
    var buttonName = $('#character-input').val();
    character.push(buttonName);
    makeButton();
});




    // Pausing gifs
    $(document).on("click", ".img-click", function () {
        console.log('i work')
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-gif"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });







    





