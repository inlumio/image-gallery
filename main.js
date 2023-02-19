const API_KEY = 'bFy0qMcVktPHaRsV0Qn9LyUNduMVoO4P4zfx1N3JnvpKun4HBNW9cdLB';

const galleryPhotos = document.querySelector('.gallery__collage');
const searchForm = document.querySelector('.gallery__search');
const loadBtn = document.querySelector('.gallery__load');

let pageNum = 1;
const perPage = 20;

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const input = searchForm.querySelector('input');
	galleryPhotos.innerHTML = '';
	if (input.value === '') getImg();
	else getImg(input.value);
	input.value = '';
});

loadBtn.onclick = () => {
	pageNum++;
	const photosType = galleryPhotos.getAttribute('data-type');
	photosType === 'moderate' ? getImg() : getImg(photosType);
};

function getUrl(query) {
	return query === undefined
		? `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${pageNum}`
		: `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${pageNum}`;
}

async function getImg(query) {
	const url = getUrl(query);
	galleryPhotos.setAttribute('data-type', query || 'moderate');
	const data = await fetchImgFromApi(url);

	generateHTML(data.photos);
	console.log(url);
}

async function fetchImgFromApi(url) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: API_KEY,
		},
	});

	const data = await response.json();

	return data;
}

function generateHTML(photosData) {
	photosData.forEach((photoData) => {
		const item = document.createElement('div');
		item.classList.add('gallery__item');
		item.classList.add('item');
		console.log(photoData);
		item.innerHTML = `
			<img src="${photoData.src.large}" alt="" class="item__img">
			<a href="${photoData.photographer_url}" class="item__photographer">${photoData.photographer}</a>
		`;
		galleryPhotos.appendChild(item);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	galleryPhotos.innerHTML = '';
	getImg();
});
