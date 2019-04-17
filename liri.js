require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var Spotify = require('node-spotify-api')
var axios = require('axios')
var moment = require('moment');

// Implements Spotify keys into the liri.js file from the keys.js file
var spotify = new Spotify(keys.spotify);

// Sets variable values to process.argv[2] and process.argv[3]
var command = process.argv[2];
var value = process.argv.slice(3).join('+')

// Runs the Bands in Town API defaults to Skrillex if no values are entered
if (command === "concert-this") {
    if (!value || value === undefined) {
        value = "Skrillex"
    }
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("\nConcert Info")
            console.log("\nVenue Name: " + response.data[0].venue.name)
            console.log("\nVenue City: " + response.data[0].venue.city)
            console.log("\nNext Concert: " + moment(response.data[0].datetime).format("MM/DD/YYYY"))
            console.log("------------------------------------------------------------------------\n")
        })
}

// Runs the Spotify API and defaults to Ace of Base if undefined 
if (command === "spotify-this-song") {
    if (!value || value === undefined) {
        value = "Ace of Base"
    }

    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\nArtist Name: " + data.tracks.items[0].artists[0].name);
        console.log("\nSong Name: " + data.tracks.items[0].name);
        console.log("\nSpotify Link: " + data.tracks.items[0].artists[0].external_urls.spotify)
        console.log("\nAlbum Name: " + data.tracks.items[0].album.name);
        console.log("------------------------------------------------------------------------\n")
    });
}

// Runs the OMDB API and defaults to Mr. Nobody if undefined
if (command === "movie-this") {
    if (!value || value === undefined) {
        value = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=full&tomatoes=true&apikey=trilogy")
        .then(function (response) {
            console.log("\nMovie Data")
            console.log("\nMovie Title: " + response.data.Title)
            console.log("\nMovie Year: " + response.data.Year)
            console.log("\nMovie IMDB Rating: " + response.data.imdbRating)
            console.log("\nMovie Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("\nMovie Country Produced: " + response.data.Country)
            console.log("\nMovie Language: " + response.data.Language)
            console.log("\nMovie Plot: " + response.data.Plot)
            console.log("\nMovie Actors: " + response.data.Actors)
            console.log("------------------------------------------------------------------------\n")
        })
}

// This command runs Spotify API for I Want it That Way which is found in the random.txt file
if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        console.log(dataArr[1])
        spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("\nArtist Name: " + data.tracks.items[0].artists[0].name);
            console.log("\nSong Name: " + data.tracks.items[0].name);
            console.log("\nSpotify Link: " + data.tracks.items[0].artists[0].external_urls.spotify)
            console.log("\nAlbum Name: " + data.tracks.items[0].album.name);
            console.log("------------------------------------------------------------------------\n")
        });
    });
};