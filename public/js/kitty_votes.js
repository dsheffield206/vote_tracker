// Hot or Not Kitty Battle for Code Fellows Bootcamp Week 3 Project

'use strict';

$(document).ready(function() {

// Photo Constructor
var Photo = function(link) {
	this.path = link;
	this.votes = 1;
};

// this global var is an array that will hold all the kitten Photo objects
var photoArray = [ ];
var imgurArray = [ ];

// incorporating AJAX and JSON into our code to 'GET' kitty pics from external source
$.ajax({
     url: 'https://api.imgur.com/3/album/DDoWy.json',
     method: 'GET',
     headers: {
          'Authorization': 'Client-ID 8d7a417fb5ee534'
     }
})
.done(function(res) {
     imgurArray = res.data.images;
     console.log(imgurArray);

      for(var i = 0; i < imgurArray.length; i++) {
          // photoArray[i].path = photoArray[i].link;
          photoArray[i] = new Photo(imgurArray[i].link);
      	}
      	console.log(photoArray);
     	trackVote.waitVote();
})
.fail(function(err) {
     console.log(err);
});

function htmlForPhoto( ) {
var rand = Math.floor(Math.random( ) * photoArray.length + 1);
     var displayPic = '<img src="' + photoArray[rand].path + '">';
     return displayPic;
}

// Photo Tracker Constructor
var Tracker = function( ) {
};

var trackVote = new Tracker();

Tracker.prototype.photoCompare = function (){
	var photoLeftHtml = htmlForPhoto();
	var photoRightHtml = htmlForPhoto();
	// console.log('photoRightHtml in photoCompare ' + photoRightHtml);
	while(photoLeftHtml == photoRightHtml){
		// console.log('photos are the same');
		var photoRightHtml = htmlForPhoto();
	}
	// console.log('photos should render next')
	$('#photoL').html(photoLeftHtml);
	$('#photoR').html(photoRightHtml);
};

Tracker.prototype.receiveVote = function(){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');

	photoL.addEventListener('click', function(e){
		console.log(e.target.src);
		// console.log('testing line 71');
		trackVote.addVote(e.target.src);
		trackVote.kittyWin();
	});

	photoR.addEventListener('click', function(e){
		console.log(e.target.src);
		trackVote.addVote(e.target.src);
		trackVote.kittyWin();
	});
};

Tracker.prototype.addVote = function(selected){
	for(var i=0; i < photoArray.length; i++){
		// console.log('selected is ' + selected + ' and is being tested against ' + photoArray[i].path);
		// console.log('if true, vote for photoArray will increase by 1');
		if(selected === photoArray[i].path){
			console.log('photoArray[i].path ' + photoArray[i].path);
			var temp = null;
			temp = photoArray[i].votes;
			console.log('the value of temp ' + temp);
			temp++;
			photoArray[i].votes = temp;
			console.log('the value of temp now ' + temp);
			console.log('here is the new vote tally for the winner ' + photoArray[i].votes);
			return;
			}
		}
};

var vts;  // using this to use votes value for hightlight winner
Tracker.prototype.makeChart = function(){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');
	var pathL = photoL.childNodes[0].attributes[0].value;
	var pathR = photoR.childNodes[0].attributes[0].value;
	vts = this.getVotes(pathL, pathR);
	// console.dir(photoL);
	// console.log(photoL.childNodes[0].attributes[0].value);

	var ctx = document.getElementById('mychart').getContext('2d');
	var mychart = new Chart(ctx).Doughnut([{value: vts.votesR, color: 'red'}, {value: vts.votesL, color: 'blue'}]);
};

Tracker.prototype.getVotes = function(lPath, rPath){
	for(var i=0; i < photoArray.length; i++){
		if(photoArray[i].path === lPath) lPath = photoArray[i].votes;
		if(photoArray[i].path === rPath) rPath = photoArray[i].votes;
	}
	return {votesL: lPath, votesR: rPath};
};

Tracker.prototype.waitVote = function(){
	console.log('waiting on user vote.');
	$('#nextButton').hide();
	$('#message').text('Pick Your Favorite Kitten! To Vote: Just Click on that Image!');
	// $('.winner').removeClass('.winner');
	trackVote.photoCompare();
	trackVote.receiveVote();
	trackVote.makeChart();
};

Tracker.prototype.kittyWin = function(){
	console.log('we have a winner!');
	trackVote.makeChart();
	trackVote.highlight();
	$('#nextButton').show();
};

// This highlights the winning photo when clicked
Tracker.prototype.highlight = function (){
	if(vts.votesL > vts.votesR){  // how can i bring in votes?
		// if Left Kitty wins
		$('#message').text('The LEFT Kitty is Hotter!');
		$('photoL').addClass('winner');
	} else if (vts.votesL < vts.votesR){ // FIX THIS
		// if Right Kitty wins
		$('#message').text('The RIGHT Kitty is Hotter!');
		$('photoR').addClass('winner');
	} else {
		// No Kitty wins
		$('#message').text('Bummer. Neither Kitty wins.');
	}
};

$('#nextButton').on('click', function() {
	trackVote.waitVote();
});



});
