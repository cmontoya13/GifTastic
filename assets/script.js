$(document).ready(function() {

	var eighties = ["Alf", "Miami Vice", "MTV", "Jeff Spicoli", "Breakfast Club", "Big Hair", "Flock of Seagulls"];
	var i;

	function renderButtons() {
	    $("#buttons").empty();
	    // Loops through the array of topics
	    for (var i=0; i<eighties.length; i++) {
	      	var btn = $("<button>");	          	
	      	btn.addClass("topicBtns"); // Adds a class of topicBtns to our button       	
	      	btn.attr("data-name", eighties[i]); // Added a data-attribute	          	
	      	btn.text(eighties[i]); // Displays the initial button text	          	
	      	$("#buttons").append(btn); // Added the button to the buttons div
	    }

	    // event listener on topic buttons
		$(".topicBtns").on("click", function() {
			$("section").empty(); // Clear previous images
			var topicBtn = $(this).attr("data-name"); // Capture the data-name value from clicked button
			var APIkey = "&api_key=dc6zaTOxFJmzC";
		    var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + topicBtn + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";

		    // AJAX call for the specific topic button being clicked
		    $.ajax({
		      url: queryURL,
		      method: "GET"
		    }).done(function(response) {
console.log(response);
		    	// Loop to append img elements and attributes			    	
				for (i=0; i<response.data.length; i++) {
			    	var imgBox = $("<div>");
			    	imgBox.addClass("imgBoxes");
			    	var imgRating = $("<p>");			    	
			    	imgRating.addClass("imgHeading");
			    	imgRating.append("Rating: " + response.data[i].rating);
			    	var image = $("<img>");
			    	// Create attribute with several options for still and animated
					image.attr({
						"src": response.data[i].images.original_still.url,
						"data-animate": response.data[i].images.original.url,
						"data-still": response.data[i].images.original_still.url,
						"data-state": "still"
					});
					// Append elements Rating and Image elements to <div> holder
			      	$(imgBox).append(imgRating);
			      	$(imgBox).append(image);
			      	$("section").append(imgBox);
		      	}

		      	// Image click to toggle between animated and still images
				$("img").on("click", function() {
					var state = $(this).attr("data-state");
					if (state != "animating") {
						$(this).attr("src", $(this).attr("data-animate"));
						$(this).attr("data-state", "animating");
					}
					else {
						$(this).attr("src", $(this).attr("data-still"));
						$(this).attr("data-state", "still");
					}
				});
		  	});
		});
	}

	// User input form submit
	$("#rad").on("click", function() {			
		event.preventDefault(); // Prevent form submission			
		var newTopic = $("#userInput").val().trim(); // Capture value of user input		
		eighties.push(newTopic); // Place value into the eighties array
		$("#userInput").val(""); // Clear the input field						
		renderButtons(); // Call function to re-render buttons
	});	    

	// Reset button to clear all images
	$("#reset").on("click", function() {
		$("section").empty();
	});

	renderButtons(); // Place buttons on page when document ready
});