$(document).ready(function(){
//console.log("am I connected");

var fruitArray = ["blueberries", "strawberries", "peaches", "apples", 
		"rasberries", "mangos", "bananas", "pears", "plums"];

		// This .on("click") function will trigger the AJAX Call
		$('#findFruit').on('click', function(){
		

		// Here we grab the text from the input box 
		var fruitBasket = $('#fruit-input').val().trim();

		// Here we assemble our URL 
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
		fruitBasket + "&api_key=dc6zaTOxFJmzC";

		//------
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(queryURL);
			console.log(response);
		});
		return false;
		
	}); //end findFruit Click

		function makeButtons(){
			$('#fruitView').empty();
			console.log("button");
		for (var i = 0; i < fruitArray.length; i++){
			var a = $('<button>')
			//add class
			a.addClass('fruit');
			//add data attribute  
		    a.attr('data-name', fruitArray[i]);
		    //initial button text 
		    a.text(fruitArray[i]); 
		    //added button into HTML
		    $('#fruitView').append(a); 
		    console.log("made a button");
			}
		};
		//function to handle events where one button is clicked
		$('#findFruit').on('click', function(){

		//grab the input from the textbox
		var fruit = $('#fruit-input').val().trim();

		// fruit from the textbox is then added to our array
		fruitArray.push(fruit);
		
		// Our array then runs; handles the processing of fruit array
		makeButtons();
		return false;
	})
		makeButtons();
	//function triggered by user click; AJAX call to giphy API
	
	$('button').on('click', function(){
	//date-name attribute is inserted in 'name'
    var fruitGif = $(this).data('name'); 
    //Giphy API call
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fruitGif + "&api_key=dc6zaTOxFJmzC";
    //using 'GET' method
    $.ajax({url: queryURL, method: 'GET'})
    //waits for response before function runs
     	.done(function(response) {
        var results = response.data;

        for (var i=0; i < results.length; i++) {
        	var gifImage = $("<img>");
        	gifImage.attr("src", results[i].images.fixed_height.url);
            console.log(results[i].images.fixed_height.url);
            console.log("hi");
			
			var fruitGifDiv = $('<div class="item">')

                var rating = results[i].rating;

                var p = $('<p>').text( "Rating: " + rating);

                var fruitGifImage = $('<img>');
                fruitGifImage.attr('src', results[i].images.fixed_height.url);
                //create attributes for animated and still gifs
                fruitGifDiv.append(p);
                fruitGifDiv.append(fruitGifImage);

                $('#gifsAppearHere').prepend(fruitGifDiv);
            }
            
         })
         })
    }); //end document ready
