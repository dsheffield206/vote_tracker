// Kitty Battle Project for Code Fellows Bootcamp Week 3

'use strict';

$(document).ready(function() {

// Photo Constructor
var Photo = function(path) {
	this.path = path;
	this.votes = 1;
};

var photo1 = new Photo('imgs/kittens/01.jpg'); 
var photo2 = new Photo('imgs/kittens/02.jpg');
var photo3 = new Photo('imgs/kittens/03.jpg');
var photo4 = new Photo('imgs/kittens/04.jpg');
var photo5 = new Photo('imgs/kittens/05.jpg');
var photo6 = new Photo('imgs/kittens/06.jpg');
var photo7 = new Photo('imgs/kittens/07.jpg');
var photo8 = new Photo('imgs/kittens/08.jpg');
var photo9 = new Photo('imgs/kittens/09.jpg');
var photo10 = new Photo('imgs/kittens/10.jpg');
var photo11 = new Photo('imgs/kittens/11.jpg');
var photo12 = new Photo('imgs/kittens/12.jpg');
var photo13 = new Photo('imgs/kittens/13.jpg');
var photo14 = new Photo('imgs/kittens/14.jpg');

// this array whilel hold all the Photo objects
var photoArray = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14];
// for(var i = 0; i < 14; i++) {

// Photo Tracker Constructor
var Tracker = function( ) {
	// this.leftPhoto = leftPhoto;
	// this.rightPhoto = rightPhoto;
	// Do we need any more variables?
}

var votePhotos = new Tracker();

// Generate a random number to select an images from photoArray
Tracker.prototype.getRandomInt = function(numPhotos) {
  return Math.floor(Math.random() * numPhotos);
};
console.log(votePhotos.getRandomInt(14));

Tracker.prototype.pickRandomPhoto = function () {
	console.log(this.getRandomInt(photoArray.length));
	return this.getRandomInt(photoArray.length);
};

Tracker.prototype.displayPhotos = function () {
	// get 1st random #; get 2nd random #
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

// This highlights the winning photo when clicked
Tracker.prototype.highlight = function (){
	//highlight photo after it's clicked
};

Tracker.prototype.receiveVote = function (){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');

	photoL.addEventListener('click', function(e){
		console.dir(e.target.attributes[0].value); 
		votePhotos.addVote(e.target.attributes[0].value);
		votePhotos.makeChart();
	});

	photoR.addEventListener('click', function(e){
		console.dir(e.target.attributes[0].value); 
		votePhotos.addVote(e.target.attributes[0].value);
		votePhotos.makeChart();
	});

};

Tracker.prototype.addVote = function(select){

for(var i=0; i < photoArray.length; i++){
	if(select === photoArray[i].path){
		photoArray[i].votes++;
		console.log(photoArray[i].votes);
		return;
	}
}

};

Tracker.prototype.makeChart = function(){
	var photoL = document.getElementById('photoL');
	var photoR = document.getElementById('photoR');
	var pathL = photoL.childNodes[0].attributes[0].value;
	var pathR = photoR.childNodes[0].attributes[0].value;
	var vts = this.getVotes(pathL, pathR);
	console.dir(photoL);
	console.log(photoL.childNodes[0].attributes[0].value);

	var ctx = document.getElementById('mychart').getContext('2d');
	var mychart = new Chart(ctx).Doughnut([{value: vts.votesL, color: 'red'}, {value: vts.votesR, color: 'green'}]);
}

Tracker.prototype.getVotes = function(lPath, rPath){
	for(var i=0; i < photoArray.length; i++){
		if(photoArray[i].path === lPath) lPath = photoArray[i].votes;
		if(photoArray[i].path === rPath) rPath = photoArray[i].votes;
	}
	return {votesL: lPath, votesR: rPath};
};

votePhotos.photoCompare();
votePhotos.receiveVote();	
votePhotos.makeChart();	
//var kitten1 = document.getElementById('kitten1');
//var kitten2 = document.getElementById('kitten2');
//kitten1.innerHTML = '<img src="' + photoArray[votePhotos.getRandomInt()].path + '">';
//kitten2.innerHTML = '<img src="' + photoArray[votePhotos.getRandomInt()].path + '">';

	// some 'document.getElementById' variables to acccess and manipulate the document

});