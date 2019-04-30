const input = document.querySelector('#the-number');
const errorBox = document.querySelector('#errorBox');
const resultBox = document.querySelector('#resultBox');
const html = document.querySelector('html');
const head = document.querySelector('head');
const body = document.querySelector('body');

const hiddenSize = ['250px', '2rem'];
const visibleSize = ['300px', '500px'];

let delta;
let interval = 300;

updateDom();

input.addEventListener('input', (event) => {
	clearTimeout(delta);
	delta = setTimeout(() => {
		console.log(`Searching for: ${event.target.value}`);
		search(event);
	}, interval);
});

async function search(event) {
	let num = event.target.value;
	let proxy = `https://cors-anywhere.herokuapp.com/`;
	let metaurl = `https://nhentai.net/api/gallery/${num}`;
	let regex = /\d+/g;
	if (regex.test(num) && num !== null && num !== undefined) {
		try {
			let data = await fetch(proxy + metaurl).then(response => response.json());
			let id = data.media_id;
			let title = data.title.english;
			let tags = resolveTags(data.tags);
			let coverurl = `https://t.nhentai.net/galleries/${id}/cover.jpg`;
			let link = `https://nhentai.net/g/${num}/`;
			updatePage(title, tags, coverurl, link);
		} catch (error) {
			console.log(error);
			hideElement();
		}
	}
	else {
		hideElement();
	}
}

function updatePage(title, tags, cover, link) {
	const header = resultBox.querySelector('header');
	const imageURL = resultBox.querySelector('#cover');
	const imageBox = resultBox.querySelector('#cover img');
	const tag_container = resultBox.querySelector('.tag-container span');

	header.innerHTML = `<a href='${link}' target='_blank'>${title}</a>`;
	imageURL.href = link;
	imageBox.src = cover;
	tag_container.innerHTML = '';

	for (let tag of tags) {
		let resolvedTag = `<a class='tag'>${tag}</a>`;
		tag_container.innerHTML += resolvedTag;
	}
	//hideElement();
	showElement();
}

function resolveTags(tags) {
	let result = [];
	for (let tag of tags) {
		if (tag.type === 'tag') {
			result.push(tag.name);
		}
	}
	return result;
}

function hideElement() {
	resultBox.classList.add('hidden');
	//updateDom();
}

function showElement() {
	resultBox.classList.remove('hidden');
	//updateDom();
}

function updateDom() {
	if (resultBox.classList.contains('hidden')) {
		html.style.width = hiddenSize[0];
		html.style.height = hiddenSize[1];
		head.style.width = hiddenSize[0];
		head.style.height = hiddenSize[1];
		body.style.width = hiddenSize[0];
		body.style.height = hiddenSize[1];
	}
	else {
		html.style.width = visibleSize[0];
		html.style.height = visibleSize[1];
		head.style.width = visibleSize[0];
		head.style.height = visibleSize[1];
		body.style.width = visibleSize[0];
		body.style.height = visibleSize[1];
	}
}