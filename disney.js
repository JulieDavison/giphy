// Key
var APIKey = "ajz5pnllJ9wR0I3K3m5mpK1chLSm4JJe";
// Character Buttons
var character = ["Minnie Mouse", "Mickey Mouse", "Goofy", "Bambi", "Happy", "Grumpy", "Tigger", "Piglet", "Ariel", "Sebastian"];

function makeButton() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#character-view").empty();

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
        $("#character-view").append(a);
    }


    // This function handles events where one button is clicked
    $("#add-character").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var character = $("#character-input").val().trim();

        // Adding the movie from the textbox to our array
        character.push(character);

        // Calling renderButtons which handles the processing of our movie array
        makeButton();

    });
}


$("#find-character").on("click", function (event) {

    //     // event.preventDefault() can be used to prevent an event's default behavior.
    //     // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    //     // Here we grab the text from the input box
    var character = $("#character-input").val();

    //     // Here we construct our URL
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + APIKey + "&tag=" + character + "&rating=G";


    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {

            // Saving the image_original_url property
            var imageUrl = response.data.image_original_url;

            // Creating and storing an image tag
            var disneyImage = $("<img>");

            // Setting the disneyImage src attribute to imageUrl
            disneyImage.attr("src", imageUrl);
            disneyImage.attr("alt", "disney image");

            // Prepending the disneyImage to the images div
            $("#images").prepend(disneyImage);

        });









    // Magically Random Disney Button

    // Event listener for our magic disney-button
    $("#disney-button").on("click", function () {

        // Storing our giphy API URL for a random cat image
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + APIKey + "&tag=disney&rating=G";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {

                // Saving the image_original_url property
                var imageUrl = response.data.image_original_url;

                // Creating and storing an image tag
                var disneyImage = $("<img>");

                // Setting the disneyImage src attribute to imageUrl
                disneyImage.attr("src", imageUrl);
                disneyImage.attr("alt", "disney image");

                // Prepending the disneyImage to the images div
                $("#images").prepend(disneyImage);

            });
    });

});