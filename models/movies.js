const mongoose = require('mongoose');
const request = require('request');

const movieListing = [];

const MovieSchema = new mongoose.Schema({
    name: String,
    releaseDate: Number,
    genres: [{
        id: Number,
        name: String
    }],
    id: Number,
    original_language: String,
    overview: String,
    poster_path: String,
    popularity: Number,
    director: [String],
    characters: [String]
});

const Movie = mongoose.model('Movie', MovieSchema);

const populateDatabase = () => {
    for (let i = 0; i < movieListing.length; i++){
        const movie = new Movie({name: movieListing[i].title,
                                releaseDate: movieListing[i].release_date,
                                id: movieListing[i].id,
                                overview: movieListing[i].overview,
                                poster_path: movieListing[i].poster_path,
                                popularity: movieListing[i].popularity,
                                original_language: movieListing[i].original_language,
                                director: [],
                                characters: []
                            })
        movie.save();
    }
}

const releaseDateToInt = () => {
    for (let i = 0; i < movieListing.length; i++){
        movieListing[i].release_date = parseInt(movieListing[i].release_date.split(/\s*\-\s*/g)[0]);
    };
};

const populateAjax = () => {
    request('https://api.themoviedb.org/3/discover/movie?with_companies=2&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020', (error, response, body) => {
        if (error){
            console.log('error');
        } else {
            const dbObject = JSON.parse(body);
            for (let i = 0; i < dbObject.results.length; i++){
                movieListing.push(dbObject.results[i]);
            }
            releaseDateToInt();
            populateDatabase();
        }
    })
};

console.log(movieListing.length);
if (movieListing.length === 77){
    populateAjax();
    console.log(movieListing.length);
}

module.exports = mongoose.model('Movie', MovieSchema);

// const movies = [
//     {
//         name: 'The Lion King',
//         releaseDate: 1994,
//         director: ['Roger Allers', 'Rob Minkoff'],
//         characters: ['Simba']
//     },
//     {
//         name: 'Pinocchio',
//         releaseDate: 1940,
//         director: ['Norman Ferguson', 'T. Hee', 
//                 'Wilfred Jackson', 'Jack Kinney',
//                 'Hamilton Luske', 'Bill Roberts',
//                 'Ben Sharpsteen'],
//         characters: ['Pinocchio']
//     },
//     {
//         name: 'Mulan',
//         releaseDate: 1998,
//         director: ['Tony Bancroft', 'Barry Cook'],
//         characters: ['Mushu']
//     },
//     {
//         name: 'Robin Hood',
//         releaseDate: 1973,
//         director: ['Wolfgang Reitherman'],
//         characters: ['Sir Hiss']
//     },
//     {
//         name: 'The Rescuers',
//         releaseDate: 1977,
//         director: ['John Lounsbery', 'Wolfgang Reitherman'],
//         characters: ['Bernard']
//     }
// ];