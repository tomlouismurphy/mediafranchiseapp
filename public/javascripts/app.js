console.log('the public js file is running');

const movieStaging = [];
let commentCounter = 1;

// API1: Walt Disney Pictures - 440 movies - 22 pages (https://www.themoviedb.org/company/2)
// API2: Walt Disney Productions - 580 movies - 29 pages (https://www.themoviedb.org/company/3166)
// API3: Disneynature - 8 movies - 1 page (https://www.themoviedb.org/company/4436)
// API4: Walt Disney Animation Studios - 42 movies - 3 pages (https://www.themoviedb.org/company/6125)
// API5: Walt Disney Television - 51 movies - 3 pages (https://www.themoviedb.org/company/670)

// Things To Do:
	// Find a way to load more than one page at a time with each ajax
	// Decide what info needs to be:
		// pulled from the server or filtered out
		// displayed on screen for the user
		// left hidden from sight, but still present with the object

$.ajax({
	url: 'https://api.themoviedb.org/3/discover/movie?with_companies=2&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020',
	type: 'GET',
	dataType: 'Json',
	success: (res) => {
		console.log(res, " This is a response message from the server");
		const $codeTarget = $('#code-target');
		const newCode = res.results[1].overview;
		$codeTarget.text(newCode);
		for (let i = 0; i < res.results.length; i++){
			res.results[i].release_date = res.results[i].release_date.split(/\s*\-\s*/g)[0];
			movieStaging.push(res.results[i]);
		};
		console.log(movieStaging);
	},
	error: (err) => {
		console.log(err, " this is an error message from the server");
	}
})

// $.ajax({
// 	url: 'https://api.themoviedb.org/3/discover/movie?with_companies=3166&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020',
// 	type: 'GET',
// 	dataType: 'Json',
// 	success: (res) => {
// 		console.log(res, " This is a response message from the server");
// 		const $mainMovieInfo = $('#main-movie-info');
// 		const $sideMovieInfo = $('#side-movie-info');
// 		const $moviePoster = res.results[0].poster_path;
// 		const $movieTitle = res.results[0].title;
// 		const $movieRelease = res.results[0].release_date;
// 		const $movieOverview = res.results[0].overview;
// 		const $movieGenres = res.results[0].genre_ids;
// 		const $movieLang = res.results[0].original_language;
// 		const $movieImg = $('<img>');

// 		//in
// 		$movieImg.attr('src', 'https://image.tmdb.org/t/p/w500' + $moviePoster);
// 		$movieImg.attr('class', 'img-fluid');
// 		$movieImg.attr('alt', 'Responsive image');
// 		$mainMovieInfo.append($movieImg);

// 		//in
// 		const $movieTitleH3 = $('<h3>');
// 		$movieTitleH3.attr('class', 'font-weight-bold');
// 		$movieTitleH3.attr('id', 'main-movie-title');
// 		$mainMovieInfo.append($movieTitleH3);
// 		$movieTitleH3.text($movieTitle);

// 		//in
// 		const $originalReleaseP = $('<p>');
// 		$originalReleaseP.attr('class', 'font-weight-bold');
// 		$originalReleaseP.css('margin', '0 0 7px 0');
// 		$originalReleaseP.css('text-decoration', 'underline');
// 		$sideMovieInfo.append($originalReleaseP);
// 		$originalReleaseP.text('Original Release Date:');

// 		//in
// 		const $movieReleaseP = $('<p>');
// 		$sideMovieInfo.append($movieReleaseP);
// 		const $releaseArray = $movieRelease.split('-');
// 		let $releaseMonth = $releaseArray[1];
// 		if ($releaseArray[1] === '1') {
// 			$releaseMonth = 'January';
// 		} else if ($releaseArray[1] === '2') {
// 			$releaseMonth = 'February';
// 		} else if ($releaseArray[1] === '3') {
// 			$releaseMonth = 'March';
// 		} else if ($releaseArray[1] === '4') {
// 			$releaseMonth = 'April';
// 		} else if ($releaseArray[1] === '5') {
// 			$releaseMonth = 'May';
// 		} else if ($releaseArray[1] === '6') {
// 			$releaseMonth = 'June';
// 		} else if ($releaseArray[1] === '7') {
// 			$releaseMonth = 'July';
// 		} else if ($releaseArray[1] === '8') {
// 			$releaseMonth = 'August';
// 		} else if ($releaseArray[1] === '9') {
// 			$releaseMonth = 'September';
// 		} else if ($releaseArray[1] === '10') {
// 			$releaseMonth = 'October';
// 		} else if ($releaseArray[1] === '11') {
// 			$releaseMonth = 'November';
// 		} else if ($releaseArray[1] === '12') {
// 			$releaseMonth = 'December';
// 		}
// 		const $releaseDay = $releaseArray[2];
// 		const $releaseYear = $releaseArray[0];
// 		$movieReleaseP.text($releaseMonth + ' ' + $releaseDay + ', ' + $releaseYear);
// 		$sideMovieInfo.append($('<br>'));

