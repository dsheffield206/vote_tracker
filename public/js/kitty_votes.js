// Hot or Not Kitty Battle for Code Fellows Bootcamp Week 3 Project

'use strict';

$(document).ready(function() {

// Photo Constructor
var Photo = function(path) {
	this.path = path;
	this.votes = 1;
};

var photo1 = new Photo('img/kittens/01.jpg');
var photo2 = new Photo('img/kittens/02.jpg');
var photo3 = new Photo('img/kittens/03.jpg');
var photo4 = new Photo('img/kittens/04.jpg');
var photo5 = new Photo('img/kittens/05.jpg');
var photo6 = new Photo('img/kittens/06.jpg');
var photo7 = new Photo('img/kittens/07.jpg');
var photo8 = new Photo('img/kittens/08.jpg');
var photo9 = new Photo('img/kittens/09.jpg');
var photo10 = new Photo('img/kittens/10.jpg');
var photo11 = new Photo('img/kittens/11.jpg');
var photo12 = new Photo('img/kittens/12.jpg');
var photo13 = new Photo('img/kittens/13.jpg');
var photo14 = new Photo('img/kittens/14.jpg');

// this array whilel hold all the Photo objects
var photoArray = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14];
// for(var i = 0; i < 14; i++) {

// Photo Tracker Constructor
var Tracker = function( ) {
	// Do we need any more variables?
};

var trackVote = new Tracker();

// Generate a random number to select an images from photoArray
Tracker.prototype.getRandomInt = function(numPhotos) {
  return Math.floor(Math.random() * numPhotos);
};
console.log(trackVote.getRandomInt(14));

Tracker.prototype.pickRandomPhoto = function () {
	console.log(this.getRandomInt(photoArray.length));
	return this.getRandomInt(photoArray.length);
};

Tracker.prototype.displayPhotos = function () {
	// display the random photos... accessing the photoArray[ ]
	var random = this.pickRandomPhoto();
	var photo = '<img src="' + photoArray[random].path + '"/>';
	return photo;
};

Tracker.prototype.photoCompare = function (){
	var photoL = this.displayPhotos();
	var photoR = this.displayPhotos();
	while(photoL == photoR){
		console.log ("photos are the same");
		var photoR = this.displayPhotos();
	}
	$('#photoL').html(photoL);
	$('#photoR').html(photoR);
};

Tracker.prototype.receiveVote = function(){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');

	photoL.addEventListener('click', function(e){
		console.log(e.target.src);
		trackVote.addVote(e.target.src);
		trackVote.kittyWin();
		console.log(photoArray);
	});

	photoR.addEventListener('click', function(e){
		console.log(e.target.src);
		trackVote.addVote(e.target.src);
		trackVote.kittyWin();
		console.log(photoArray);
	});
};

Tracker.prototype.addVote = function(select){
	var url = select.slice(46, 100);
	for(var i=0; i < photoArray.length; i++){
		if(url === photoArray[i].path){
			photoArray[i].votes += 1;
			console.log(photoArray[i].votes);
			return;
			}
		}
};
var vts;

Tracker.prototype.makeChart = function(){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');
	var pathL = photoL.childNodes[0].attributes[0].value;
	var pathR = photoR.childNodes[0].attributes[0].value;
	vts = this.getVotes(pathL, pathR);
	console.dir(photoL);
	console.log(photoL.childNodes[0].attributes[0].value);

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

$('#nextButton').on('click', function(e) {
	trackVote.waitVote(e);
});

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

trackVote.displayPhotos();
trackVote.waitVote();


});
