require("dotenv").config();
var moment = require("moment");
var request = require("request");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {

    case "concert-this":
        let artist = process.argv.slice(2).join(" ");
        let bandRequestUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(bandRequestUrl, function (error, meta, body) {
            parsedBody = JSON.parse(body);
            for (i = 0; i < parsedBody.length; i++) {
                console.log(parsedBody[i].venue.name);
                console.log(parsedBody[i].venue.city);
                console.log(moment(parsedBody[i].datetime).format('MMMM Do YYYY, h:mm:ss a') + "\n");
            }
        });
        break;

    case "spotify-this-song":
        let song = process.argv.slice(2).join(" ");

        spotify
            .search({ type: 'track', query: song }, function (err, data) {
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].preview_url);
                console.log(data.tracks.items[0].album.name);
            });

        break;

    case 'movie-this':
        let movieName = process.argv.slice(2).join(" ");

        let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, data) {
            cleanData = JSON.parse(data);

            if (response.statusCode === 200) {
                console.log("Title: " + cleanData.Title);
                console.log("Release Year: " + cleanData.Year);
                console.log("IMDB Rating: " + cleanData.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + cleanData.Ratings[1].Value);
                console.log("Origin Country: " + cleanData.Country);
                console.log("Language: " + cleanData.Language);
                console.log("Plot: " + cleanData.Plot);
                console.log("Starring: " + cleanData.Actors);

            }
        })

        break;

    case 'do-what-it-says':

        break;

    case 'default':
        console.log("Sorry, I didn't get that")
        break;
};