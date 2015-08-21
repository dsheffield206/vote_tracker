### Code Fellows Week 3 Assignment - Kitten Vote Tracker

#### Kitten Vote Tracker - Summary
+ This project creates a website where users will vote on which kitten they like best.
+ Once a user has voted in the initial game or battle, the webpage will render a doughnut chart to show the results of the game.
+ Next, the Vote Tracker will prompt the user to vote again on a brand new kitten contest or battle.
+ This Vote Tracker works asynchronusly, and can go on forever, but will stop while it's waiting for the user to vote on the next battle or contest.
+ In this project, we are learning to incorporate jQuery, AJAX API calls to an external data base, using JSON notation, we are also creating a data Array to store the path to the images from the external source, as well as the vote tally, and we are learning to use Chart.js to show our results.


#### JS Functionality:
+ This is program estimates provides a head-to-head kitten contest. The user votes on which kitten image they like best.
+ The program uses object contructors and prototypes and their methods to create the functionality of the battle or contest.
+ This prorgram incorporates Chart.js to render the results of each battle or contest.
+ This program also uses AJAX API calls to an external database on Imgur, using JSON, which is where the 14 kitten images live.
+ This program uses Event Listeners to wait for the user input (asynchronous) when they click on an image for the winner and then to render the next battle or contest.
+ Finally, we are appending our array of Kitten data, which will keep track of the path (or URL) of each kitten image and the number of their votes.
+ My original program had all the above functionality, except that it incremented the votes incorrectly and added the value of [i] vs. incrementing the votes by 1. After 2 days of trying to fix the issue, professor Sam Hamm, sent me the GitHut repo for Ryan Sobol (copywright 2015) and suggested that I use his code; so, this program now deploy's Ryan Sobol's app.js.


### CSS & HTML:
+ This program uses [Dave Gamache's Skeleton V2.0.4 Syling](http:www.getskeleton.com/)
+ This prorgram uses [Adobe Color Palette - Ocean Sunset](https://color.adobe.com/Ocean-Sunset-color-theme-46355/)
+ Other complimentary colors from Adobe include:
1. #000000 - Black
