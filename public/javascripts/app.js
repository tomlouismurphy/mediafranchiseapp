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