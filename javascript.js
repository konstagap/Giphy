$(document).ready(function () {
    //creating array and function that will put all elements in button and append to section on screen,
    // we give each element it data-name and id, we call function so out buttons show up on load
    var sports = ["soccer", "ice hockey", "chess", "baseball", "cyber sport",]
    function showButtons() {
        $(".buttons").html("")
        for (var i = 0; i < sports.length; i++) {
            var button = $("<button>")
            button.html(sports[i])
            //    button.attr("id", "giphyButton")
            button.attr("data-name", sports[i])
            button.attr("class","button")
            $(".buttons").append(button)
            // console.log(button.attr("data-name"))
            // $(".buttons").append($("<button>").html(sports[i]).attr("id", "giphyButton").attr("data-name", sports[i]))
        }
    }
    showButtons();
    // when we press #submitbutton we creat new var and assign value of usersearch in in, then we push it to our array
    // // we also use showbuttons function to update array with new value and add it to screen as button.
    $(document).on("click", "#submitButton", function (event) {
        if ($("#userSearch").val() == ""){
            event.preventDefault();
            return
        } else{
        event.preventDefault();
        var newSport = $("#userSearch").val();
        $("#userSearch").val("")
        sports.push(newSport)
        showButtons();
        }
        
    });
    // // all our queries in buttons, when we press button we take its dataname and use it for our ajax request.
    // //we assing dataname to var and add it to url for ajax request
    $(document).on("click", "button", function () {

        $("#addGif").empty()
        var userInput = $(this).attr("data-name")
        // console.log(userInput)
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LtSt5fhdrBCp8mAHlmkMKdduM0RTj5iC&q=" + userInput + "&limit=10&offset=0&rating=G&lang=en"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response)
            var results = response.data;
            for (i = 0; i < 10; i++) {
                var gifBox = $("<div>");
                gifBox.attr("class","float-left")
                
                var rating = $("<p>").text("Rating: " + results[i].rating);
                // console.log(rating)

            //adding many attr to image for pausing effect on gifs, as its loaded it is still 
                var image = $("<img>").attr("src", results[i].images.fixed_height_still.url)
                image.attr("data-still", results[i].images.fixed_height_still.url)
                image.attr("data-animate", results[i].images.fixed_height.url)
                image.attr("data-state", "still")
                image.attr("class", "gif")
                gifBox.append(rating)
                gifBox.append(image)
                $("#addGif").prepend(gifBox)
                // console.log(image.attr("data-state"))
            }
        })

    })
    // //gif is still by default when we click on it we check if it is still, then we turn it to animate by changing "src"
    // //to data animate attr which got link for animated gif. second click gonna return to still
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state")
        // console.log(state)
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"))
                , $(this).attr("data-state", "still")
        }
    })


});