// 		//in
// 		const $movieOverviewP = $('<p>');
// 		$mainMovieInfo.append($movieOverviewP);
// 		$movieOverviewP.text($movieOverview);

// 		//in
// 		const $movieGenresP = $('<p>');
// 		$movieGenresP.attr('class', 'font-weight-bold');
// 		$movieGenresP.css('margin', '0 0 7px 0');
// 		$movieGenresP.css('text-decoration', 'underline');
// 		$sideMovieInfo.append($movieGenresP);
// 		$movieGenresP.text('Genres:');

// 		//not added
// 		const $movieGenresUl = $('<ul>');
// 		for (a = 0; a < $movieGenres.length; a++) {
// 			let $movieGenresLi = $('<li>');
// 			$movieGenresLi.attr('class', 'text-left');
// 			if ($movieGenres[a] === 28) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Action");
// 			} else if ($movieGenres[a] === 12) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Adventure");
// 			} else if ($movieGenres[a] === 16) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Animation");
// 			} else if ($movieGenres[a] === 35) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Comedy");
// 			} else if ($movieGenres[a] === 80) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Crime");
// 			} else if ($movieGenres[a] === 99) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Documentary");
// 			} else if ($movieGenres[a] === 18) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Drama");
// 			} else if ($movieGenres[a] === 10751) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Family");
// 			} else if ($movieGenres[a] === 14) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Fantasy");
// 			} else if ($movieGenres[a] === 36) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("History");
// 			} else if ($movieGenres[a] === 27) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Horror");
// 			} else if ($movieGenres[a] === 10402) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Music");
// 			} else if ($movieGenres[a] === 9648) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Mystery");
// 			} else if ($movieGenres[a] === 10749) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Romance");
// 			} else if ($movieGenres[a] === 878) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Science Fiction");
// 			} else if ($movieGenres[a] === 10770) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("TV Movie");
// 			} else if ($movieGenres[a] === 53) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Thriller");
// 			} else if ($movieGenres[a] === 10752) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("War");
// 			} else if ($movieGenres[a] === 37) {
// 				$movieGenresUl.append($movieGenresLi);
// 				$movieGenresLi.text("Western");
// 			}
// 		};
// 		$sideMovieInfo.append($movieGenresUl);
// 		$sideMovieInfo.append($('<br>'));

// 		//in
// 		const $originalLang = $('<p>');
// 		$originalLang.attr('class', 'font-weight-bold');
// 		$originalLang.css('margin', '0 0 7px 0');
// 		$originalLang.css('text-decoration', 'underline');
// 		$sideMovieInfo.append($originalLang);
// 		$originalLang.text('Original Language:');

// 		//in
// 		const $movieLangP = $('<p>');
// 		$movieLangP.attr('class', 'text-uppercase');
// 		$sideMovieInfo.append($movieLangP);
// 		$movieLangP.text($movieLang);
// 		$sideMovieInfo.append($('<br>'));

// 		//in
// 		const $actorsCate = $('<p>');
// 		$actorsCate.attr('class', 'font-weight-bold')
// 		$actorsCate.css('margin', '0 0 7px 0');
// 		$actorsCate.css('text-decoration', 'underline');
// 		$sideMovieInfo.append($actorsCate);
// 		$actorsCate.text('Actors & Actresses:');

// 		//in
// 		const $actorsEntries = $('<div>');
// 		$sideMovieInfo.append($actorsEntries);
// 		const $actorsText = $('<p>');
// 		$actorsEntries.append($actorsText);
// 		$actorsText.text('Placeholder Text...');
// 		$sideMovieInfo.append($('<br>'));


