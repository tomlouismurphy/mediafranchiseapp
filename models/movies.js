const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: String,
    releaseDate: Number,
    director: [String],
    characters: [String]
})

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

module.exports = mongoose.model('Movie', MovieSchema);