// 		const $productionCate = $('<p>');
// 		$productionCate.attr('class', 'font-weight-bold');
// 		$productionCate.css('margin', '0 0 7px 0');
// 		$productionCate.css('text-decoration', 'underline');
// 		$sideMovieInfo.append($productionCate);
// 		$productionCate.text('Production Crew:');


// 		const $productionEntries = $('<div>');
// 		$sideMovieInfo.append($productionEntries);
// 		const $productionText = $('<p>');
// 		$productionEntries.append($productionText);
// 		$productionText.text('Placeholder Text...');
// 		$sideMovieInfo.append($('<br>'));
// 	},
// 	error: (err) => {
// 		console.log(err, " this is an error message from the server");
// 	}
// })

// $.ajax({
// 	url: 'https://api.themoviedb.org/3/discover/movie?with_companies=4436&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020',
// 	type: 'GET',
// 	dataType: 'Json',
// 	success: (res) => {
// 		console.log(res, " This is a response message from the server");
// 	},
// 	error: (err) => {
// 		console.log(err, " this is an error message from the server");
// 	}
// })

// $.ajax({
// 	url: 'https://api.themoviedb.org/3/discover/movie?with_companies=6125&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020',
// 	type: 'GET',
// 	dataType: 'Json',
// 	success: (res) => {
// 		console.log(res, " This is a response message from the server");
// 	},
// 	error: (err) => {
// 		console.log(err, " this is an error message from the server");
// 	}
// })

// $.ajax({
// 	url: 'https://api.themoviedb.org/3/discover/movie?with_companies=670&page=1&include_video=false&include_adult=false&sort_by=original_title.asc&language=en-US&api_key=32589a3c15168653f4bc773880912020',
// 	type: 'GET',
// 	dataType: 'Json',
// 	success: (res) => {
// 		console.log(res, " This is a response message from the server");
// 	},
// 	error: (err) => {
// 		console.log(err, " this is an error message from the server");
// 	}
// })s

$('#first-textarea-layout').on('show.bs.collapse', () => {
	$('#second-textarea-layout').collapse('hide');
	$('#third-textarea-layout').collapse('hide');
})

$('#first-textarea-layout').on('shown.bs.collapse', () => {
	$('#first-textarea-layout').css('display', 'flex');
})

$('#first-textarea-layout').on('hide.bs.collapse', () => {
	$('#first-textarea-layout').css('display', 'none');
})

$('#second-textarea-layout').on('show.bs.collapse', () => {
	$('#first-textarea-layout').collapse('hide');
	$('#third-textarea-layout').collapse('hide');
})

$('#second-textarea-layout').on('shown.bs.collapse', () => {
	$('#second-textarea-layout').css('display', 'flex');
})

$('#second-textarea-layout').on('hide.bs.collapse', () => {
	$('#second-textarea-layout').css('display', 'none');
})

$('#third-textarea-layout').on('show.bs.collapse', () => {
	$('#first-textarea-layout').collapse('hide');
	$('#second-textarea-layout').collapse('hide');
})

$('#third-textarea-layout').on('shown.bs.collapse', () => {
	$('#third-textarea-layout').css('display', 'flex');
})

$('#third-textarea-layout').on('hide.bs.collapse', () => {
	$('#third-textarea-layout').css('display', 'none');
})



// $('#post-comment-button').on('click', () => {
	// const $newComment = $('#new-user-comment')[0].value;
	// const $newCommentEntry = $('<tr>');
	// $('#user-comments-list').append($newCommentEntry);
	// const $newCommentNumber = $('<th>');
	// $newCommentNumber.attr('scope', 'row');
	// $newCommentEntry.append($newCommentNumber);
	// commentCounter += 1;
	// $newCommentNumber.text(`${commentCounter}`);
	// const $newCommentUsername = $('<td>');
	// $newCommentEntry.append($newCommentUsername);
	// $newCommentUsername.text('username');
	// const $newCommentContent = $('<td>');
	// $newCommentEntry.append($newCommentContent);
	// $newCommentContent.text($newComment);
// })

console.log('public js window is now closing');